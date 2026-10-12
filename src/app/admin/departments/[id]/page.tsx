import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveDepartmentAction } from "@/lib/adminActions";

export default async function AdminDepartmentEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const department = isNew ? null : await prisma.department.findUnique({ where: { id } });

  if (!isNew && !department) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[var(--ink)]">{isNew ? "New Department" : `Edit ${department?.name}`}</h1>

      <form action={saveDepartmentAction} className="mt-6 space-y-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
        {department && <input type="hidden" name="id" value={department.id} />}

        <Field label="Name">
          <input name="name" defaultValue={department?.name} required className={inputClass} />
        </Field>

        <Field label="URL slug (lowercase, no spaces)">
          <input name="slug" defaultValue={department?.slug} required className={inputClass} />
        </Field>

        <Field label="Short summary (shown on cards)">
          <input name="summary" defaultValue={department?.summary} required className={inputClass} />
        </Field>

        <Field label="Full description (shown on department page)">
          <textarea name="description" defaultValue={department?.description} rows={4} required className={inputClass} />
        </Field>

        <Field label="Icon">
          <select name="icon" defaultValue={department?.icon ?? "stethoscope"} className={inputClass}>
            <option value="stethoscope">Stethoscope (general medicine)</option>
            <option value="heart">Heart (cardiology)</option>
            <option value="brain">Brain (neurology)</option>
            <option value="bone">Bone (orthopaedics)</option>
            <option value="baby">Baby (maternity / gynaecology)</option>
            <option value="stomach">Stomach (gastroenterology)</option>
            <option value="lungs">Lungs (pulmonology)</option>
          </select>
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Wait time (minutes)">
            <input type="number" name="waitMinutes" defaultValue={department?.waitMinutes ?? 15} className={inputClass} />
          </Field>
          <Field label="Total beds">
            <input type="number" name="bedsTotal" defaultValue={department?.bedsTotal ?? 20} className={inputClass} />
          </Field>
          <Field label="Beds free">
            <input type="number" name="bedsFree" defaultValue={department?.bedsFree ?? 8} className={inputClass} />
          </Field>
        </div>

        <Field label="Display order (lower shows first)">
          <input type="number" name="order" defaultValue={department?.order ?? 0} className={inputClass} />
        </Field>

        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="published" defaultChecked={department?.published ?? true} />
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
