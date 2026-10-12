import type { Faq } from "@prisma/client";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(51,23,44,0.04)]">
      {faqs.map((faq) => (
        <details key={faq.id} className="group p-5 open:bg-[var(--surface-tint)]/40">
          <summary className="cursor-pointer list-none font-medium text-[var(--ink)] marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {faq.question}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-sm text-[var(--brand)] transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
