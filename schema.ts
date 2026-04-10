import {
  boolean,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  // 2FA fields
  twoFactorSecret: varchar("twoFactorSecret", { length: 64 }),
  twoFactorEnabled: boolean("twoFactorEnabled").default(false).notNull(),
  // Agreement acceptance
  agreementAccepted: boolean("agreementAccepted").default(false).notNull(),
  agreementAcceptedAt: timestamp("agreementAcceptedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const casinos = mysqlTable("casinos", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull().unique(),
  licenseNumber: varchar("licenseNumber", { length: 64 }),
  operator: varchar("operator", { length: 128 }),
  website: varchar("website", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Casino = typeof casinos.$inferSelect;

export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  ocatId: varchar("ocatId", { length: 16 }).notNull().unique(),
  userId: int("userId").notNull(),
  casinoName: varchar("casinoName", { length: 128 }).notNull(),
  issueCategory: varchar("issueCategory", { length: 64 }).notNull(),
  description: text("description").notNull(),
  incidentDate: varchar("incidentDate", { length: 16 }).notNull(),
  answers: json("answers").$type<Record<string, string>>().notNull(),
  severityScore: int("severityScore").notNull().default(0),
  status: mysqlEnum("status", ["open", "under_review", "resolved", "dismissed"])
    .default("open")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;

export const regulatoryStandards = mysqlTable("regulatory_standards", {
  id: int("id").autoincrement().primaryKey(),
  standardCode: varchar("standardCode", { length: 16 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  provincialDueProcess: text("provincialDueProcess"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RegulatoryStandard = typeof regulatoryStandards.$inferSelect;

export const truthsAndMyths = mysqlTable("truths_and_myths", {
  id: int("id").autoincrement().primaryKey(),
  myth: text("myth").notNull(),
  truth: text("truth").notNull(),
  source: varchar("source", { length: 256 }).notNull(),
  category: varchar("category", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TruthAndMyth = typeof truthsAndMyths.$inferSelect;
