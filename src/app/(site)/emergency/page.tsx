import { getSettings } from "@/lib/data";
import { InquiryForm } from "@/components/InquiryForm";

export default async function EmergencyPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="rounded-xl bg-[var(--crit-bg)] p-6">
        <h1 className="text-3xl font-bold text-[var(--crit)]">Emergency</h1>
        <p className="mt-2 text-[var(--crit)]">
          In a life-threatening emergency, call <span className="font-bold">{settings.emergencyPhone}</span> immediately — it&apos;s toll-free and available 24/7.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="text-[var(--ink-soft)]">
          <h2 className="text-xl font-semibold text-[var(--ink)]">Oncology emergencies</h2>
          <p className="mt-3">
            Fever during chemotherapy, severe treatment side effects, or uncontrolled pain are emergencies —
            call us immediately. Our on-call oncology team is reachable around the clock for patients under
            active treatment.
          </p>
          <p className="mt-3">
            For critical emergencies, always call {settings.emergencyPhone} rather than using this form —
            it connects you to dispatch immediately. Use the form only for non-critical ambulance pickups.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold text-[var(--ink)]">Request a non-critical ambulance pickup</h2>
          <div className="mt-4">
            <InquiryForm type="ambulance" submitLabel="Request Ambulance" />
          </div>
        </div>
      </div>
    </div>
  );
}
