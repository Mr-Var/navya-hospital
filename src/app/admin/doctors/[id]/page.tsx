import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveDoctorAction } from "@/lib/adminActions";
import { ImageUploadField } from "@/components/ImageUploadField";

export default async function AdminDoctorEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const [doctor, departments] = await Promise.all([
    isNew ? null : prisma.doctor.findUnique({ where: { id } }),
    prisma.department.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!isNew && !doctor) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[var(--ink)]">{isNew ? "New Doctor" : `Edit ${doctor?.name}`}</h1>

      <form action={saveDoctorAction} className="mt-6 space-y-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
        {doctor && <input type="hidden" name="id" value={doctor.id} />}

        <Field label="Name">
          <input name="name" defaultValue={doctor?.name} required className={inputClass} />
        </Field>

        <Field label="Designation">
          <input name="designation" defaultValue={doctor?.designation} required className={inputClass} />
        </Field>

        <Field label="Department">
          <select name="departmentId" defaultValue={doctor?.departmentId ?? ""} className={inputClass}>
            <option value="">No department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Qualifications">
          <input name="qualifications" defaultValue={doctor?.qualifications} required className={inputClass} />
        </Field>

        <Field label="Short bio">
          <textarea name="bio" defaultValue={doctor?.bio} rows={3} required className={inputClass} />
        </Field>

        <ImageUploadField name="photoUrl" label="Photo" defaultValue={doctor?.photoUrl} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Years of experience">
            <input type="number" name="experienceYrs" defaultValue={doctor?.experienceYrs ?? 0} className={inputClass} />
          </Field>
          <Field label="Display order">
            <input type="number" name="order" defaultValue={doctor?.order ?? 0} className={inputClass} />
          </Field>
        </div>

        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="available" defaultChecked={doctor?.available ?? true} />
          Available now
        </label>

        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="published" defaultChecked={doctor?.published ?? true} />
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
