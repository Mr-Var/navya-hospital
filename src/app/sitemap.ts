import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ngcc-cancure.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/departments",
  "/doctors",
  "/health-packages",
  "/live-status",
  "/facilities",
  "/insurance-billing",
  "/contact",
  "/emergency",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const departments = await prisma.department.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const departmentEntries = departments.map((d) => ({
    url: `${SITE_URL}/departments/${d.slug}`,
    lastModified: d.updatedAt,
  }));

  return [...staticEntries, ...departmentEntries];
}
