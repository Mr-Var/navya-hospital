import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePackageAction } from "@/lib/adminActions";

export default async function AdminPackagesPage() {
  const packages = await prisma.healthPackage.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--ink)]">Health Packages</h1>
        <Link href="/admin/health-packages/new" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          + New Package
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-[var(--surface-tint)] text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {packages.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-[var(--ink)]">{p.name}</td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">₹{p.priceRupees.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/health-packages/${p.id}`} className="text-[var(--brand)] hover:underline">
                    Edit
                  </Link>
                  <form action={deletePackageAction} className="inline">
                    <input type="hidden" name="id" value={p.id} />
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
