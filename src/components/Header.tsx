"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/departments", label: "Departments" },
  { href: "/doctors", label: "Doctors" },
  { href: "/health-packages", label: "Health Packages" },
  { href: "/live-status", label: "Live Status" },
  { href: "/facilities", label: "Facilities" },
  { href: "/insurance-billing", label: "Insurance & Billing" },
  { href: "/contact", label: "Contact" },
];

const navLinkClass =
  "relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[var(--brand)] after:transition-all after:duration-300 hover:text-[var(--brand)] hover:after:w-full";

export function Header({ hospitalName, emergencyPhone }: { hospitalName: string; emergencyPhone: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-[var(--surface)]/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-[var(--line)] shadow-[0_8px_24px_-16px_rgba(51,23,44,0.35)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_4px_10px_-2px_rgba(82,37,70,0.5)]"
            style={{ background: "linear-gradient(150deg, var(--brand), #2a1424)" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-[var(--ink)]">
            {hospitalName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--ink-soft)] lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/emergency"
            className="hidden items-center gap-1.5 rounded-full border border-[var(--crit)]/30 bg-[var(--crit-bg)] px-3 py-2 text-sm font-semibold text-[var(--crit)] transition hover:border-[var(--crit)] sm:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--crit)]" />
            Emergency {emergencyPhone}
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_16px_-4px_rgba(82,37,70,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(82,37,70,0.55)]"
          >
            Book Appointment
          </Link>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto border-t border-[var(--line)] px-4 py-2 text-xs font-medium text-[var(--ink-soft)] lg:hidden">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-[var(--brand)]">
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
