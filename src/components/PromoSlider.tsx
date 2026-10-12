"use client";

import { useEffect, useRef, useState } from "react";
import type { Promotion } from "@prisma/client";

export function PromoSlider({ promotions }: { promotions: Promotion[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = promotions.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (count <= 1 || paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count, paused]);

  if (count === 0) return null;

  const goTo = (i: number) => setIndex((i + count) % count);

  return (
    <div
      className="relative overflow-hidden rounded-2xl ring-1 ring-[var(--line)] shadow-[0_20px_50px_-20px_rgba(51,23,44,0.35)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {promotions.map((promo) => (
          <Slide key={promo.id} promo={promo} />
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            ›
          </button>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {promotions.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Slide({ promo }: { promo: Promotion }) {
  const isAccent = promo.theme === "accent";

  return (
    <div
      className="relative flex min-w-full flex-col justify-center gap-3 overflow-hidden px-8 py-12 sm:px-14 sm:py-16"
      style={{
        background: isAccent
          ? "radial-gradient(120% 140% at 15% 15%, #ffb469 0%, var(--accent) 45%, #a85a1f 100%)"
          : "radial-gradient(120% 140% at 15% 15%, #7a3d68 0%, var(--brand) 45%, #1f0e1b 100%)",
        backgroundImage: promo.imageUrl
          ? `linear-gradient(90deg, rgba(20,10,18,0.72), rgba(20,10,18,0.3)), url(${promo.imageUrl})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "280px",
      }}
    >
      {/* decorative texture: soft dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* decorative glow blobs to balance the empty space and add depth */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <DecorativeMark className="pointer-events-none absolute -right-6 bottom-0 h-56 w-56 text-white/10 sm:h-72 sm:w-72" />

      <div className="relative max-w-lg">
        {promo.badge && (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {promo.badge}
          </span>
        )}
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-[2.1rem]">
          {promo.title}
        </h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/80 sm:text-base">{promo.subtitle}</p>
        {promo.linkUrl && (
          <a
            href={promo.linkUrl}
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--ink)] shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
          >
            {promo.linkLabel ?? "Learn more"}
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </div>
  );
}

function DecorativeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" />
      <path d="M100 55v90M55 100h90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
