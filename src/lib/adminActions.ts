"use server";

import { prisma } from "./prisma";
import { createAdminSession, destroyAdminSession } from "./auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type FormResult = { ok: true } | { ok: false; error: string };

export async function loginAction(_prev: FormResult | null, formData: FormData): Promise<FormResult> {
  const password = formData.get("password");
  if (password !== process.env.ADMIN_PASSWORD) {
    return { ok: false, error: "Incorrect password" };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

function str(formData: FormData, key: string) {
  return (formData.get(key) as string) ?? "";
}

function int(formData: FormData, key: string, fallback = 0) {
  const v = formData.get(key);
  const n = v ? parseInt(v as string, 10) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

// ---------- Site settings ----------
export async function updateSettingsAction(formData: FormData) {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      hospitalName: str(formData, "hospitalName"),
      heroTitle: str(formData, "heroTitle"),
      heroSubtitle: str(formData, "heroSubtitle"),
      phone: str(formData, "phone"),
      emergencyPhone: str(formData, "emergencyPhone"),
      email: str(formData, "email"),
      address: str(formData, "address"),
      opdHours: str(formData, "opdHours"),
      consultations: str(formData, "consultations"),
      admissions: str(formData, "admissions"),
      bedsCount: str(formData, "bedsCount"),
      livesTouched: str(formData, "livesTouched"),
    },
    create: { id: 1 },
  });
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

// ---------- Departments ----------
export async function saveDepartmentAction(formData: FormData) {
  const id = str(formData, "id");
  const data = {
    name: str(formData, "name"),
    slug: str(formData, "slug"),
    summary: str(formData, "summary"),
    description: str(formData, "description"),
    icon: str(formData, "icon") || "stethoscope",
    waitMinutes: int(formData, "waitMinutes", 15),
    bedsTotal: int(formData, "bedsTotal", 20),
    bedsFree: int(formData, "bedsFree", 8),
    order: int(formData, "order", 0),
    published: bool(formData, "published"),
  };
  if (id) {
    await prisma.department.update({ where: { id }, data });
  } else {
    await prisma.department.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/departments");
}

export async function deleteDepartmentAction(formData: FormData) {
  const id = str(formData, "id");
  await prisma.department.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/departments");
}

// ---------- Doctors ----------
export async function saveDoctorAction(formData: FormData) {
  const id = str(formData, "id");
  const departmentId = str(formData, "departmentId");
  const data = {
    name: str(formData, "name"),
    designation: str(formData, "designation"),
    departmentId: departmentId || null,
    photoUrl: str(formData, "photoUrl") || null,
    experienceYrs: int(formData, "experienceYrs", 0),
    qualifications: str(formData, "qualifications"),
    bio: str(formData, "bio"),
    available: bool(formData, "available"),
    order: int(formData, "order", 0),
    published: bool(formData, "published"),
  };
  if (id) {
    await prisma.doctor.update({ where: { id }, data });
  } else {
    await prisma.doctor.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/doctors");
}

export async function deleteDoctorAction(formData: FormData) {
  const id = str(formData, "id");
  await prisma.doctor.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/doctors");
}

// ---------- Health Packages ----------
export async function savePackageAction(formData: FormData) {
  const id = str(formData, "id");
  const data = {
    name: str(formData, "name"),
    priceRupees: int(formData, "priceRupees", 0),
    description: str(formData, "description"),
    inclusions: str(formData, "inclusions"),
    order: int(formData, "order", 0),
    published: bool(formData, "published"),
  };
  if (id) {
    await prisma.healthPackage.update({ where: { id }, data });
  } else {
    await prisma.healthPackage.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/health-packages");
}

export async function deletePackageAction(formData: FormData) {
  const id = str(formData, "id");
  await prisma.healthPackage.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/health-packages");
}

// ---------- Testimonials ----------
export async function saveTestimonialAction(formData: FormData) {
  const id = str(formData, "id");
  const data = {
    name: str(formData, "name"),
    message: str(formData, "message"),
    rating: int(formData, "rating", 5),
    order: int(formData, "order", 0),
    published: bool(formData, "published"),
  };
  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/testimonials");
}

export async function deleteTestimonialAction(formData: FormData) {
  const id = str(formData, "id");
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/testimonials");
}

// ---------- FAQs ----------
export async function saveFaqAction(formData: FormData) {
  const id = str(formData, "id");
  const data = {
    question: str(formData, "question"),
    answer: str(formData, "answer"),
    order: int(formData, "order", 0),
    published: bool(formData, "published"),
  };
  if (id) {
    await prisma.faq.update({ where: { id }, data });
  } else {
    await prisma.faq.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/faqs");
}

export async function deleteFaqAction(formData: FormData) {
  const id = str(formData, "id");
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/faqs");
}

// ---------- Pages (About / Facilities / Insurance & Billing) ----------
export async function savePageAction(formData: FormData) {
  const slug = str(formData, "slug");
  const data = {
    title: str(formData, "title"),
    body: str(formData, "body"),
  };
  await prisma.page.upsert({ where: { slug }, update: data, create: { slug, ...data } });
  revalidatePath("/", "layout");
  redirect("/admin/pages?saved=1");
}

// ---------- Promotions (ad slider) ----------
export async function savePromotionAction(formData: FormData) {
  const id = str(formData, "id");
  const data = {
    title: str(formData, "title"),
    subtitle: str(formData, "subtitle"),
    imageUrl: str(formData, "imageUrl") || null,
    badge: str(formData, "badge") || null,
    linkUrl: str(formData, "linkUrl") || null,
    linkLabel: str(formData, "linkLabel") || null,
    theme: str(formData, "theme") || "brand",
    order: int(formData, "order", 0),
    published: bool(formData, "published"),
  };
  if (id) {
    await prisma.promotion.update({ where: { id }, data });
  } else {
    await prisma.promotion.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/promotions");
}

export async function deletePromotionAction(formData: FormData) {
  const id = str(formData, "id");
  await prisma.promotion.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/promotions");
}

// ---------- Inquiries ----------
export async function updateInquiryStatusAction(formData: FormData) {
  const id = str(formData, "id");
  const status = str(formData, "status");
  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/inquiries");
}
