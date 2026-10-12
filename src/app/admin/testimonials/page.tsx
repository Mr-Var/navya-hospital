import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTestimonialAction } from "@/lib/adminActions";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--ink)]">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          + New Testimonial
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-start justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <div>
              <p className="font-medium text-[var(--ink)]">{t.name} · {"★".repeat(t.rating)}</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{t.message}</p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link href={`/admin/testimonials/${t.id}`} className="text-[var(--brand)] hover:underline">
                Edit
              </Link>
              <form action={deleteTestimonialAction}>
                <input type="hidden" name="id" value={t.id} />
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
