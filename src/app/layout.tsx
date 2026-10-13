import type { Metadata } from "next";
import { Lora, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { getSettings } from "@/lib/data";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ngcc-cancure.com";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = `${settings.hospitalName} — Cancer Hospital in Visakhapatnam`;
  const description = settings.heroSubtitle;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${settings.hospitalName}`,
    },
    description,
    keywords: [
      settings.hospitalName,
      "NGCC",
      "cancer hospital Visakhapatnam",
      "oncologist Visakhapatnam",
      "Navya Green Hills Hospital",
      "chemotherapy Visakhapatnam",
    ],
    openGraph: {
      title,
      description,
      siteName: settings.hospitalName,
      url: SITE_URL,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${publicSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
