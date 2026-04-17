import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  applyResponseFilters,
  fetchSupabaseRows,
  readFallbackRows,
  rowsToCsv,
  type ResponseFilters,
} from "@/lib/admin-responses";

const AUTH_COOKIE = "kubeboat_admin_auth";

export async function GET(req: Request) {
  if (cookies().get(AUTH_COOKIE)?.value !== "1") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const filters: ResponseFilters = {
    q: (searchParams.get("q") ?? "").trim(),
    source:
      searchParams.get("source") === "supabase" || searchParams.get("source") === "fallback"
        ? (searchParams.get("source") as "supabase" | "fallback")
        : "all",
    dateFrom: searchParams.get("date_from") ?? "",
    dateTo: searchParams.get("date_to") ?? "",
  };

  const supabaseResult = await fetchSupabaseRows().catch((error) => ({
    rows: [],
    error: error instanceof Error ? error.message : "unknown",
  }));
  const fallbackRows = await readFallbackRows();
  const allRows = [...supabaseResult.rows, ...fallbackRows].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
  const filtered = applyResponseFilters(allRows, filters);
  const csv = rowsToCsv(filtered);

  const today = new Date().toISOString().slice(0, 10);
  const parts = ["kubeboat-responses", today];
  if (filters.source !== "all") parts.push(`source-${filters.source}`);
  if (filters.dateFrom) parts.push(`from-${filters.dateFrom}`);
  if (filters.dateTo) parts.push(`to-${filters.dateTo}`);
  if (filters.q) {
    const qSafe = filters.q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (qSafe) parts.push(`q-${qSafe.slice(0, 40)}`);
  }
  const filename = `${parts.join("_")}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
