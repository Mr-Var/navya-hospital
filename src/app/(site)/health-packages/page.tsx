import { getHealthPackages } from "@/lib/data";
import { PackageCard } from "@/components/cards";

export default async function HealthPackagesPage() {
  const packages = await getHealthPackages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--ink)]">Health Packages</h1>
      <p className="mt-2 text-[var(--ink-soft)]">Bundled preventive screenings at fixed prices.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
