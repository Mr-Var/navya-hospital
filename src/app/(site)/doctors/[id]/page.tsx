import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoctorById, getDepartments } from "@/lib/data";
import { InquiryForm } from "@/components/InquiryForm";

export default async function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [doctor, departments] = await Promise.all([getDoctorById(id), getDepartments()]);

  if (!doctor || !doctor.published) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex items-start gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] font-display text-3xl font-semibold text-[var(--brand)]">
          {doctor.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--ink)]">{doctor.name}</h1>
          <p className="mt-1 text-[var(--ink-soft)]">{doctor.designation}</p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">{doctor.qualifications}</p>
          {doctor.department && (
            <Link
              href={`/departments/${doctor.department.slug}`}
              className="mt-2 inline-block text-sm font-semibold text-[var(--brand)] hover:underline"
            >
              {doctor.department.name} →
            </Link>
          )}
        </div>
        <span
          className={`ml-auto shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
            doctor.available ? "bg-[var(--good-bg)] text-[var(--good)]" : "bg-[var(--surface-tint)] text-[var(--ink-soft)]"
          }`}
        >
          {doctor.available ? "Available now" : "Not available today"}
        </span>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ink)]">About</h2>
          <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">{doctor.bio}</p>
          <p className="mt-4 text-sm text-[var(--ink-soft)]">{doctor.experienceYrs}+ years of experience</p>
        </div>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold text-[var(--ink)]">Book an appointment</h2>
          <div className="mt-4">
            <InquiryForm
              type="appointment"
              departments={departments.map((d) => ({ id: d.id, name: d.name }))}
              submitLabel="Request Appointment"
              defaultMessage={`Requesting an appointment with ${doctor.name}`}
              defaultDepartment={doctor.department?.name ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
