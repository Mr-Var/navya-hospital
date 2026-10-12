import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteFaqAction } from "@/lib/adminActions";

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--ink)]">FAQs</h1>
        <Link href="/admin/faqs/new" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          + New FAQ
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="flex items-start justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <div>
              <p className="font-medium text-[var(--ink)]">{f.question}</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{f.answer}</p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link href={`/admin/faqs/${f.id}`} className="text-[var(--brand)] hover:underline">
                Edit
              </Link>
              <form action={deleteFaqAction}>
                <input type="hidden" name="id" value={f.id} />
                <button type="submit" className="text-[var(--crit)] hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
