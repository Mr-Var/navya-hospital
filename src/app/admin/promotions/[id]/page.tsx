import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { savePromotionAction } from "@/lib/adminActions";
import { ImageUploadField } from "@/components/ImageUploadField";

export default async function AdminPromotionEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const promo = isNew ? null : await prisma.promotion.findUnique({ where: { id } });

  if (!isNew && !promo) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[var(--ink)]">{isNew ? "New Promotion Slide" : "Edit Slide"}</h1>

      <form action={savePromotionAction} className="mt-6 space-y-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
        {promo && <input type="hidden" name="id" value={promo.id} />}

        <Field label="Badge (small label, optional) — e.g. LIMITED OFFER">
          <input name="badge" defaultValue={promo?.badge ?? ""} className={inputClass} />
        </Field>

        <Field label="Title">
          <input name="title" defaultValue={promo?.title} required className={inputClass} />
        </Field>

        <Field label="Subtitle">
          <textarea name="subtitle" defaultValue={promo?.subtitle} rows={2} required className={inputClass} />
        </Field>

        <ImageUploadField
          name="imageUrl"
          label="Background image (optional — leave blank to use a plain color background)"
          defaultValue={promo?.imageUrl}
        />

        <Field label="Background color theme (used when there's no image)">
          <select name="theme" defaultValue={promo?.theme ?? "brand"} className={inputClass}>
            <option value="brand">Brand (plum)</option>
            <option value="accent">Accent (coral)</option>
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Button link URL (optional)">
            <input name="linkUrl" defaultValue={promo?.linkUrl ?? ""} className={inputClass} />
          </Field>
          <Field label="Button text">
            <input name="linkLabel" defaultValue={promo?.linkLabel ?? ""} placeholder="Learn more" className={inputClass} />
          </Field>
        </div>

        <Field label="Display order (lower shows first)">
          <input type="number" name="order" defaultValue={promo?.order ?? 0} className={inputClass} />
        </Field>

        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="published" defaultChecked={promo?.published ?? true} />
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
