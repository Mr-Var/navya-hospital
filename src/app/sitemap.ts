import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL, doctorPath } from "@/lib/seo";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/doctors", priority: 0.9 },
  { path: "/departments", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/health-packages", priority: 0.7 },
  { path: "/emergency", priority: 0.7 },
  { path: "/facilities", priority: 0.6 },
  { path: "/insurance-billing", priority: 0.6 },
  { path: "/live-status", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [departments, doctors] = await Promise.all([
    prisma.department.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.doctor.findMany({
      where: { published: true },
      select: { name: true, updatedAt: true },
    }),
  ]);

  const staticEntries = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority,
  }));

  const departmentEntries = departments.map((d) => ({
    url: `${SITE_URL}/departments/${d.slug}`,
    lastModified: d.updatedAt,
    priority: 0.8,
  }));

  const doctorEntries = doctors.map((d) => ({
    url: `${SITE_URL}${doctorPath(d)}`,
    lastModified: d.updatedAt,
    priority: 0.8,
  }));

  return [...staticEntries, ...departmentEntries, ...doctorEntries];
}
