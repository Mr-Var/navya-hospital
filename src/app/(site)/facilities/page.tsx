import type { Metadata } from "next";
import { getPage } from "@/lib/data";
import { TextPage } from "@/components/TextPage";

export const metadata: Metadata = {
  title: "Facilities — Cancer Care Infrastructure in Vizag",
  description: "Treatment, inpatient and patient-support facilities at Navya Global Cancer Centre, Visakhapatnam (Vizag).",
  alternates: { canonical: "/facilities" },
};

export default async function FacilitiesPage() {
  const page = await getPage("facilities");
  return <TextPage page={page} fallbackTitle="Our Facilities" />;
}
