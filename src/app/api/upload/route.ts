import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

// Vercel's serverless filesystem is read-only at runtime, so uploads can't be
// written to disk (that only works in local dev). Instead we encode the image
// as a base64 data URI and store it directly on the record — no extra storage
// service to set up. Fine for occasional admin-uploaded images; if this site
// ever needs heavy photo galleries, switch to Vercel Blob storage instead.
const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WEBP, or GIF images are allowed" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be smaller than 2MB" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

  return NextResponse.json({ url: dataUrl });
}
