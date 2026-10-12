import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveTestimonialAction } from "@/lib/adminActions";

export default async function AdminTestimonialEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const testimonial = isNew ? null : await prisma.testimonial.findUnique({ where: { id } });

  if (!isNew && !testimonial) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[var(--ink)]">{isNew ? "New Testimonial" : `Edit testimonial`}</h1>

      <form action={saveTestimonialAction} className="mt-6 space-y-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
        {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

        <Field label="Patient name">
          <input name="name" defaultValue={testimonial?.name} required className={inputClass} />
        </Field>

        <Field label="Message">
          <textarea name="message" defaultValue={testimonial?.message} rows={3} required className={inputClass} />
        </Field>

        <Field label="Rating (1-5)">
          <input type="number" name="rating" min={1} max={5} defaultValue={testimonial?.rating ?? 5} className={inputClass} />
        </Field>

        <Field label="Display order">
          <input type="number" name="order" defaultValue={testimonial?.order ?? 0} className={inputClass} />
        </Field>

        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="published" defaultChecked={testimonial?.published ?? true} />
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
