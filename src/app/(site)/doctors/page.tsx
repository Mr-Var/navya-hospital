import { getDoctors, getDepartments } from "@/lib/data";
import { DoctorCard } from "@/components/cards";

export default async function DoctorsPage() {
  const [doctors, departments] = await Promise.all([getDoctors(), getDepartments()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--ink)]">Doctors</h1>
      <p className="mt-2 text-[var(--ink-soft)]">Browse all doctors, or visit a department page to book directly.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {departments.map((d) => (
          <a
            key={d.id}
            href={`/departments/${d.slug}`}
            className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            {d.name}
          </a>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
}
