import { getSettings } from "@/lib/data";
import { updateSettingsAction } from "@/lib/adminActions";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, { saved }] = await Promise.all([getSettings(), searchParams]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[var(--ink)]">Site Settings</h1>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">Global text and numbers shown across the site.</p>
      {saved && <p className="mt-3 rounded-md bg-[var(--good-bg)] px-3 py-2 text-sm text-[var(--good)]">Saved.</p>}

      <form action={updateSettingsAction} className="mt-6 space-y-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
        <Field label="Hospital name">
          <input name="hospitalName" defaultValue={settings.hospitalName} required className={inputClass} />
        </Field>

        <Field label="Home page headline">
          <input name="heroTitle" defaultValue={settings.heroTitle} required className={inputClass} />
        </Field>

        <Field label="Home page subheadline">
          <textarea name="heroSubtitle" defaultValue={settings.heroSubtitle} rows={2} required className={inputClass} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Appointments phone">
            <input name="phone" defaultValue={settings.phone} required className={inputClass} />
          </Field>
          <Field label="Emergency phone">
            <input name="emergencyPhone" defaultValue={settings.emergencyPhone} required className={inputClass} />
          </Field>
        </div>

        <Field label="Email">
          <input name="email" defaultValue={settings.email} required className={inputClass} />
        </Field>

        <Field label="Address">
          <input name="address" defaultValue={settings.address} required className={inputClass} />
        </Field>

        <Field label="OPD / opening hours text">
          <input name="opdHours" defaultValue={settings.opdHours} required className={inputClass} />
        </Field>

        <p className="pt-2 text-sm font-semibold text-[var(--ink)]">Home page statistics</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Consultations">
            <input name="consultations" defaultValue={settings.consultations} className={inputClass} />
          </Field>
          <Field label="Admissions">
            <input name="admissions" defaultValue={settings.admissions} className={inputClass} />
          </Field>
          <Field label="Beds count">
            <input name="bedsCount" defaultValue={settings.bedsCount} className={inputClass} />
          </Field>
          <Field label="Lives touched">
            <input name="livesTouched" defaultValue={settings.livesTouched} className={inputClass} />
          </Field>
        </div>

        <button type="submit" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          Save
        </button>
      </form>
    </div>
  );
}

const inputClass = "mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--ink)]">{label}</label>
      {children}
    </div>
  );
}
