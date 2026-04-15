import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

type Registration = {
  name: string;
  email: string;
  company: string;
  dietaryConstraints: string;
  submittedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "registrations.json");

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: Record<string, unknown>) {
  const name = normalize(payload.name);
  const email = normalize(payload.email).toLowerCase();
  const company = normalize(payload.company);
  const dietaryConstraints = normalize(payload.dietaryConstraints);

  if (!name) return { ok: false as const, message: "Name is required." };
  if (!email) return { ok: false as const, message: "Email is required." };
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false as const, message: "Please provide a valid email address." };
  }

  return {
    ok: true as const,
    registration: { name, email, company, dietaryConstraints },
  };
}

async function readRegistrations(): Promise<Registration[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const result = validate(body);

    if (!result.ok) {
      return NextResponse.json({ ok: false, message: result.message }, { status: 400 });
    }

    await fs.mkdir(DATA_DIR, { recursive: true });
    const existing = await readRegistrations();

    const duplicate = existing.some((entry) => entry.email === result.registration.email);
    if (duplicate) {
      return NextResponse.json(
        { ok: false, message: "This email is already registered." },
        { status: 409 },
      );
    }

    const next: Registration[] = [
      ...existing,
      {
        ...result.registration,
        submittedAt: new Date().toISOString(),
      },
    ];

    await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), "utf8");

    return NextResponse.json({ ok: true, message: "Registration saved." }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not save registration. Please try again." },
      { status: 500 },
    );
  }
}
