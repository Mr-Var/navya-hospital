import { getDepartments } from "@/lib/data";

export default async function LiveStatusPage() {
  const departments = await getDepartments();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--ink)]">Live Status</h1>
      <p className="mt-2 text-[var(--ink-soft)]">
        Wait times and bed availability by department, updated by hospital staff throughout the day.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--line)]">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-[var(--surface-tint)] text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Wait time</th>
              <th className="px-4 py-3 font-medium">Beds free</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {departments.map((d) => (
              <tr key={d.id}>
                <td className="px-4 py-3 font-medium text-[var(--ink)]">{d.name}</td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">~{d.waitMinutes} min</td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">
                  {d.bedsFree} / {d.bedsTotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-[var(--ink-soft)]">
        Figures are indicative and updated periodically by staff — call ahead to confirm before visiting.
      </p>
    </div>
  );
}
