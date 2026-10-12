import { getDepartments } from "@/lib/data";
import { DepartmentCard } from "@/components/cards";

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--ink)]">Departments</h1>
      <p className="mt-2 text-[var(--ink-soft)]">
        {departments.length} specialties under one roof, with same-day visits available across the week.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <DepartmentCard key={d.id} department={d} />
        ))}
      </div>
    </div>
  );
}
