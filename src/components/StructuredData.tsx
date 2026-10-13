const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ngcc-cancure.com";

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
    url: SITE_URL,
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
