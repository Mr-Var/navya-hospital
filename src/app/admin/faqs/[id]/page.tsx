import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveFaqAction } from "@/lib/adminActions";

export default async function AdminFaqEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const faq = isNew ? null : await prisma.faq.findUnique({ where: { id } });

  if (!isNew && !faq) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[var(--ink)]">{isNew ? "New FAQ" : "Edit FAQ"}</h1>

      <form action={saveFaqAction} className="mt-6 space-y-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
        {faq && <input type="hidden" name="id" value={faq.id} />}

        <Field label="Question">
          <input name="question" defaultValue={faq?.question} required className={inputClass} />
        </Field>

        <Field label="Answer">
          <textarea name="answer" defaultValue={faq?.answer} rows={3} required className={inputClass} />
        </Field>

        <Field label="Display order">
          <input type="number" name="order" defaultValue={faq?.order ?? 0} className={inputClass} />
        </Field>

        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="published" defaultChecked={faq?.published ?? true} />
          Published (visible on live site)
        </label>

        <button type="submit" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          Save
        </button>
      </form>
    </div>
  );
}

const inputClass = "mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--ink)]">{label}</label>
      {children}
    </div>
  );
}
