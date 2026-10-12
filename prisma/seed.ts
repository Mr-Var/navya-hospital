import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Only seed an empty database so admin CMS edits survive redeploys.
  if ((await prisma.siteSettings.count()) > 0) {
    console.log("Database already seeded, skipping.");
    return;
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      hospitalName: "Navya Hospital",
      heroTitle: "Care that keeps watch, day and night",
      heroSubtitle:
        "A multispecialty hospital serving Visakhapatnam with 24/7 emergency and outpatient care, same-day specialist visits, and real-time bed availability.",
      phone: "040 2555 2555",
      emergencyPhone: "108",
      email: "care@navyahospital.com",
      address: "14 Beach Road, Visakhapatnam, Andhra Pradesh",
      opdHours: "OPD 9:00 AM - 5:00 PM daily · Emergency open 24/7",
      consultations: "3,20,000+",
      admissions: "85,000+",
      bedsCount: "450+",
      livesTouched: "12,50,000+",
    },
  });

  const departments = [
    {
      name: "Cardiology",
      slug: "cardiology",
      summary: "Heart health, angioplasty, and rhythm disorder management.",
      description:
        "Our cardiology team manages everything from routine heart checks to complex angioplasty and rhythm disorders, backed by a 24/7 cath lab.",
      icon: "heart",
      waitMinutes: 20,
      bedsTotal: 30,
      bedsFree: 9,
      order: 1,
    },
    {
      name: "Neurology",
      slug: "neurology",
      summary: "Stroke care, epilepsy management, and neuro-rehabilitation.",
      description:
        "A dedicated stroke unit and neuro-rehabilitation program supported by on-call neurologists and advanced imaging.",
      icon: "brain",
      waitMinutes: 25,
      bedsTotal: 20,
      bedsFree: 6,
      order: 2,
    },
    {
      name: "Orthopaedics",
      slug: "orthopaedics",
      summary: "Joint replacement, sports injuries, and trauma care.",
      description:
        "From sports injuries to joint replacements, our orthopaedic surgeons offer same-day consultations and a dedicated physiotherapy wing.",
      icon: "bone",
      waitMinutes: 15,
      bedsTotal: 25,
      bedsFree: 11,
      order: 3,
    },
    {
      name: "Gynaecology & Obstetrics",
      slug: "gynaecology-obstetrics",
      summary: "Maternity care, high-risk pregnancy, and women's health.",
      description:
        "Comprehensive maternity services including high-risk pregnancy monitoring, a newborn ICU, and women's wellness clinics.",
      icon: "baby",
      waitMinutes: 18,
      bedsTotal: 35,
      bedsFree: 14,
      order: 4,
    },
    {
      name: "Gastroenterology",
      slug: "gastroenterology",
      summary: "Endoscopy, liver care, and digestive health.",
      description:
        "Diagnostic and therapeutic endoscopy, liver disease management, and nutrition counselling under one roof.",
      icon: "stomach",
      waitMinutes: 22,
      bedsTotal: 15,
      bedsFree: 5,
      order: 5,
    },
    {
      name: "General & Internal Medicine",
      slug: "general-medicine",
      summary: "Everyday illness, chronic disease management, and checkups.",
      description:
        "Our internal medicine physicians handle everything from fevers and infections to long-term diabetes and hypertension care.",
      icon: "stethoscope",
      waitMinutes: 12,
      bedsTotal: 40,
      bedsFree: 17,
      order: 6,
    },
    {
      name: "Pulmonology",
      slug: "pulmonology",
      summary: "Asthma, COPD, and respiratory critical care.",
      description:
        "Respiratory specialists treat asthma, COPD, and sleep disorders, with a dedicated respiratory ICU for critical cases.",
      icon: "lungs",
      waitMinutes: 20,
      bedsTotal: 18,
      bedsFree: 7,
      order: 7,
    },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { slug: dept.slug },
      update: dept,
      create: dept,
    });
  }

  const cardiology = await prisma.department.findUnique({ where: { slug: "cardiology" } });
  const neurology = await prisma.department.findUnique({ where: { slug: "neurology" } });
  const ortho = await prisma.department.findUnique({ where: { slug: "orthopaedics" } });
  const gynae = await prisma.department.findUnique({ where: { slug: "gynaecology-obstetrics" } });
  const gastro = await prisma.department.findUnique({ where: { slug: "gastroenterology" } });
  const medicine = await prisma.department.findUnique({ where: { slug: "general-medicine" } });

  const doctors = [
    {
      name: "Dr. Lakshmi Prasanna",
      designation: "Senior Consultant Cardiologist",
      departmentId: cardiology?.id,
      experienceYrs: 18,
      qualifications: "MD, DM Cardiology",
      bio: "Specialises in interventional cardiology and preventive heart care.",
      available: true,
      order: 1,
    },
    {
      name: "Dr. Srinivas Rao",
      designation: "Consultant Neurologist",
      departmentId: neurology?.id,
      experienceYrs: 14,
      qualifications: "MD, DM Neurology",
      bio: "Focuses on stroke management and epilepsy care.",
      available: true,
      order: 2,
    },
    {
      name: "Dr. Kavitha Reddy",
      designation: "Senior Orthopaedic Surgeon",
      departmentId: ortho?.id,
      experienceYrs: 16,
      qualifications: "MS Orthopaedics",
      bio: "Expert in joint replacement and sports injury surgery.",
      available: false,
      order: 3,
    },
    {
      name: "Dr. Anjali Varma",
      designation: "Senior Consultant Obstetrician",
      departmentId: gynae?.id,
      experienceYrs: 20,
      qualifications: "MD, DGO",
      bio: "Manages high-risk pregnancies and women's wellness programs.",
      available: true,
      order: 4,
    },
    {
      name: "Dr. Praveen Kumar",
      designation: "Consultant Gastroenterologist",
      departmentId: gastro?.id,
      experienceYrs: 11,
      qualifications: "MD, DM Gastroenterology",
      bio: "Performs advanced endoscopy and manages chronic liver disease.",
      available: true,
      order: 5,
    },
    {
      name: "Dr. Ramesh Chandra",
      designation: "Consultant Physician",
      departmentId: medicine?.id,
      experienceYrs: 9,
      qualifications: "MBBS, MD General Medicine",
      bio: "Handles everyday illness and long-term chronic condition care.",
      available: true,
      order: 6,
    },
  ];

  for (const doc of doctors) {
    const existing = await prisma.doctor.findFirst({ where: { name: doc.name } });
    if (existing) {
      await prisma.doctor.update({ where: { id: existing.id }, data: doc });
    } else {
      await prisma.doctor.create({ data: doc });
    }
  }

  const packages = [
    {
      name: "Essential Health Checkup",
      priceRupees: 1499,
      description: "A foundational screening for adults, ideal for an annual checkup.",
      inclusions: "CBC, blood sugar, lipid profile, liver & kidney function, ECG, physician consultation.",
      order: 1,
    },
    {
      name: "Cardiac Risk Screening",
      priceRupees: 3499,
      description: "Focused screening for heart health and early risk detection.",
      inclusions: "ECG, 2D Echo, lipid profile, stress test, cardiologist consultation.",
      order: 2,
    },
    {
      name: "Women's Wellness Package",
      priceRupees: 2999,
      description: "Preventive screening tailored for women's health needs.",
      inclusions: "CBC, thyroid profile, bone density scan, mammogram, gynaecologist consultation.",
      order: 3,
    },
  ];

  for (const pkg of packages) {
    const existing = await prisma.healthPackage.findFirst({ where: { name: pkg.name } });
    if (existing) {
      await prisma.healthPackage.update({ where: { id: existing.id }, data: pkg });
    } else {
      await prisma.healthPackage.create({ data: pkg });
    }
  }

  const testimonials = [
    {
      name: "Ramana Murthy",
      message: "The cardiology team was quick to diagnose and treat my father. Grateful for the care shown at every step.",
      rating: 5,
      order: 1,
    },
    {
      name: "Sowjanya K.",
      message: "Delivered my baby here — the maternity ward staff were attentive day and night.",
      rating: 5,
      order: 2,
    },
    {
      name: "Durga Prasad",
      message: "Got same-day orthopaedic consultation for a sports injury. Wait time was shorter than expected.",
      rating: 4,
      order: 3,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }

  const promotions = [
    {
      title: "Free Cardiac Screening Camp",
      subtitle: "This weekend only — ECG and consultation at no cost for ages 40+.",
      badge: "Limited Offer",
      theme: "accent",
      linkUrl: "/health-packages",
      linkLabel: "Book your slot",
      order: 1,
    },
    {
      title: "Women's Wellness Package at ₹2,999",
      subtitle: "Thyroid, bone density, mammogram, and a gynaecologist consult — bundled.",
      badge: "Health Package",
      theme: "brand",
      linkUrl: "/health-packages",
      linkLabel: "View package",
      order: 2,
    },
    {
      title: "New: Live Bed & Wait-Time Tracker",
      subtitle: "Check real-time wait times and bed availability before you visit.",
      badge: "Now Live",
      theme: "accent",
      linkUrl: "/live-status",
      linkLabel: "Check live status",
      order: 3,
    },
  ];

  for (const p of promotions) {
    const existing = await prisma.promotion.findFirst({ where: { title: p.title } });
    if (existing) {
      await prisma.promotion.update({ where: { id: existing.id }, data: p });
    } else {
      await prisma.promotion.create({ data: p });
    }
  }

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "Use the Book Appointment button on any page, or call our appointments line. We'll confirm your slot by phone.",
      order: 1,
    },
    {
      question: "Is cashless treatment available with insurance?",
      answer: "Yes, we support cashless treatment with major insurance providers and government health schemes. See Insurance & Billing for details.",
      order: 2,
    },
    {
      question: "What should I do in a medical emergency?",
      answer: "Call 108 any time, day or night, or use the ambulance request form on our Emergency page for non-critical pickups.",
      order: 3,
    },
    {
      question: "Can I check department wait times before visiting?",
      answer: "Yes — the Live Status page shows current wait times and bed availability by department, updated by hospital staff throughout the day.",
      order: 4,
    },
  ];

  for (const f of faqs) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (existing) {
      await prisma.faq.update({ where: { id: existing.id }, data: f });
    } else {
      await prisma.faq.create({ data: f });
    }
  }

  const pages = [
    {
      slug: "about",
      title: "About Navya Hospital",
      body: "Navya Hospital has served Visakhapatnam for over two decades with a mission to deliver accessible, high-quality care across medicine, surgery, and emergency services. Our multidisciplinary teams work together across cardiology, neurology, orthopaedics, maternity care, and more — backed by modern diagnostics and a 24/7 emergency department.\n\nWe believe healthcare should be transparent and reachable, which is why we publish live wait times and bed availability, and make appointment booking simple for every patient.",
    },
    {
      slug: "facilities",
      title: "Our Facilities",
      body: "Navya Hospital is equipped with a 24/7 emergency department, dedicated ICUs for cardiac, neuro, and respiratory critical care, a modern cath lab, advanced imaging (CT, MRI, ultrasound), an in-house pharmacy, and a full diagnostic laboratory.\n\nOur maternity wing includes a newborn ICU, and our surgical suites support both planned and emergency procedures around the clock.",
    },
    {
      slug: "insurance-billing",
      title: "Insurance & Billing",
      body: "Navya Hospital offers cashless treatment with major insurance providers and supports government health schemes including Aarogyasri and EHS. Our billing desk can verify your coverage before admission — request a callback and our insurance desk will confirm your eligibility and estimated costs.\n\nFor self-paying patients, itemised estimates are available on request before any procedure.",
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    });
  }

  console.log("Seed data loaded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
