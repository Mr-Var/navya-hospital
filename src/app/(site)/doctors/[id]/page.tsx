import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getDoctorById, getDoctorBySlug, getDepartments } from "@/lib/data";
import { doctorPath } from "@/lib/seo";
import { InquiryForm } from "@/components/InquiryForm";

// The URL segment is the doctor's name slug (e.g. /doctors/dr-navya-reddy).
// Old links that used the database id still work: they redirect to the slug URL.
async function resolveDoctor(param: string) {
  const bySlug = await getDoctorBySlug(param);
  if (bySlug) return { doctor: bySlug, isLegacyId: false };
  const byId = await getDoctorById(param);
  if (byId && byId.published) return { doctor: byId, isLegacyId: true };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const found = await resolveDoctor(id);
  if (!found) return {};
  const { doctor } = found;
  return {
    title: `${doctor.name} — ${doctor.designation} in Visakhapatnam (Vizag)`,
    description: `${doctor.name}, ${doctor.designation} (${doctor.qualifications}) at Navya Global Cancer Centre, Visakhapatnam. ${doctor.experienceYrs}+ years of experience. Book an appointment online.`,
    alternates: { canonical: doctorPath(doctor) },
  };
}

export default async function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [found, departments] = await Promise.all([resolveDoctor(id), getDepartments()]);

  if (!found) notFound();
  if (found.isLegacyId) permanentRedirect(doctorPath(found.doctor));
  const { doctor } = found;

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
