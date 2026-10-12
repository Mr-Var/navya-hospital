import type { Page } from "@prisma/client";

export function TextPage({ page, fallbackTitle }: { page: Page | null; fallbackTitle: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--ink)]">{page?.title ?? fallbackTitle}</h1>
      <div className="mt-6 space-y-4 text-[var(--ink-soft)]">
        {(page?.body ?? "").split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}
