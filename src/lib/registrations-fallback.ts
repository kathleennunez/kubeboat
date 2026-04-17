import { promises as fs } from "fs";
import path from "path";

type BackupRecord = {
  name: string;
  email: string;
  company: string;
  dietaryConstraints: string;
  refundableDeposit: string;
  privacyConsent: boolean;
  submittedAt: string;
  storage: "supabase" | "fallback";
  status: "saved" | "fallback_saved";
  reason?: string;
};

const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const BACKUP_FILE = path.join(DATA_DIR, "registrations-backup.ndjson");

export async function appendBackupRecord(record: BackupRecord) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(BACKUP_FILE, `${JSON.stringify(record)}\n`, "utf8");
    return true;
  } catch (error) {
    console.error("Fallback backup write failed", error);
    return false;
  }
}
