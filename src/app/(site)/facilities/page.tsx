import { getPage } from "@/lib/data";
import { TextPage } from "@/components/TextPage";

export default async function FacilitiesPage() {
  const page = await getPage("facilities");
  return <TextPage page={page} fallbackTitle="Our Facilities" />;
}
