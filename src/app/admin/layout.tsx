import Link from "next/link";
import { logoutAction } from "@/lib/adminActions";
import { requireAdmin } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/promotions", label: "Ads & Promotions" },
  { href: "/admin/departments", label: "Departments" },
  { href: "/admin/doctors", label: "Doctors" },
  { href: "/admin/health-packages", label: "Health Packages" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/inquiries", label: "Inquiries" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await requireAdmin();

  if (!authed) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--surface-tint)]">
      <aside className="w-56 shrink-0 border-r border-[var(--line)] bg-[var(--surface)] px-4 py-6">
        <p className="mb-6 px-2 text-sm font-bold text-[var(--brand)]">NGCC Admin</p>
        <nav className="space-y-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-[var(--ink-soft)] hover:bg-[var(--brand-soft)] hover:text-[var(--brand)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="mt-6 px-2">
          <button type="submit" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--crit)]">
            Log out
          </button>
        </form>
        <Link href="/" className="mt-2 block px-2 text-xs text-[var(--ink-soft)] hover:text-[var(--brand)]">
          ← View live site
        </Link>
      </aside>
      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
