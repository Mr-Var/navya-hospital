"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryActionResult } from "@/lib/actions";

const initialState: InquiryActionResult | null = null;

export function InquiryForm({
  type,
  departments = [],
  submitLabel = "Submit",
  defaultMessage = "",
  defaultDepartment = "",
}: {
  type: "general" | "appointment" | "ambulance";
  departments?: { id: string; name: string }[];
  submitLabel?: string;
  defaultMessage?: string;
  defaultDepartment?: string;
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state?.ok) {
    return (
      <div className="rounded-lg border border-[var(--good)]/30 bg-[var(--good-bg)] p-4 text-sm text-[var(--good)]">
        Thank you — we&apos;ve received your request and will contact you shortly.
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="type" value={type} />

      {state && !state.ok && (
        <p className="rounded-md bg-[var(--crit-bg)] px-3 py-2 text-sm text-[var(--crit)]">{state.error}</p>
      )}

      <div>
        <label className="block text-sm font-medium text-[var(--ink)]">Full name</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)]">Phone number</label>
        <input
          name="phone"
          required
          className="mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)]">Email (optional)</label>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
        />
      </div>

      {departments.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-[var(--ink)]">Department</label>
          <select
            name="department"
            defaultValue={defaultDepartment}
            className="mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
          >
            <option value="">Select a department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[var(--ink)]">Message (optional)</label>
        <textarea
          name="message"
          rows={3}
          defaultValue={defaultMessage}
          className="mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}
