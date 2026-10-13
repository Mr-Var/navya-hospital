import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <div className="flex min-h-full flex-col">
      <StructuredData
        hospitalName={settings.hospitalName}
        phone={settings.phone}
        address={settings.address}
        email={settings.email}
      />
      <Header hospitalName={settings.hospitalName} emergencyPhone={settings.emergencyPhone} />
      <main className="flex-1">{children}</main>
      <Footer
        hospitalName={settings.hospitalName}
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        opdHours={settings.opdHours}
      />
    </div>
  );
}
