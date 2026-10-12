import Link from "next/link";

export function Footer({
  hospitalName,
  phone,
  email,
  address,
  opdHours,
}: {
  hospitalName: string;
  phone: string;
  email: string;
  address: string;
  opdHours: string;
}) {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-[var(--bg)]/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold text-[var(--bg)]">{hospitalName}</p>
          <p className="mt-2 text-sm text-[var(--bg)]/60">{address}</p>
          <p className="mt-1 text-sm text-[var(--bg)]/60">{opdHours}</p>
        </div>

        <div>
          <p className="font-semibold text-[var(--bg)]">Care</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/departments" className="hover:text-[var(--bg)]">Departments</Link></li>
            <li><Link href="/doctors" className="hover:text-[var(--bg)]">Doctors</Link></li>
            <li><Link href="/health-packages" className="hover:text-[var(--bg)]">Health Packages</Link></li>
            <li><Link href="/live-status" className="hover:text-[var(--bg)]">Live Status</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-[var(--bg)]">Patients</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/insurance-billing" className="hover:text-[var(--bg)]">Insurance &amp; Billing</Link></li>
            <li><Link href="/facilities" className="hover:text-[var(--bg)]">Facilities</Link></li>
            <li><Link href="/emergency" className="hover:text-[var(--bg)]">Emergency</Link></li>
            <li><Link href="/about" className="hover:text-[var(--bg)]">About Us</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-[var(--bg)]">Contact</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>{phone}</li>
            <li>{email}</li>
            <li><Link href="/contact" className="hover:text-[var(--bg)]">Contact &amp; location</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--bg)]/10 px-4 py-4 text-center text-xs text-[var(--bg)]/50">
        © {new Date().getFullYear()} {hospitalName}. All rights reserved.
      </div>
    </footer>
  );
}
