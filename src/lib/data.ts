import { prisma } from "./prisma";

export async function getSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (settings) return settings;
  return prisma.siteSettings.create({ data: { id: 1 } });
}

export function getDepartments(onlyPublished = true) {
  return prisma.department.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: { order: "asc" },
  });
}

export function getDepartmentBySlug(slug: string) {
  return prisma.department.findUnique({
    where: { slug },
    include: { doctors: { where: { published: true }, orderBy: { order: "asc" } } },
  });
}

export function getDoctors(onlyPublished = true) {
  return prisma.doctor.findMany({
    where: onlyPublished ? { published: true } : undefined,
    include: { department: true },
    orderBy: { order: "asc" },
  });
}

export function getHealthPackages(onlyPublished = true) {
  return prisma.healthPackage.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: { order: "asc" },
  });
}

export function getTestimonials(onlyPublished = true) {
  return prisma.testimonial.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: { order: "asc" },
  });
}

export function getFaqs(onlyPublished = true) {
  return prisma.faq.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: { order: "asc" },
  });
}

export function getPage(slug: string) {
  return prisma.page.findUnique({ where: { slug } });
}

export function getPromotions(onlyPublished = true) {
  return prisma.promotion.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: { order: "asc" },
  });
}
