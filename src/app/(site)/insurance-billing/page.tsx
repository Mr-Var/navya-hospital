import { getPage } from "@/lib/data";
import { InquiryForm } from "@/components/InquiryForm";

export default async function InsuranceBillingPage() {
  const page = await getPage("insurance-billing");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-3xl font-bold text-[var(--ink)]">{page?.title ?? "Insurance & Billing"}</h1>
          <div className="mt-6 space-y-4 text-[var(--ink-soft)]">
            {(page?.body ?? "").split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="font-semibold text-[var(--ink)]">Request a coverage callback</h2>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Our insurance desk will verify your coverage and call you back.
          </p>
          <div className="mt-4">
            <InquiryForm type="general" submitLabel="Request Callback" />
          </div>
        </div>
      </div>
    </div>
  );
}
