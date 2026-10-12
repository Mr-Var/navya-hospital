import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <div className="flex min-h-full flex-col">
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
