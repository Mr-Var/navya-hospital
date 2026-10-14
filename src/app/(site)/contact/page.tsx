import { getSettings, getDepartments } from "@/lib/data";
import { InquiryForm } from "@/components/InquiryForm";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const [settings, departments, { package: packageName }] = await Promise.all([
    getSettings(),
    getDepartments(),
    searchParams,
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--ink)]">Contact &amp; Appointments</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <dl className="space-y-4 text-[var(--ink-soft)]">
            <div>
              <dt className="text-sm font-semibold text-[var(--ink-soft)]">Address</dt>
              <dd>{settings.address}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[var(--ink-soft)]">Appointments</dt>
              <dd>{settings.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[var(--ink-soft)]">Emergency</dt>
              <dd className="font-semibold text-[var(--crit)]">{settings.emergencyPhone}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[var(--ink-soft)]">Email</dt>
              <dd>{settings.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[var(--ink-soft)]">Hours</dt>
              <dd>{settings.opdHours}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold text-[var(--ink)]">Request an appointment</h2>
          <div className="mt-4">
            <InquiryForm
              type="appointment"
              departments={departments.map((d) => ({ id: d.id, name: d.name }))}
              submitLabel="Request Appointment"
              defaultMessage={packageName ? `Interested in: ${packageName}` : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
