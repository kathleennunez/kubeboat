import { NextResponse } from "next/server";
import { appendBackupRecord } from "@/lib/registrations-fallback";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: Record<string, unknown>) {
  const name = normalize(payload.name);
  const email = normalize(payload.email).toLowerCase();
  const company = normalize(payload.company);
  const dietaryConstraints = normalize(payload.dietaryConstraints);
  const refundableDeposit = normalize(payload.refundableDeposit);
  const privacyConsent = payload.privacyConsent === true;

  if (!name) return { ok: false as const, message: "Name is required." };
  if (!email) return { ok: false as const, message: "Email is required." };
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false as const, message: "Please provide a valid email address." };
  }
  if (!privacyConsent) {
    return { ok: false as const, message: "Privacy policy consent is required." };
  }

  return {
    ok: true as const,
    registration: { name, email, company, dietaryConstraints, refundableDeposit, privacyConsent },
  };
}

export async function POST(req: Request) {
  let fallbackPayload:
    | {
        name: string;
        email: string;
        company: string;
        dietaryConstraints: string;
        refundableDeposit: string;
        privacyConsent: boolean;
        submittedAt: string;
      }
    | undefined;

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const result = validate(body);

    if (!result.ok) {
      return NextResponse.json({ ok: false, message: result.message }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    fallbackPayload = {
      ...result.registration,
      submittedAt,
    };

    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("registrations").insert({
      name: result.registration.name,
      email: result.registration.email,
      company: result.registration.company,
      dietary_constraints: result.registration.dietaryConstraints,
      refundable_deposit: result.registration.refundableDeposit,
      privacy_consent: result.registration.privacyConsent,
      submitted_at: submittedAt,
    });

    if (error) {
      console.error("Supabase insert error", { code: error.code, message: error.message, details: error.details });
      if (error.code === "23505") {
        return NextResponse.json(
          { ok: false, message: "This email is already registered." },
          { status: 409 },
        );
      }

      await appendBackupRecord({
        ...fallbackPayload,
        storage: "fallback",
        status: "fallback_saved",
        reason: `supabase_error:${error.code ?? "unknown"}:${error.message}`,
      });

      return NextResponse.json(
        {
          ok: true,
          message:
            "Supabase is temporarily unavailable. Your registration was saved to fallback storage and will be recoverable.",
        },
        { status: 201 },
      );
    }

    await appendBackupRecord({
      ...fallbackPayload,
      storage: "supabase",
      status: "saved",
    });

    return NextResponse.json({ ok: true, message: "Registration saved." }, { status: 201 });
  } catch (error) {
    console.error("Registration API exception", error);
    if (fallbackPayload) {
      await appendBackupRecord({
        ...fallbackPayload,
        storage: "fallback",
        status: "fallback_saved",
        reason: error instanceof Error ? `exception:${error.message}` : "exception:unknown",
      });

      return NextResponse.json(
        {
          ok: true,
          message:
            "Supabase is temporarily unavailable. Your registration was saved to fallback storage and will be recoverable.",
        },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { ok: false, message: "Could not save registration. Please try again." },
      { status: 500 },
    );
  }
}
