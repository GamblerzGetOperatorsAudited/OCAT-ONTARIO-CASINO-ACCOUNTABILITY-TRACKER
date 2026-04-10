import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Parse DATABASE_URL
const dbUrl = new URL(process.env.DATABASE_URL);
const connection = await mysql.createConnection({
  host: dbUrl.hostname,
  port: dbUrl.port || 3306,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log("✓ Connected to database:", dbUrl.hostname);

// Seed regulatory standards
console.log("Seeding regulatory standards...");
const standards = [
  { standardCode: "4.10", title: "Responsible Gambling Tools", description: "Operators must provide deposit limits, self-exclusion, loss limits, and time-out features", category: "Responsible Gambling", provincialDueProcess: "Players must be able to set limits within 24 hours" },
  { standardCode: "5.01", title: "Player Account Security", description: "Operators must implement multi-factor authentication", category: "Security", provincialDueProcess: "Accounts must be protected with MFA" },
  { standardCode: "2.01", title: "Game Integrity & RNG Certification", description: "All games must use certified RNGs audited annually", category: "Game Integrity", provincialDueProcess: "RNG certification must be renewed annually" },
  { standardCode: "3.01", title: "KYC & AML Compliance", description: "Know Your Customer verification required", category: "Compliance", provincialDueProcess: "KYC must be completed within 7 days" },
  { standardCode: "6.01", title: "Withdrawal Processing", description: "All withdrawals must be processed within 5 business days", category: "Payments", provincialDueProcess: "Operators must provide status updates" },
  { standardCode: "7.01", title: "Data Protection & Privacy", description: "Player data must be encrypted and protected", category: "Privacy", provincialDueProcess: "Data breaches must be reported within 24 hours" },
];

for (const std of standards) {
  try {
    const [result] = await connection.execute(
      `INSERT IGNORE INTO regulatory_standards (standardCode, title, description, category, provincialDueProcess) VALUES (?, ?, ?, ?, ?)`,
      [std.standardCode, std.title, std.description, std.category, std.provincialDueProcess]
    );
    if (result.affectedRows > 0) console.log(`  ✓ ${std.standardCode}`);
  } catch (e) {
    console.log(`  ✗ ${std.standardCode}:`, e.message.slice(0, 50));
  }
}
console.log("✓ Regulatory standards seeded");

// Seed truths & myths
console.log("Seeding truths & myths...");
const myths = [
  { myth: "Online casinos always rig games", truth: "Regulated casinos use certified RNGs audited regularly", source: "AGCO", category: "Game Integrity" },
  { myth: "You can never withdraw money", truth: "Regulated casinos must process withdrawals within 5-7 business days", source: "AGCO", category: "Payments" },
  { myth: "KYC is a scam", truth: "KYC is legal compliance required by all regulated casinos", source: "FINTRAC", category: "Compliance" },
  { myth: "Casinos lock accounts to steal winnings", truth: "Accounts are locked for terms violations, must be explained", source: "AGCO", category: "Account Management" },
  { myth: "Regulated casinos are expensive", truth: "Regulated casinos have better protections and lower fraud risk", source: "Industry", category: "Licensing" },
  { myth: "Support is always useless", truth: "Regulated casinos have professional support with SLAs", source: "AGCO", category: "Support" },
  { myth: "You will always lose", truth: "Regulated casinos have verified RTPs of 95-98%", source: "Certification", category: "Game Integrity" },
  { myth: "Offshore casinos are the same", truth: "Offshore casinos have no player protections", source: "Protection Orgs", category: "Licensing" },
];

for (const m of myths) {
  try {
    await connection.execute(
      `INSERT IGNORE INTO truths_and_myths (myth, truth, source, category) VALUES (?, ?, ?, ?)`,
      [m.myth, m.truth, m.source, m.category]
    );
  } catch (e) {
    console.log(`Note: Myth already exists or error:`, e.message.slice(0, 50));
  }
}
console.log("✓ Truths & myths seeded");

// Clear existing reports
console.log("Clearing existing reports...");
try {
  await connection.execute("DELETE FROM reports");
  console.log("✓ Reports cleared");
} catch (e) {
  console.log("Note: Could not clear reports:", e.message.slice(0, 50));
}

console.log("\n✅ Database seeding complete!");
await connection.end();
