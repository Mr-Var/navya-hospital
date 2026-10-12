import { CountUp } from "./CountUp";

const ITEMS = [
  { key: "consultations", label: "Consultations" },
  { key: "admissions", label: "Admissions" },
  { key: "bedsCount", label: "Hospital Beds" },
  { key: "livesTouched", label: "Lives Touched" },
] as const;

export function StatsBar({ stats }: { stats: Record<string, string> }) {
  return (
    <div
      className="relative grid grid-cols-2 gap-6 overflow-hidden rounded-2xl px-6 py-10 text-white shadow-[0_20px_45px_-20px_rgba(51,23,44,0.5)] sm:grid-cols-4 sm:px-10"
      style={{ background: "radial-gradient(130% 160% at 0% 0%, #7a3d68 0%, var(--brand) 45%, #1f0e1b 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "16px 16px" }}
      />
      {ITEMS.map((item, i) => (
        <div
          key={item.key}
          className={`relative text-center ${i > 0 ? "border-l border-white/10" : ""}`}
        >
          <p className="font-display text-3xl font-bold sm:text-4xl">
            <CountUp value={stats[item.key]} />
          </p>
          <p className="mt-1.5 text-xs uppercase tracking-[0.08em] text-white/65 sm:text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
