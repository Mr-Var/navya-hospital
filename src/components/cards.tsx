import Link from "next/link";
import type { Department, Doctor, HealthPackage, Testimonial } from "@prisma/client";
import { DeptIcon } from "./DeptIcon";

export function DepartmentCard({ department }: { department: Department }) {
  const occupancy = Math.round(((department.bedsTotal - department.bedsFree) / Math.max(department.bedsTotal, 1)) * 100);

  return (
    <Link
      href={`/departments/${department.slug}`}
      className="group block rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(51,23,44,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[0_12px_24px_rgba(51,23,44,0.1)]"
    >
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl text-[var(--brand)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
        <div
          className="absolute inset-0 opacity-100 transition-opacity duration-200 group-hover:opacity-0"
          style={{ background: "linear-gradient(145deg, var(--brand-soft), var(--surface-tint))" }}
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background: "linear-gradient(145deg, var(--brand), #1f0e1b)" }}
        />
        <DeptIcon name={department.icon} className="relative h-6 w-6 text-[var(--brand)] transition-colors duration-200 group-hover:text-white" />
      </div>
      <p className="mt-4 font-semibold text-[var(--ink)]">{department.name}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">{department.summary}</p>
      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[var(--ink-soft)]">
        <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: occupancy > 80 ? "var(--crit)" : occupancy > 50 ? "var(--warn)" : "var(--good)" }} />
        ~{department.waitMinutes} min wait · {department.bedsFree}/{department.bedsTotal} beds free
      </div>
    </Link>
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor & { department?: Department | null } }) {
  return (
    <Link
      href={`/doctors/${doctor.id}`}
      className="group block rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(51,23,44,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[0_12px_24px_rgba(51,23,44,0.1)]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] font-display font-semibold text-[var(--brand)]">
          {doctor.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-[var(--ink)] group-hover:text-[var(--brand)]">{doctor.name}</p>
          <p className="text-xs text-[var(--ink-soft)]">{doctor.designation}</p>
        </div>
        <span
          className={`ml-auto rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            doctor.available ? "bg-[var(--good-bg)] text-[var(--good)]" : "bg-[var(--surface-tint)] text-[var(--ink-soft)]"
          }`}
        >
          {doctor.available ? "Available" : "Unavailable"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{doctor.bio}</p>
      <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs text-[var(--ink-soft)]">
        <span>{doctor.department?.name ?? "General"}</span>
        <span>{doctor.experienceYrs}+ yrs experience</span>
      </div>
      <p className="mt-3 text-xs font-semibold text-[var(--brand)]">View profile &amp; book →</p>
    </Link>
  );
}

export function PackageCard({ pkg }: { pkg: HealthPackage }) {
  return (
    <div className="flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(51,23,44,0.04)] transition-shadow hover:shadow-[0_12px_24px_rgba(51,23,44,0.08)]">
      <p className="font-semibold text-[var(--ink)]">{pkg.name}</p>
      <p className="mt-2 font-display text-3xl font-bold text-[var(--brand)]">
        ₹{pkg.priceRupees.toLocaleString("en-IN")}
      </p>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">{pkg.description}</p>
      <p className="mt-4 border-t border-[var(--line)] pt-3 text-xs leading-relaxed text-[var(--ink-soft)]">{pkg.inclusions}</p>
      <Link
        href={`/contact?package=${encodeURIComponent(pkg.name)}`}
        className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--brand)] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
      >
        Book this package →
      </Link>
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(51,23,44,0.04)]">
      <svg viewBox="0 0 32 32" className="absolute -right-1 -top-2 h-16 w-16 text-[var(--brand-soft)]" fill="currentColor">
        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
      </svg>
      <p className="relative text-[var(--warn)]">{"★".repeat(testimonial.rating)}</p>
      <p className="relative mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{testimonial.message}</p>
      <p className="relative mt-4 text-sm font-semibold text-[var(--ink)]">{testimonial.name}</p>
    </div>
  );
}
