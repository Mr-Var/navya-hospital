import { prisma } from "@/lib/prisma";
import { updateInquiryStatusAction } from "@/lib/adminActions";

const STATUS_OPTIONS = ["new", "contacted", "resolved"];

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)]">Inquiries</h1>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        Appointment requests, callback requests, and ambulance requests submitted from the website.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[var(--surface-tint)] text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-medium">Received</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {inquiries.map((inq) => (
              <tr key={inq.id}>
                <td className="px-4 py-3 whitespace-nowrap text-[var(--ink-soft)]">
                  {inq.createdAt.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 capitalize text-[var(--ink-soft)]">{inq.type}</td>
                <td className="px-4 py-3 font-medium text-[var(--ink)]">{inq.name}</td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">{inq.phone}</td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">{inq.department ?? "—"}</td>
                <td className="px-4 py-3 max-w-xs truncate text-[var(--ink-soft)]">{inq.message ?? "—"}</td>
                <td className="px-4 py-3">
                  <form action={updateInquiryStatusAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={inq.id} />
                    <select
                      name="status"
                      defaultValue={inq.status}
                      className="rounded-md border border-[var(--line)] px-2 py-1 text-xs"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="text-xs font-medium text-[var(--brand)] hover:underline">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-[var(--ink-soft)]">
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
