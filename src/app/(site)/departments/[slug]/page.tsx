import { notFound } from "next/navigation";
import { getDepartmentBySlug } from "@/lib/data";
import { DoctorCard } from "@/components/cards";
import { InquiryForm } from "@/components/InquiryForm";

export default async function DepartmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);

  if (!department || !department.published) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--ink)]">{department.name}</h1>
      <p className="mt-2 text-[var(--ink-soft)]">{department.description}</p>
      <p className="mt-3 text-sm font-medium text-[var(--brand)]">
        Current wait ~{department.waitMinutes} min · {department.bedsFree}/{department.bedsTotal} beds free
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ink)]">Doctors in this department</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {department.doctors.length === 0 && (
              <p className="text-sm text-[var(--ink-soft)]">No doctors listed yet.</p>
            )}
            {department.doctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={{ ...doc, department }} />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold text-[var(--ink)]">Book an appointment</h2>
          <div className="mt-4">
            <InquiryForm type="appointment" submitLabel="Request Appointment" />
          </div>
        </div>
      </div>
    </div>
  );
}
