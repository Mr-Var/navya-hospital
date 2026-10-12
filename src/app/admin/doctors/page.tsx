import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteDoctorAction } from "@/lib/adminActions";

export default async function AdminDoctorsPage() {
  const doctors = await prisma.doctor.findMany({ include: { department: true }, orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--ink)]">Doctors</h1>
        <Link href="/admin/doctors/new" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          + New Doctor
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-[var(--surface-tint)] text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Available</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td className="px-4 py-3 font-medium text-[var(--ink)]">{doc.name}</td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">{doc.department?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  {doc.available ? <span className="text-[var(--good)]">Yes</span> : <span className="text-[var(--ink-soft)]">No</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/doctors/${doc.id}`} className="text-[var(--brand)] hover:underline">
                    Edit
                  </Link>
                  <form action={deleteDoctorAction} className="inline">
                    <input type="hidden" name="id" value={doc.id} />
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
