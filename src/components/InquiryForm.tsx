"use client";

import { useActionState, useState } from "react";
import { submitInquiry, type InquiryActionResult } from "@/lib/actions";

const initialState: InquiryActionResult | null = null;

type InquiryType = "general" | "appointment" | "ambulance";

type InquiryFormProps = {
  type: InquiryType;
  departments?: { id: string; name: string }[];
  submitLabel?: string;
  defaultMessage?: string;
  defaultDepartment?: string;
};

const SUCCESS_COPY: Record<InquiryType, { title: string; lead: string; next: string[] }> = {
  appointment: {
    title: "Appointment request received",
    lead: "Thank you for choosing Navya Global Cancer Centre. Your request is with our front desk.",
    next: [
      "Our team will call you to confirm a date and time.",
      "Please keep your phone reachable — the call may come from a hospital landline.",
      "Bring any previous reports, scans and prescriptions to your visit.",
    ],
  },
  ambulance: {
    title: "Ambulance request received",
    lead: "Our emergency team has been alerted and will call you right away.",
    next: [
      "Keep your phone line free so we can reach you.",
      "Stay with the patient and keep them comfortable.",
      "If the situation is life-threatening, call the emergency number on this page now.",
    ],
  },
  general: {
    title: "Callback request received",
    lead: "Thank you for reaching out. Our team will get back to you shortly.",
    next: [
      "We will call you on the number below.",
      "Keep any policy or ID details handy if your query is about insurance or billing.",
    ],
  },
};

const inputClass =
  "mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none";

// Wrapper: remounting the inner form (new key) resets it for "Submit another request".
export function InquiryForm(props: InquiryFormProps) {
  const [round, setRound] = useState(0);
  return <InquiryFormInner key={round} {...props} onReset={() => setRound((r) => r + 1)} />;
}

function InquiryFormInner({
  type,
  departments = [],
  submitLabel = "Submit",
  defaultMessage = "",
  defaultDepartment = "",
  onReset,
}: InquiryFormProps & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state?.ok) {
    return (
      <InquirySuccess
        type={type}
        name={state.name}
        phone={state.phone}
        department={state.department}
        onReset={onReset}
      />
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
        <input name="name" required className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)]">Phone number</label>
        <input name="phone" required className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)]">Email (optional)</label>
        <input name="email" type="email" className={inputClass} />
      </div>

      {departments.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-[var(--ink)]">Department</label>
          <select name="department" defaultValue={defaultDepartment} className={inputClass}>
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
        <textarea name="message" rows={3} defaultValue={defaultMessage} className={inputClass} />
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

export function InquirySuccess({
  type,
  name,
  phone,
  department,
  onReset,
}: {
  type: InquiryType;
  name: string;
  phone: string;
  department: string | null;
  onReset: () => void;
}) {
  const copy = SUCCESS_COPY[type];
  const urgent = type === "ambulance";
  const accent = urgent ? "var(--crit)" : "var(--good)";
  const accentBg = urgent ? "var(--crit-bg)" : "var(--good-bg)";

  const details: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ...(department ? [["Department", department] as [string, string]] : []),
  ];

  return (
    <div role="status" aria-live="polite" className="animate-pop-in text-center">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: accentBg, boxShadow: `0 0 0 8px color-mix(in srgb, ${accent} 10%, transparent)` }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="none"
          stroke={accent}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" className="animate-draw-check" />
        </svg>
      </div>

      <h3 className="mt-4 text-xl font-bold text-[var(--ink)]">{copy.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">{copy.lead}</p>

      <dl className="mt-5 divide-y divide-[var(--line)] rounded-xl border border-[var(--line)] bg-[var(--bg)] text-left text-sm">
        {details.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 px-4 py-2.5">
            <dt className="text-[var(--ink-soft)]">{label}</dt>
            <dd className="text-right font-semibold text-[var(--ink)]">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--ink-soft)]">What happens next</p>
        <ol className="mt-2 space-y-2">
          {copy.next.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-[var(--ink)]">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[var(--surface)]"
                style={{ background: urgent ? "var(--crit)" : "var(--brand)" }}
              >
                {i + 1}
              </span>
              <span className="leading-snug">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 w-full rounded-md border border-[var(--brand)]/30 px-4 py-2 text-sm font-semibold text-[var(--brand)] transition hover:border-[var(--brand)] hover:bg-[var(--brand-soft)]"
      >
        Submit another request
      </button>
    </div>
  );
}
