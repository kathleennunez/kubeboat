import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  applyResponseFilters,
  fetchSupabaseRows,
  paginateRows,
  readFallbackRows,
  type ResponseFilters,
} from "@/lib/admin-responses";

const AUTH_COOKIE = "kubeboat_admin_auth";
const PAGE_SIZE = 25;

type SearchParams = Record<string, string | string[] | undefined>;

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function toPositiveInt(value: string, fallback: number) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) return fallback;
  return parsed;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

async function loginAction(formData: FormData) {
  "use server";
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;
  const submitted = String(formData.get("password") ?? "");

  if (!expected) redirect("/admin/responses?error=config");
  if (submitted !== expected) redirect("/admin/responses?error=invalid");

  cookies().set(AUTH_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  redirect("/admin/responses");
}

async function logoutAction() {
  "use server";
  cookies().delete(AUTH_COOKIE);
  redirect("/admin/responses");
}

export default async function AdminResponsesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const isAuthenticated = cookies().get(AUTH_COOKIE)?.value === "1";
  const isPasswordConfigured = Boolean(process.env.ADMIN_DASHBOARD_PASSWORD);
  const errorParam = firstParam(searchParams?.error);

  if (!isAuthenticated) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-4 py-12">
        <div className="w-full border-4 border-outline-variant bg-surface-container-low p-6 sm:p-8">
          <h1 className="mb-4 font-headline text-2xl font-black uppercase italic text-primary sm:text-3xl">
            Admin Access
          </h1>
          <p className="mb-6 text-sm text-on-surface-variant">
            Enter the admin password to view registration responses.
          </p>

          {!isPasswordConfigured ? (
            <p className="border border-primary/40 bg-primary/10 p-3 text-sm text-primary">
              Missing `ADMIN_DASHBOARD_PASSWORD` in `.env.local`.
            </p>
          ) : null}

          {errorParam === "invalid" ? (
            <p className="mb-4 border border-primary/40 bg-primary/10 p-3 text-sm text-primary">
              Incorrect password.
            </p>
          ) : null}

          {errorParam === "config" ? (
            <p className="mb-4 border border-primary/40 bg-primary/10 p-3 text-sm text-primary">
              Password is not configured on the server.
            </p>
          ) : null}

          <form action={loginAction} className="space-y-4">
            <input
              className="w-full border-4 border-outline-variant bg-surface-container-highest px-4 py-3 text-on-surface focus:border-primary focus:ring-0"
              name="password"
              placeholder="Admin password"
              type="password"
              required
            />
            <button
              className="w-full bg-primary px-4 py-3 font-headline text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-background"
              type="submit"
            >
              Unlock Responses
            </button>
          </form>
        </div>
      </main>
    );
  }

  const filters: ResponseFilters = {
    q: firstParam(searchParams?.q).trim(),
    source: (firstParam(searchParams?.source) === "supabase" ||
    firstParam(searchParams?.source) === "fallback"
      ? firstParam(searchParams?.source)
      : "all") as ResponseFilters["source"],
    dateFrom: firstParam(searchParams?.date_from),
    dateTo: firstParam(searchParams?.date_to),
  };
  const page = toPositiveInt(firstParam(searchParams?.page), 1);

  let supabaseRows = [] as Awaited<ReturnType<typeof fetchSupabaseRows>>["rows"];
  let supabaseError = "";
  try {
    const result = await fetchSupabaseRows();
    supabaseRows = result.rows;
    supabaseError = result.error;
  } catch (error) {
    supabaseError = error instanceof Error ? error.message : "Unknown Supabase error";
  }

  const fallbackRows = await readFallbackRows();
  const allRows = [...supabaseRows, ...fallbackRows].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
  const filteredRows = applyResponseFilters(allRows, filters);
  const paged = paginateRows(filteredRows, page, PAGE_SIZE);

  const makeQuery = (overrides: Partial<Record<"q" | "source" | "date_from" | "date_to" | "page", string>>) => {
    const params = new URLSearchParams();
    const next = {
      q: filters.q,
      source: filters.source,
      date_from: filters.dateFrom,
      date_to: filters.dateTo,
      page: String(paged.currentPage),
      ...overrides,
    };
    if (next.q) params.set("q", next.q);
    if (next.source && next.source !== "all") params.set("source", next.source);
    if (next.date_from) params.set("date_from", next.date_from);
    if (next.date_to) params.set("date_to", next.date_to);
    if (next.page && next.page !== "1") params.set("page", next.page);
    const query = params.toString();
    return query ? `?${query}` : "";
  };

  const firstPageLink = Math.max(1, paged.currentPage - 2);
  const lastPageLink = Math.min(paged.pageCount, firstPageLink + 4);
  const adjustedFirst = Math.max(1, lastPageLink - 4);
  const pageLinks = Array.from({ length: lastPageLink - adjustedFirst + 1 }, (_, i) => adjustedFirst + i);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-headline text-2xl font-black uppercase italic text-primary sm:text-3xl">
          Registration Responses
        </h1>
        <div className="flex items-center gap-2">
          <Link
            className="border-2 border-primary px-3 py-2 font-headline text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
            href={`/admin/responses/export${makeQuery({ page: "1" })}`}
          >
            Export CSV
          </Link>
          <form action={logoutAction}>
            <button
              className="border-2 border-primary px-3 py-2 font-headline text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
              type="submit"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      <section className="mb-6 border-4 border-outline-variant bg-surface-container-low p-4 sm:p-6">
        <h2 className="mb-4 font-headline text-lg font-bold uppercase tracking-wide text-primary">
          Filters
        </h2>
        <form action="/admin/responses" className="grid grid-cols-1 gap-3 md:grid-cols-5">
          <input
            className="border-2 border-outline-variant bg-surface-container-highest px-3 py-2 text-sm text-on-surface focus:border-primary focus:ring-0"
            defaultValue={filters.q}
            name="q"
            placeholder="Search name/email/company"
            type="text"
          />
          <select
            className="border-2 border-outline-variant bg-surface-container-highest px-3 py-2 text-sm text-on-surface focus:border-primary focus:ring-0"
            defaultValue={filters.source}
            name="source"
          >
            <option value="all">All sources</option>
            <option value="supabase">Supabase</option>
            <option value="fallback">Fallback</option>
          </select>
          <input
            className="border-2 border-outline-variant bg-surface-container-highest px-3 py-2 text-sm text-on-surface focus:border-primary focus:ring-0"
            defaultValue={filters.dateFrom}
            name="date_from"
            type="date"
          />
          <input
            className="border-2 border-outline-variant bg-surface-container-highest px-3 py-2 text-sm text-on-surface focus:border-primary focus:ring-0"
            defaultValue={filters.dateTo}
            name="date_to"
            type="date"
          />
          <div className="flex gap-2">
            <button
              className="w-full bg-primary px-3 py-2 font-headline text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-background"
              type="submit"
            >
              Apply
            </button>
            <Link
              className="w-full border-2 border-outline-variant px-3 py-2 text-center font-headline text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:border-primary hover:text-primary"
              href="/admin/responses"
            >
              Reset
            </Link>
          </div>
        </form>
      </section>

      {supabaseError ? (
        <p className="mb-6 border border-primary/40 bg-primary/10 p-3 text-sm text-primary">
          Supabase read warning: {supabaseError}
        </p>
      ) : null}

      <section className="border-4 border-outline-variant bg-surface-container-low p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-on-surface-variant">
          <p>
            Showing <span className="font-bold text-on-surface">{paged.items.length}</span> of{" "}
            <span className="font-bold text-on-surface">{filteredRows.length}</span> filtered rows
            ({allRows.length} total, {fallbackRows.length} fallback).
          </p>
          <p>
            Page <span className="font-bold text-on-surface">{paged.currentPage}</span> /{" "}
            <span className="font-bold text-on-surface">{paged.pageCount}</span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant text-on-surface-variant">
                <th className="px-3 py-2">Submitted</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Company</th>
                <th className="px-3 py-2">Deposit</th>
                <th className="px-3 py-2">Consent</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Reason</th>
              </tr>
            </thead>
            <tbody>
              {paged.items.map((row) => (
                <tr key={`${row.source}-${row.email}-${row.submittedAt}`} className="border-b border-outline-variant/40">
                  <td className="px-3 py-2">{formatDate(row.submittedAt)}</td>
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.email}</td>
                  <td className="px-3 py-2">{row.company || "-"}</td>
                  <td className="px-3 py-2">{row.refundableDeposit || "-"}</td>
                  <td className="px-3 py-2">{row.privacyConsent ? "Yes" : "No"}</td>
                  <td className="px-3 py-2">{row.source}</td>
                  <td className="px-3 py-2">{row.status}</td>
                  <td className="px-3 py-2">{row.reason || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            className={`border-2 px-3 py-2 font-headline text-xs font-bold uppercase tracking-wider ${
              paged.currentPage > 1
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-outline-variant text-on-surface-variant opacity-50 pointer-events-none"
            }`}
            href={`/admin/responses${makeQuery({ page: String(paged.currentPage - 1) })}`}
          >
            Previous
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {pageLinks.map((num) => (
              <Link
                key={num}
                className={`border px-3 py-2 font-headline text-xs font-bold tracking-wider ${
                  num === paged.currentPage
                    ? "border-primary bg-primary text-white"
                    : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
                href={`/admin/responses${makeQuery({ page: String(num) })}`}
              >
                {num}
              </Link>
            ))}
          </div>
          <Link
            className={`border-2 px-3 py-2 font-headline text-xs font-bold uppercase tracking-wider ${
              paged.currentPage < paged.pageCount
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-outline-variant text-on-surface-variant opacity-50 pointer-events-none"
            }`}
            href={`/admin/responses${makeQuery({ page: String(paged.currentPage + 1) })}`}
          >
            Next
          </Link>
        </div>
      </section>
    </main>
  );
}
