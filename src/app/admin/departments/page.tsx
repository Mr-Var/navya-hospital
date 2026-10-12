import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteDepartmentAction } from "@/lib/adminActions";

export default async function AdminDepartmentsPage() {
  const departments = await prisma.department.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--ink)]">Departments</h1>
        <Link href="/admin/departments/new" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          + New Department
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-[var(--surface-tint)] text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Wait / Beds</th>
              <th className="px-4 py-3 font-medium">Published</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {departments.map((d) => (
              <tr key={d.id}>
                <td className="px-4 py-3 font-medium text-[var(--ink)]">{d.name}</td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">
                  {d.waitMinutes} min · {d.bedsFree}/{d.bedsTotal}
                </td>
                <td className="px-4 py-3">
                  {d.published ? (
                    <span className="text-[var(--good)]">Yes</span>
                  ) : (
                    <span className="text-[var(--ink-soft)]">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/departments/${d.id}`} className="text-[var(--brand)] hover:underline">
                    Edit
                  </Link>
                  <form action={deleteDepartmentAction} className="inline">
                    <input type="hidden" name="id" value={d.id} />
                    <button type="submit" className="ml-4 text-[var(--crit)] hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
