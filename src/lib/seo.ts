export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ngcc-cancure.com").replace(/\/$/, "");

/** "Dr. K. Navya Reddy" -> "dr-k-navya-reddy" */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function doctorPath(doctor: { name: string }) {
  return `/doctors/${slugify(doctor.name)}`;
}
