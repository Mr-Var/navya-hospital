const PATHS: Record<string, string> = {
  heart: "M12 21s-7.2-4.5-9.6-9A5.4 5.4 0 0112 5.3 5.4 5.4 0 0121.6 12c-2.4 4.5-9.6 9-9.6 9z",
  brain:
    "M9.5 3a3 3 0 00-3 3v.3A3.2 3.2 0 004 9.3V11a3 3 0 001 2.2V15a3 3 0 003 3h.5a2.5 2.5 0 002.5-2.5V6A3 3 0 009.5 3zM14.5 3a3 3 0 013 3v.3A3.2 3.2 0 0120 9.3V11a3 3 0 01-1 2.2V15a3 3 0 01-3 3h-.5a2.5 2.5 0 01-2.5-2.5V6a3 3 0 013-3z",
  bone: "M7 7a2.5 2.5 0 10-3.9 2.9l6 6a2.5 2.5 0 103.9 3.9 2.5 2.5 0 103.9-3.9l6-6A2.5 2.5 0 1019 7a2.5 2.5 0 10-3.9-2.9L9 10.1A2.5 2.5 0 007 7z",
  baby: "M12 3a3 3 0 100 6 3 3 0 000-6zM6 14a6 6 0 1112 0v2a5 5 0 01-5 5h-2a5 5 0 01-5-5v-2z",
  stomach:
    "M8 4c0 2.5-3 3.5-3 7.5A7 7 0 0012 19a7 7 0 007-7.5c0-2.5-1.5-4-2.5-5.5M8 4a2 2 0 012-2M16 6a2 2 0 00-2-2",
  stethoscope:
    "M5 3v6a4 4 0 008 0V3M9 13v2a5 5 0 0010 0v-1.5M19 11.5a2.5 2.5 0 10-2.5-2.5",
  lungs:
    "M12 3v8M12 11c0-2-2-3-4-3-2.5 0-3.5 2-3.5 5 0 3 1.5 6 3.5 6 1.5 0 2-1 2-3v-3M12 11c0-2 2-3 4-3 2.5 0 3.5 2 3.5 5 0 3-1.5 6-3.5 6-1.5 0-2-1-2-3v-3",
  syringe:
    "M20 4l-2.5 2.5M9 15l-5 5M9 15L5.5 11.5M9 15l6-6M15 9l2.5-2.5M15 9l-3.5-3.5M18.5 5.5l-3-3M11.5 12.5l-2-2",
  radiation:
    "M12 12m-2.5 0a2.5 2.5 0 105 0 2.5 2.5 0 10-5 0M12 3v5.2M19.8 16.5l-4.5-2.6M4.2 16.5l4.5-2.6",
  female:
    "M12 3a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM12 12v8M8.5 17h7",
  drop: "M12 3c3 4 6 7.6 6 11a6 6 0 11-12 0c0-3.4 3-7 6-11z",
  microscope:
    "M9 20h8M12 20v-4M7 16h8l1-3H8.5a3.5 3.5 0 113.3-4.6M13 9l4-4 2 2-4 4M6 12l2 2",
  scalpel: "M4 20L15 9l3-3 2 2-3 3L6 22zM15 9l-2-2",
};

export function DeptIcon({ name, className }: { name: string; className?: string }) {
  const path = PATHS[name] ?? PATHS.stethoscope;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>
  );
}
