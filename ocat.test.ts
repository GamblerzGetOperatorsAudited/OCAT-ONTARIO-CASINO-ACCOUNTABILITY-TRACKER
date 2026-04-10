import { describe, expect, it } from "vitest";
import { computeSeverityScore } from "./db";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// ─── Helpers ──────────────────────────────────────────────────────────────────

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(overrides: Partial<AuthenticatedUser> = {}): { ctx: TrpcContext; clearedCookies: { name: string; options: Record<string, unknown> }[] } {
  const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-openid",
    email: "test@ocat.ca",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    ...overrides,
  };
  const ctx: TrpcContext = {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };
  return { ctx, clearedCookies };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

// ─── Severity Score Tests ─────────────────────────────────────────────────────

describe("computeSeverityScore", () => {
  it("returns 0 for empty answers", () => {
    expect(computeSeverityScore({})).toBe(0);
  });

  it("returns a higher score when retaliation questions are Yes", () => {
    // q11 (account locked), q14 (NDA request) are high-weight retaliation flags
    const highRisk = { q11: "Yes", q14: "Yes", q12: "Yes" };
    const score = computeSeverityScore(highRisk);
    expect(score).toBeGreaterThan(10);
  });

  it("returns a lower score when operator behaved correctly (process questions answered Yes)", () => {
    // q6 (human responded), q7 (dispute ID), q8 (escalation), q9 (transcript), q10 (iGO info)
    const goodOperator = {
      q6: "Yes", q7: "Yes", q8: "Yes", q9: "Yes", q10: "Yes",
    };
    const score = computeSeverityScore(goodOperator);
    // These are "noIsBad" questions — Yes means good, so score should be low
    expect(score).toBe(0);
  });

  it("returns max score for worst-case scenario", () => {
    // All bad answers: technical failures + retaliation + impact (all 25 questions)
    const worst: Record<string, string> = {
      q1: "Yes", q2: "No", q3: "No", q4: "Yes", q5: "Yes",
      q6: "No", q7: "No", q8: "No", q9: "No", q10: "No",
      q11: "Yes", q12: "Yes", q13: "Yes", q14: "Yes", q15: "Yes",
      q16: "Yes", q17: "Yes", q18: "No", q19: "Yes", q20: "Yes",
      q21: "Yes", q22: "Yes", q23: "Yes", q24: "Yes", q25: "No",
    };
    const score = computeSeverityScore(worst);
    expect(score).toBe(100);
  });

  it("returns 0 for best-case scenario (operator fully compliant, all 25 questions)", () => {
    const best: Record<string, string> = {
      q1: "No", q2: "Yes", q3: "Yes", q4: "No", q5: "No",
      q6: "Yes", q7: "Yes", q8: "Yes", q9: "Yes", q10: "Yes",
      q11: "No", q12: "No", q13: "No", q14: "No", q15: "No",
      q16: "No", q17: "No", q18: "Yes", q19: "No", q20: "No",
      q21: "No", q22: "No", q23: "No", q24: "No", q25: "Yes",
    };
    const score = computeSeverityScore(best);
    expect(score).toBe(0);
  });

  it("returns a value between 0 and 100 for partial answers", () => {
    const partial = { q1: "Yes", q11: "Yes", q16: "Yes" };
    const score = computeSeverityScore(partial);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});

// ─── Auth Router Tests ────────────────────────────────────────────────────────

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const { ctx, clearedCookies } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({ maxAge: -1 });
  });

  it("allows logout even when user is not authenticated (with mock res)", async () => {
    // logout is a publicProcedure so it runs even without a user,
    // but it still calls ctx.res.clearCookie — provide a mock
    const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {
        clearCookie: (name: string, options: Record<string, unknown>) => {
          clearedCookies.push({ name, options });
        },
      } as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
  });
});

describe("auth.me", () => {
  it("returns the authenticated user", async () => {
    const { ctx } = createAuthContext({ name: "Alice" });
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result?.name).toBe("Alice");
  });

  it("returns null for unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });
});

// ─── Reports Router Tests ─────────────────────────────────────────────────────

describe("reports.computeScore", () => {
  it("returns a score object with a numeric score", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.reports.computeScore({ answers: { q1: "Yes", q11: "Yes" } });
    expect(typeof result.score).toBe("number");
    expect(result.score).toBeGreaterThan(0);
  });

  it("returns score 0 for empty answers", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.reports.computeScore({ answers: {} });
    expect(result.score).toBe(0);
  });
});

describe("reports.create", () => {
  it("throws UNAUTHORIZED when user is not authenticated", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.reports.create({
        casinoName: "BetMGM Ontario",
        category: "Standard 4.10 — Game Malfunctions",
        description: "Test incident description that is long enough",
        incidentDate: "2026-01-01",
        answers: {},
      })
    ).rejects.toThrow();
  });
});

describe("reports.myReports", () => {
  it("throws UNAUTHORIZED when user is not authenticated", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.reports.myReports({ limit: 10, offset: 0 })).rejects.toThrow();
  });
});

// ─── User Router Tests ────────────────────────────────────────────────────────

describe("user.profile", () => {
  it("throws UNAUTHORIZED when user is not authenticated", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.user.profile()).rejects.toThrow();
  });
});

describe("user.acceptAgreement", () => {
  it("throws UNAUTHORIZED when user is not authenticated", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.user.acceptAgreement()).rejects.toThrow();
  });
});

describe("user.setup2FA", () => {
  it("throws UNAUTHORIZED when user is not authenticated", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.user.setup2FA()).rejects.toThrow();
  });
});

describe("user.verify2FA", () => {
  it("throws UNAUTHORIZED when user is not authenticated", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.user.verify2FA({ token: "123456" })).rejects.toThrow();
  });
});

describe("user.disable2FA", () => {
  it("throws UNAUTHORIZED when user is not authenticated", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.user.disable2FA({ token: "123456" })).rejects.toThrow();
  });
});


// ─── Admin Router Tests ───────────────────────────────────────────────────────

describe("admin.stats", () => {
  it("throws FORBIDDEN when user is not admin", async () => {
    const { ctx } = createAuthContext({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.stats()).rejects.toThrow();
  });

  it("returns stats object for admin", async () => {
    const { ctx } = createAuthContext({ role: "admin" });
    const caller = appRouter.createCaller(ctx);
    const result = await caller.admin.stats();
    expect(typeof result.totalUsers).toBe("number");
    expect(typeof result.totalReports).toBe("number");
    expect(typeof result.avgSeverity).toBe("number");
    expect(typeof result.criticalCount).toBe("number");
  });
});

describe("admin.users.list", () => {
  it("throws FORBIDDEN when user is not admin", async () => {
    const { ctx } = createAuthContext({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.users.list({ limit: 10, offset: 0 })).rejects.toThrow();
  });
});

describe("admin.users.updateRole", () => {
  it("throws FORBIDDEN when user is not admin", async () => {
    const { ctx } = createAuthContext({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.users.updateRole({ userId: 1, role: "admin" })).rejects.toThrow();
  });
});

describe("admin.reports.list", () => {
  it("throws FORBIDDEN when user is not admin", async () => {
    const { ctx } = createAuthContext({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.reports.list({ limit: 10, offset: 0 })).rejects.toThrow();
  });
});

describe("admin.reports.updateStatus", () => {
  it("throws FORBIDDEN when user is not admin", async () => {
    const { ctx } = createAuthContext({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.reports.updateStatus({ reportId: 1, status: "resolved" })).rejects.toThrow();
  });
});

describe("admin.reports.delete", () => {
  it("throws FORBIDDEN when user is not admin", async () => {
    const { ctx } = createAuthContext({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.reports.delete({ reportId: 1 })).rejects.toThrow();
  });
});
