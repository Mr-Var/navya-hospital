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
};

export function DeptIcon({ name, className }: { name: string; className?: string }) {
  const path = PATHS[name] ?? PATHS.stethoscope;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>
  );
}
