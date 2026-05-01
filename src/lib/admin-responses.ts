import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export type ResponseSource = "supabase" | "fallback";

export type ResponseRow = {
  submittedAt: string;
  name: string;
  email: string;
  company: string;
  refundableDeposit: string;
  privacyConsent: boolean;
  source: ResponseSource;
  status: "saved" | "fallback_saved";
  reason: string;
};

type SupabaseRegistration = {
  name: string;
  email: string;
  company: string;
  dietary_constraints: string;
  refundable_deposit: string;
  privacy_consent: boolean;
  submitted_at: string;
};

type BackupRegistration = {
  name: string;
  email: string;
  company: string;
  dietary_constraints: string;
  refundable_deposit: string;
  privacy_consent: boolean;
  submitted_at: string;
  storage: "supabase" | "fallback";
  status: "saved" | "fallback_saved";
  reason?: string;
};

export type ResponseFilters = {
  q: string;
  source: "all" | ResponseSource;
  dateFrom: string;
  dateTo: string;
};

export async function fetchSupabaseRows() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("registrations")
    .select(
      "name,email,company,dietary_constraints,refundable_deposit,privacy_consent,submitted_at",
    )
    .order("submitted_at", { ascending: false })
    .limit(5000);

  if (error) {
    return { rows: [] as ResponseRow[], error: `${error.code ?? "unknown"}: ${error.message}` };
  }

  const rows = ((data ?? []) as SupabaseRegistration[]).map((row) => ({
    submittedAt: row.submitted_at,
    name: row.name,
    email: row.email,
    company: row.company || "",
    refundableDeposit: row.refundable_deposit || "",
    privacyConsent: row.privacy_consent,
    source: "supabase" as const,
    status: "saved" as const,
    reason: "",
  }));

  return { rows, error: "" };
}

export async function readFallbackRows() {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("registrations_fallback")
      .select(
        "name,email,company,dietary_constraints,refundable_deposit,privacy_consent,submitted_at,storage,status,reason",
      )
      .eq("storage", "fallback")
      .order("submitted_at", { ascending: false })
      .limit(5000);

    if (error) {
      console.error("Supabase fallback read error", {
        code: error.code,
        message: error.message,
        details: error.details,
      });
      return [] as ResponseRow[];
    }

    return ((data ?? []) as BackupRegistration[]).map((row) => ({
      submittedAt: row.submitted_at,
      name: row.name,
      email: row.email,
      company: row.company || "",
      refundableDeposit: row.refundable_deposit || "",
      privacyConsent: row.privacy_consent,
      source: "fallback" as const,
      status: "fallback_saved" as const,
      reason: row.reason || "",
    }));
  } catch {
    return [] as ResponseRow[];
  }
}

export function applyResponseFilters(rows: ResponseRow[], filters: ResponseFilters) {
  const q = filters.q.trim().toLowerCase();
  const fromDate = filters.dateFrom ? new Date(`${filters.dateFrom}T00:00:00`) : null;
  const toDate = filters.dateTo ? new Date(`${filters.dateTo}T23:59:59.999`) : null;

  return rows.filter((row) => {
    if (filters.source !== "all" && row.source !== filters.source) return false;

    if (q) {
      const haystack = `${row.name} ${row.email} ${row.company}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    const submitted = new Date(row.submittedAt);
    if (fromDate && submitted < fromDate) return false;
    if (toDate && submitted > toDate) return false;

    return true;
  });
}

export function paginateRows<T>(rows: T[], page: number, pageSize: number) {
  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = (currentPage - 1) * pageSize;
  const items = rows.slice(start, start + pageSize);

  return { items, total, pageCount, currentPage };
}

function csvEscape(value: string) {
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}

export function rowsToCsv(rows: ResponseRow[]) {
  const header = [
    "submitted_at",
    "name",
    "email",
    "company",
    "refundable_deposit",
    "privacy_consent",
    "source",
    "status",
    "reason",
  ];

  const lines = rows.map((row) =>
    [
      row.submittedAt,
      row.name,
      row.email,
      row.company,
      row.refundableDeposit,
      row.privacyConsent ? "true" : "false",
      row.source,
      row.status,
      row.reason,
    ]
      .map((value) => csvEscape(String(value)))
      .join(","),
  );

  return [header.join(","), ...lines].join("\n");
}
