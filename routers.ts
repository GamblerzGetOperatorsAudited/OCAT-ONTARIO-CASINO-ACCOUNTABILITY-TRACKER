import { TRPCError } from "@trpc/server";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  computeSeverityScore,
  createReport,
  getCasinosWithStats,
  getReportByOcatId,
  getReports,
  getReportStats,
  getUserByOpenId,
  updateUser,
  getAllUsers,
  updateUserRole,
  deleteReport,
  updateReportStatus,
  getAllReportsAdmin,
  getAdminStats,
} from "./db";

// ─── Reports Router ───────────────────────────────────────────────────────────

const reportsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        search: z.string().optional(),
        casino: z.string().optional(),
        category: z.string().optional(),
        status: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return getReports(input);
    }),

  myReports: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      return getReports({ ...input, userId: ctx.user.id });
    }),

  getByOcatId: publicProcedure
    .input(z.object({ ocatId: z.string() }))
    .query(async ({ input }) => {
      const report = await getReportByOcatId(input.ocatId);
      if (!report) throw new TRPCError({ code: "NOT_FOUND", message: "Report not found" });
      return report;
    }),

  create: protectedProcedure
    .input(
      z.object({
        casinoName: z.string().min(1),
        category: z.string().min(1),
        description: z.string().min(10).max(2000),
        incidentDate: z.string().min(1),
        answers: z.record(z.string(), z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const report = await createReport({
        userId: ctx.user.id,
        casinoName: input.casinoName,
        issueCategory: input.category,
        description: input.description,
        incidentDate: input.incidentDate,
        answers: input.answers,
      });
      return report;
    }),

  stats: publicProcedure.query(async () => {
    return getReportStats();
  }),

  computeScore: publicProcedure
    .input(z.object({ answers: z.record(z.string(), z.string()) }))
    .query(({ input }) => {
      return { score: computeSeverityScore(input.answers) };
    }),
});

// ─── Casinos Router ───────────────────────────────────────────────────────────

const casinosRouter = router({
  list: publicProcedure.query(async () => {
    return getCasinosWithStats();
  }),
});

// ─── User / Profile Router ────────────────────────────────────────────────────

const userRouter = router({
  profile: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserByOpenId(ctx.user.openId);
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      twoFactorEnabled: user.twoFactorEnabled,
      agreementAccepted: user.agreementAccepted,
      agreementAcceptedAt: user.agreementAcceptedAt,
      createdAt: user.createdAt,
      lastSignedIn: user.lastSignedIn,
    };
  }),

  acceptAgreement: protectedProcedure.mutation(async ({ ctx }) => {
    await updateUser(ctx.user.openId, {
      agreementAccepted: true,
      agreementAcceptedAt: new Date(),
    });
    return { success: true };
  }),

  setup2FA: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await getUserByOpenId(ctx.user.openId);
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    if (user.twoFactorEnabled) throw new TRPCError({ code: "BAD_REQUEST", message: "2FA already enabled" });

    const appName = "OCAT Platform";
    const email = user.email ?? user.name ?? "user";
    const secretObj = speakeasy.generateSecret({ name: `OCAT Platform (${email})`, length: 20 });
    const secret = secretObj.base32;
    await updateUser(ctx.user.openId, { twoFactorSecret: secret });
    const otpAuthUrl = secretObj.otpauth_url ?? speakeasy.otpauthURL({ secret, label: email, issuer: appName, encoding: 'base32' });
    const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl);

    return { secret, qrCodeDataUrl };
  }),

  verify2FA: protectedProcedure
    .input(z.object({ token: z.string().length(6) }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserByOpenId(ctx.user.openId);
      if (!user || !user.twoFactorSecret) throw new TRPCError({ code: "BAD_REQUEST", message: "2FA not set up" });

      const isValid = speakeasy.totp.verify({ secret: user.twoFactorSecret, encoding: 'base32', token: input.token, window: 1 });
      if (!isValid) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid verification code" });

      await updateUser(ctx.user.openId, { twoFactorEnabled: true });
      return { success: true };
    }),

  disable2FA: protectedProcedure
    .input(z.object({ token: z.string().length(6) }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserByOpenId(ctx.user.openId);
      if (!user || !user.twoFactorSecret || !user.twoFactorEnabled) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "2FA not enabled" });
      }

      const isValid = speakeasy.totp.verify({ secret: user.twoFactorSecret, encoding: 'base32', token: input.token, window: 1 });
      if (!isValid) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid verification code" });

      await updateUser(ctx.user.openId, { twoFactorEnabled: false, twoFactorSecret: null as unknown as string });
      return { success: true };
    }),
});
// ─── Admin Router ────────────────────────────────────────────────────────────────

const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  return next({ ctx });
});

const adminRouter = router({
  stats: adminProcedure.query(async () => getAdminStats()),
  
  users: router({
    list: adminProcedure
      .input(z.object({ limit: z.number().min(1).max(100).default(50), offset: z.number().min(0).default(0) }))
      .query(async ({ input }) => getAllUsers(input.limit, input.offset)),
    
    updateRole: adminProcedure
      .input(z.object({ userId: z.number(), role: z.enum(['user', 'admin']) }))
      .mutation(async ({ input }) => {
        await updateUserRole(input.userId, input.role);
        return { success: true };
      }),
  }),
  
  reports: router({
    list: adminProcedure
      .input(z.object({ limit: z.number().min(1).max(100).default(50), offset: z.number().min(0).default(0) }))
      .query(async ({ input }) => getAllReportsAdmin(input.limit, input.offset)),
    
    updateStatus: adminProcedure
      .input(z.object({ reportId: z.number(), status: z.enum(['open', 'under_review', 'resolved', 'dismissed']) }))
      .mutation(async ({ input }) => {
        await updateReportStatus(input.reportId, input.status);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ reportId: z.number() }))
      .mutation(async ({ input }) => {
        await deleteReport(input.reportId);
        return { success: true };
      }),
  }),
});

// ─── App Router ───────────────────────────────────────────────────────────────────

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  reports: reportsRouter,
  casinos: casinosRouter,
  user: userRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
