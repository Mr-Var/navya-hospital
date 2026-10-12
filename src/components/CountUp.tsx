"use client";

import { useEffect, useRef, useState } from "react";

// Animates the numeric portion of a string like "3,20,000+" or "450+" from 0 to its
// target value when it scrolls into view, preserving the original formatting/suffix.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => zeroed(value));
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }

    const reduceMotion =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          if (reduceMotion) {
            setDisplay(value);
          } else {
            animate(value, setDisplay);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

function zeroed(value: string) {
  return value.replace(/\d/g, "0");
}

function animate(target: string, setDisplay: (s: string) => void) {
  const digits = target.match(/\d/g);
  if (!digits) {
    setDisplay(target);
    return;
  }
  const targetNumber = parseInt(digits.join(""), 10);
  const duration = 1200;
  const start = performance.now();

  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(targetNumber * eased);
    setDisplay(formatLike(target, current));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Re-inserts the animated number's digits back into the target string's
// original separators/suffix (e.g. "3,20,000+" with grouping preserved).
function formatLike(target: string, current: number) {
  const digitCount = (target.match(/\d/g) ?? []).length;
  const digits = String(current).padStart(digitCount, "0");
  let i = 0;
  return target.replace(/\d/g, () => digits[i++]);
}
