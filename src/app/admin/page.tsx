import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [departments, doctors, packages, inquiries, newInquiries] = await Promise.all([
    prisma.department.count(),
    prisma.doctor.count(),
    prisma.healthPackage.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "new" } }),
  ]);

  const tiles = [
    { label: "Departments", value: departments, href: "/admin/departments" },
    { label: "Doctors", value: doctors, href: "/admin/doctors" },
    { label: "Health Packages", value: packages, href: "/admin/health-packages" },
    { label: "Inquiries (new)", value: `${newInquiries} / ${inquiries}`, href: "/admin/inquiries" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)]">Dashboard</h1>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        Edit anything here and it updates the live site immediately — no code changes needed.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 hover:border-[var(--brand)] hover:shadow-sm"
          >
            <p className="text-2xl font-bold text-[var(--brand)]">{t.value}</p>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{t.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
