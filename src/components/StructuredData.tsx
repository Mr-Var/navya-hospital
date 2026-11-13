import { SITE_URL } from "@/lib/seo";

export function StructuredData({
  hospitalName,
  phone,
  address,
  email,
}: {
  hospitalName: string;
  phone: string;
  address: string;
  email: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: hospitalName,
    alternateName: ["NGCC", "NGCC Can Cure", "Navya Hospital", "Navya Green Hills Hospital"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo-mark.png`,
    image: `${SITE_URL}/logo-mark.png`,
    areaServed: ["Visakhapatnam", "Vizag", "Andhra Pradesh"],
    telephone: phone.split("/")[0]?.trim(),
    email,
    medicalSpecialty: "Oncologic",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Visakhapatnam",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
