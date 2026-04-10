import { and, count, desc, eq, gte, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { casinos, InsertReport, InsertUser, reports, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    const value = user[field];
    if (value === undefined) continue;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  }

  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUser(openId: string, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set(data).where(eq(users.openId, openId));
}

// ─── Reports ──────────────────────────────────────────────────────────────────

/** Derive a 0-100 severity score from the 20 yes/no answers */
export function computeSeverityScore(answers: Record<string, string>): number {
  // Weighted question groups
  const weights: Record<string, number> = {
    // Technical/Legal Audit (q1-q5)
    q1: 4, q2: 2, q3: 3, q4: 5, q5: 4,
    // Process & Paper Trail (q6-q10)
    q6: 3, q7: 3, q8: 3, q9: 3, q10: 4,
    // Retaliation & Ethics (q11-q15) — highest weights
    q11: 7, q12: 6, q13: 6, q14: 8, q15: 4,
    // Impact & Health (q16-q25)
    q16: 5, q17: 3, q18: 3, q19: 5, q20: 5,
    q21: 6, q22: 3, q23: 6, q24: 4, q25: 2,
  };
  // Questions where "No" is the bad answer (operator failed to provide)
  const noIsBad = new Set(["q2", "q3", "q6", "q7", "q8", "q9", "q10", "q18", "q25"]);

  let score = 0;
  let maxPossible = 0;
  for (const [qId, weight] of Object.entries(weights)) {
    maxPossible += weight;
    const answer = answers[qId];
    if (!answer) continue;
    const isBad = noIsBad.has(qId) ? answer === "No" : answer === "Yes";
    if (isBad) score += weight;
  }
  return maxPossible > 0 ? Math.round((score / maxPossible) * 100) : 0;
}

function generateOcatId(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const rand = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
  return `OCAT-${year}-${rand}`;
}

export async function createReport(data: Omit<InsertReport, "ocatId" | "severityScore">) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const ocatId = generateOcatId();
  const severityScore = computeSeverityScore(data.answers as Record<string, string>);
  await db.insert(reports).values({ ...data, ocatId, severityScore });
  const result = await db.select().from(reports).where(eq(reports.ocatId, ocatId)).limit(1);
  return result[0];
}

export async function getReports(opts: {
  limit?: number;
  offset?: number;
  search?: string;
  casino?: string;
  category?: string;
  status?: string;
  userId?: number;
}) {
  const db = await getDb();
  if (!db) return { rows: [], total: 0 };

  const conditions = [];
  if (opts.search) {
    conditions.push(
      or(
        like(reports.casinoName, `%${opts.search}%`),
        like(reports.description, `%${opts.search}%`),
        like(reports.ocatId, `%${opts.search}%`)
      )
    );
  }
  if (opts.casino) conditions.push(eq(reports.casinoName, opts.casino));
  if (opts.category) conditions.push(eq(reports.issueCategory, opts.category));
  if (opts.status) conditions.push(eq(reports.status, opts.status as "open" | "under_review" | "resolved" | "dismissed"));
  if (opts.userId) conditions.push(eq(reports.userId, opts.userId));

  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const limit = opts.limit ?? 20;
  const offset = opts.offset ?? 0;

  const [rows, totalRows] = await Promise.all([
    db.select().from(reports).where(where).orderBy(desc(reports.createdAt)).limit(limit).offset(offset),
    db.select({ count: count() }).from(reports).where(where),
  ]);

  return { rows, total: totalRows[0]?.count ?? 0 };
}

export async function getReportById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(reports).where(eq(reports.id, id)).limit(1);
  return result[0];
}

export async function getReportByOcatId(ocatId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(reports).where(eq(reports.ocatId, ocatId)).limit(1);
  return result[0];
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export async function getReportStats() {
  const db = await getDb();
  if (!db) return { byCasino: [], byCategory: [], byMonth: [], total: 0, avgSeverity: 0 };

  const [byCasino, byCategory, byMonth, totals] = await Promise.all([
    db
      .select({ casino: reports.casinoName, count: count(), avgSeverity: sql<number>`AVG(${reports.severityScore})` })
      .from(reports)
      .groupBy(reports.casinoName)
      .orderBy(desc(count())),
    db
      .select({ category: reports.issueCategory, count: count() })
      .from(reports)
      .groupBy(reports.issueCategory)
      .orderBy(desc(count())),
    db
      .select({
        month: sql<string>`DATE_FORMAT(${reports.createdAt}, '%Y-%m')`,
        count: count(),
        avgSeverity: sql<number>`AVG(${reports.severityScore})`,
      })
      .from(reports)
      .where(gte(reports.createdAt, sql`DATE_SUB(NOW(), INTERVAL 12 MONTH)`))
      .groupBy(sql`DATE_FORMAT(${reports.createdAt}, '%Y-%m')`)
      .orderBy(sql`DATE_FORMAT(${reports.createdAt}, '%Y-%m')`),
    db.select({ total: count(), avgSeverity: sql<number>`AVG(${reports.severityScore})` }).from(reports),
  ]);

  return {
    byCasino,
    byCategory,
    byMonth,
    total: totals[0]?.total ?? 0,
    avgSeverity: Math.round(Number(totals[0]?.avgSeverity ?? 0)),
  };
}

// ─── Casinos ──────────────────────────────────────────────────────────────────

export async function getCasinosWithStats() {
  const db = await getDb();
  if (!db) return [];

  const casinoList = await db.select().from(casinos).orderBy(casinos.name);
  const stats = await db
    .select({
      casinoName: reports.casinoName,
      count: count(),
      avgSeverity: sql<number>`AVG(${reports.severityScore})`,
    })
    .from(reports)
    .groupBy(reports.casinoName);

  const statsMap = new Map(stats.map((s) => [s.casinoName, s]));

  return casinoList.map((c) => {
    const s = statsMap.get(c.name);
    return {
      ...c,
      reportCount: s?.count ?? 0,
      avgSeverity: Math.round(Number(s?.avgSeverity ?? 0)),
    };
  });
}


// ─── Admin Helpers ────────────────────────────────────────────────────────────

export async function getAllUsers(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return { rows: [], total: 0 };
  const [rows, totalRows] = await Promise.all([
    db.select().from(users).orderBy(desc(users.createdAt)).limit(limit).offset(offset),
    db.select({ count: count() }).from(users),
  ]);
  return { rows, total: totalRows[0]?.count ?? 0 };
}

export async function updateUserRole(userId: number, role: "user" | "admin") {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ role }).where(eq(users.id, userId));
}

export async function deleteReport(reportId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(reports).where(eq(reports.id, reportId));
}

export async function updateReportStatus(reportId: number, status: "open" | "under_review" | "resolved" | "dismissed") {
  const db = await getDb();
  if (!db) return;
  await db.update(reports).set({ status }).where(eq(reports.id, reportId));
}

export async function getAllReportsAdmin(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return { rows: [], total: 0 };
  const [rows, totalRows] = await Promise.all([
    db.select().from(reports).orderBy(desc(reports.createdAt)).limit(limit).offset(offset),
    db.select({ count: count() }).from(reports),
  ]);
  return { rows, total: totalRows[0]?.count ?? 0 };
}

export async function getAdminStats() {
  const db = await getDb();
  if (!db) return { totalUsers: 0, totalReports: 0, avgSeverity: 0, criticalCount: 0 };
  const [userCount, reportStats] = await Promise.all([
    db.select({ count: count() }).from(users),
    db.select({
      total: count(),
      avgSeverity: sql<number>`AVG(${reports.severityScore})`,
      critical: count(sql`CASE WHEN ${reports.severityScore} >= 75 THEN 1 END`),
    }).from(reports),
  ]);
  return {
    totalUsers: userCount[0]?.count ?? 0,
    totalReports: reportStats[0]?.total ?? 0,
    avgSeverity: Math.round(Number(reportStats[0]?.avgSeverity ?? 0)),
    criticalCount: reportStats[0]?.critical ?? 0,
  };
}
