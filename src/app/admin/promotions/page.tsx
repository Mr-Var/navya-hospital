import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePromotionAction } from "@/lib/adminActions";

export default async function AdminPromotionsPage() {
  const promotions = await prisma.promotion.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ink)]">Ads &amp; Promotions</h1>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            These slides auto-rotate in the banner at the top of the home page.
          </p>
        </div>
        <Link href="/admin/promotions/new" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          + New Slide
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {promotions.map((p) => (
          <div key={p.id} className="flex items-start justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <div>
              <p className="font-medium text-[var(--ink)]">
                {p.title} {!p.published && <span className="ml-2 text-xs font-normal text-[var(--ink-soft)]">(hidden)</span>}
              </p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{p.subtitle}</p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link href={`/admin/promotions/${p.id}`} className="text-[var(--brand)] hover:underline">
                Edit
              </Link>
              <form action={deletePromotionAction}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="text-[var(--crit)] hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {promotions.length === 0 && <p className="text-sm text-[var(--ink-soft)]">No slides yet.</p>}
      </div>
    </div>
  );
}
