import Link from "next/link";
import { getSettings, getDepartments, getTestimonials, getFaqs, getPromotions } from "@/lib/data";
import { StatsBar } from "@/components/StatsBar";
import { DepartmentCard, TestimonialCard } from "@/components/cards";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PromoSlider } from "@/components/PromoSlider";
import { Reveal } from "@/components/Reveal";

export default async function HomePage() {
  const [settings, departments, testimonials, faqs, promotions] = await Promise.all([
    getSettings(),
    getDepartments(),
    getTestimonials(),
    getFaqs(),
    getPromotions(),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--brand-soft)] to-[var(--surface)] px-4 pb-10 pt-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--brand) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 70% 60% at 30% 20%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 30% 20%, black 0%, transparent 70%)",
          }}
        />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-float-slow rounded-full bg-[var(--accent-soft)] opacity-60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-[var(--brand)] shadow-sm ring-1 ring-[var(--brand-soft)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--good)]" />
                24/7 Emergency &amp; Outpatient Care
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-[var(--ink)] sm:text-5xl">
                {settings.heroTitle}
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-[var(--ink-soft)]">{settings.heroSubtitle}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/doctors"
                  className="rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(82,37,70,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-6px_rgba(82,37,70,0.55)]"
                >
                  Find a Doctor
                </Link>
                <Link
                  href="/live-status"
                  className="rounded-full border border-[var(--brand)]/30 bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--brand)] transition hover:border-[var(--brand)] hover:bg-[var(--brand-soft)]"
                >
                  Check Wait Times
                </Link>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative rounded-2xl border border-[var(--brand-soft)] bg-[var(--surface)] p-6 shadow-[0_20px_45px_-15px_rgba(51,23,44,0.25)]">
                <div className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--crit)] text-white shadow-[0_6px_16px_rgba(192,57,43,0.4)]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                </div>
                <p className="text-sm font-semibold text-[var(--ink-soft)]">24/7 Emergency</p>
                <p className="mt-1 font-display text-3xl font-bold text-[var(--crit)]">{settings.emergencyPhone}</p>
                <div className="my-4 h-px bg-[var(--line)]" />
                <p className="text-sm font-semibold text-[var(--ink-soft)]">Appointments</p>
                <p className="mt-1 text-xl font-bold text-[var(--ink)]">{settings.phone}</p>
                <p className="mt-4 text-sm text-[var(--ink-soft)]">{settings.opdHours}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {promotions.length > 0 && (
        <section className="px-4 py-2">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <PromoSlider promotions={promotions} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <StatsBar
              stats={{
                consultations: settings.consultations,
                admissions: settings.admissions,
                bedsCount: settings.bedsCount,
                livesTouched: settings.livesTouched,
              }}
            />
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">Our Departments</h2>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">Same-day visits available across the week.</p>
              </div>
              <Link href="/departments" className="text-sm font-semibold text-[var(--brand)] hover:underline">
                View all →
              </Link>
            </div>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.slice(0, 6).map((d, i) => (
              <Reveal key={d.id} delay={(i % 3) * 100}>
                <DepartmentCard department={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-[var(--surface-tint)] px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">What Patients Say</h2>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={(i % 3) * 100}>
                  <TestimonialCard testimonial={t} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">Frequently Asked Questions</h2>
              <div className="mt-6">
                <FaqAccordion faqs={faqs} />
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}
