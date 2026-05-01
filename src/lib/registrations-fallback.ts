import { getSupabaseAdminClient } from "@/lib/supabase-admin";

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

export async function appendBackupRecord(record: BackupRecord) {
  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("registrations_fallback").insert({
      name: record.name,
      email: record.email,
      company: record.company,
      dietary_constraints: record.dietaryConstraints,
      refundable_deposit: record.refundableDeposit,
      privacy_consent: record.privacyConsent,
      submitted_at: record.submittedAt,
      storage: record.storage,
      status: record.status,
      reason: record.reason ?? "",
    });
    if (error) {
      console.error("Supabase fallback write failed", {
        code: error.code,
        message: error.message,
        details: error.details,
      });
      return false;
    }
    return true;
  } catch (error) {
    console.error("Fallback backup write exception", error);
    return false;
  }
}
