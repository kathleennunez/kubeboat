"use client";

import { FormEvent, useState } from "react";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      dietaryConstraints: String(data.get("dietaryConstraints") ?? ""),
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !result.ok) {
        setStatus({ type: "error", message: result.message || "Registration failed." });
        return;
      }

      form.reset();
      setStatus({ type: "success", message: "Registration saved. See you onboard." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label className="mb-3 block font-headline text-xs uppercase tracking-widest text-on-surface-variant">Name</label>
          <input
            name="name"
            required
            className="w-full border-4 border-outline-variant bg-surface-container-highest px-4 py-3 text-on-surface placeholder:opacity-30 focus:border-primary focus:ring-0"
            placeholder="Full Captain Name"
            type="text"
          />
        </div>
        <div>
          <label className="mb-3 block font-headline text-xs uppercase tracking-widest text-on-surface-variant">Email</label>
          <input
            name="email"
            required
            className="w-full border-4 border-outline-variant bg-surface-container-highest px-4 py-3 text-on-surface placeholder:opacity-30 focus:border-primary focus:ring-0"
            placeholder="crew@company.io"
            type="email"
          />
        </div>
      </div>
      <div>
        <label className="mb-3 block font-headline text-xs uppercase tracking-widest text-on-surface-variant">Company</label>
        <input
          name="company"
          className="w-full border-4 border-outline-variant bg-surface-container-highest px-4 py-3 text-on-surface placeholder:opacity-30 focus:border-primary focus:ring-0"
          placeholder="@octocat"
          type="text"
        />
      </div>
      <div>
        <label className="mb-3 block font-headline text-xs uppercase tracking-widest text-on-surface-variant">DIETARY_CONSTRAINTS</label>
        <textarea
          name="dietaryConstraints"
          className="h-32 w-full border-4 border-outline-variant bg-surface-container-highest px-4 py-3 text-on-surface placeholder:opacity-30 focus:border-primary focus:ring-0"
          placeholder="Any allergy patches required?"
        />
      </div>

      {status.type !== "idle" ? (
        <p
          className={`text-sm font-headline uppercase tracking-[0.12em] ${
            status.type === "success" ? "text-green-400" : "text-primary"
          }`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      ) : null}

      <div className="pt-6">
        <button
          className="pixel-shadow w-full bg-primary py-5 font-headline text-xl font-black uppercase italic tracking-widest text-white transition-all duration-75 steps-4 hover:-translate-y-1 hover:bg-white hover:text-background disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT MANIFEST"}
        </button>
      </div>
    </form>
  );
}
