"use server";

import { z } from "zod";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { notifyNewInquiry } from "./email";

const inquirySchema = z.object({
  type: z.enum(["general", "appointment", "ambulance"]),
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  department: z.string().optional(),
  message: z.string().optional(),
});

export type InquiryActionResult = { ok: true } | { ok: false; error: string };

export async function submitInquiry(
  _prev: InquiryActionResult | null,
  formData: FormData
): Promise<InquiryActionResult> {
  const parsed = inquirySchema.safeParse({
    type: formData.get("type"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") || undefined,
    department: formData.get("department") || undefined,
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }

  const inquiry = await prisma.inquiry.create({ data: parsed.data });
  revalidatePath("/admin/inquiries");

  await notifyNewInquiry(inquiry);

  return { ok: true };
}
