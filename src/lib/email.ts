import { Resend } from "resend";

const TYPE_LABELS: Record<string, string> = {
  general: "General / Insurance Callback",
  appointment: "Appointment Request",
  ambulance: "Ambulance Request",
};

export async function notifyNewInquiry(inquiry: {
  type: string;
  name: string;
  phone: string;
  email: string | null;
  department: string | null;
  message: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;

  if (!apiKey || !to) {
    console.log("[email] Skipped — RESEND_API_KEY or NOTIFY_EMAIL not configured. Inquiry saved to /admin/inquiries only.");
    return;
  }

  const resend = new Resend(apiKey);
  const label = TYPE_LABELS[inquiry.type] ?? inquiry.type;
  const isUrgent = inquiry.type === "ambulance";

  try {
    await resend.emails.send({
      from: process.env.NOTIFY_FROM_EMAIL || "Navya Hospital Website <onboarding@resend.dev>",
      to,
      subject: `${isUrgent ? "🚨 URGENT — " : ""}New ${label}: ${inquiry.name}`,
      text: [
        `Type: ${label}`,
        `Name: ${inquiry.name}`,
        `Phone: ${inquiry.phone}`,
        inquiry.email ? `Email: ${inquiry.email}` : null,
        inquiry.department ? `Department: ${inquiry.department}` : null,
        inquiry.message ? `Message: ${inquiry.message}` : null,
        "",
        "View and manage in the admin panel: /admin/inquiries",
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    console.error("[email] Failed to send inquiry notification:", err);
  }
}
