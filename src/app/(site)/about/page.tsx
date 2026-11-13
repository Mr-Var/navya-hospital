import type { Metadata } from "next";
import { getPage, getSettings } from "@/lib/data";
import { StatsBar } from "@/components/StatsBar";

export const metadata: Metadata = {
  title: "About Us — Cancer Hospital in Visakhapatnam (Vizag)",
  description: "Learn about Navya Global Cancer Centre (NGCC), a unit of Navya Green Hills Hospital, providing comprehensive cancer treatment in Visakhapatnam (Vizag), Andhra Pradesh.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [page, settings] = await Promise.all([getPage("about"), getSettings()]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--ink)]">{page?.title ?? "About Us"}</h1>
      <div className="mt-6 space-y-4 text-[var(--ink-soft)]">
        {(page?.body ?? "").split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className="mt-10">
        <StatsBar
          stats={{
            consultations: settings.consultations,
            admissions: settings.admissions,
            bedsCount: settings.bedsCount,
            livesTouched: settings.livesTouched,
          }}
        />
      </div>
    </div>
  );
}
