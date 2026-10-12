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
      hospitalName: "Navya Global Cancer Centre",
      heroTitle: "Care beyond cancer",
      heroSubtitle:
        "Dr. Navya's Global Cancer Centre — a unit of Navya Green Hills Hospital — offers complete cancer care in Visakhapatnam, from diagnosis through chemotherapy, surgery, radiation, and palliative support.",
      phone: "934 746 6135 / 789 302 3838",
      emergencyPhone: "108",
      email: "care@navyagcc.com",
      address: "D.No. 18-322, Opp. Health City, BRTS Road, Chinnagadili, Visakhapatnam - 530040",
      opdHours: "OPD 9:00 AM - 5:00 PM daily · Emergency open 24/7",
      consultations: "28,000+",
      admissions: "4,500+",
      bedsCount: "60+",
      livesTouched: "35,000+",
    },
  });

  const departments = [
    {
      name: "Medical Oncology",
      slug: "medical-oncology",
      summary: "Chemotherapy, targeted therapy, and immunotherapy for all cancer types.",
      description:
        "Our medical oncology team designs personalised chemotherapy, targeted therapy, and immunotherapy plans, delivered in a dedicated day-care chemo unit under close monitoring.",
      icon: "syringe",
      waitMinutes: 20,
      bedsTotal: 15,
      bedsFree: 5,
      order: 1,
    },
    {
      name: "Surgical Oncology",
      slug: "surgical-oncology",
      summary: "Cancer surgery across breast, GI, gynaecologic, and head & neck sites.",
      description:
        "Our surgical oncologists perform curative and reconstructive cancer surgeries, working closely with medical and radiation oncology as part of a coordinated tumour board.",
      icon: "scalpel",
      waitMinutes: 25,
      bedsTotal: 12,
      bedsFree: 4,
      order: 2,
    },
    {
      name: "Radiation Oncology",
      slug: "radiation-oncology",
      summary: "Precision radiotherapy planning and delivery.",
      description:
        "Advanced radiotherapy planning and delivery for curative and palliative treatment, coordinated with your medical and surgical oncology team.",
      icon: "radiation",
      waitMinutes: 20,
      bedsTotal: 6,
      bedsFree: 2,
      order: 3,
    },
    {
      name: "Gynaecologic Oncology",
      slug: "gynaecologic-oncology",
      summary: "Breast, cervical, ovarian, and uterine cancer care.",
      description:
        "Specialist care for breast and gynaecologic cancers, from screening and diagnosis through surgery, chemotherapy, and survivorship support.",
      icon: "female",
      waitMinutes: 18,
      bedsTotal: 10,
      bedsFree: 3,
      order: 4,
    },
    {
      name: "Haemato-Oncology",
      slug: "haemato-oncology",
      summary: "Leukaemia, lymphoma, and other blood cancers.",
      description:
        "Diagnosis and treatment of blood cancers including leukaemia and lymphoma, with access to transfusion support and specialised chemotherapy protocols.",
      icon: "drop",
      waitMinutes: 22,
      bedsTotal: 8,
      bedsFree: 2,
      order: 5,
    },
    {
      name: "Pathology & Diagnostics",
      slug: "pathology-diagnostics",
      summary: "Biopsy, imaging, and molecular diagnostics for accurate staging.",
      description:
        "In-house biopsy reporting, imaging, and molecular diagnostics that power fast, accurate cancer staging — the foundation every treatment plan is built on.",
      icon: "microscope",
      waitMinutes: 15,
      bedsTotal: 0,
      bedsFree: 0,
      order: 6,
    },
    {
      name: "Palliative & Supportive Care",
      slug: "palliative-care",
      summary: "Pain management, nutrition, and emotional support at every stage.",
      description:
        "Our palliative team focuses on quality of life — pain and symptom management, nutrition counselling, and emotional support for patients and families.",
      icon: "heart",
      waitMinutes: 12,
      bedsTotal: 6,
      bedsFree: 2,
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

  const medOnc = await prisma.department.findUnique({ where: { slug: "medical-oncology" } });
  const surgOnc = await prisma.department.findUnique({ where: { slug: "surgical-oncology" } });
  const radOnc = await prisma.department.findUnique({ where: { slug: "radiation-oncology" } });
  const gynOnc = await prisma.department.findUnique({ where: { slug: "gynaecologic-oncology" } });
  const haemOnc = await prisma.department.findUnique({ where: { slug: "haemato-oncology" } });
  const pathology = await prisma.department.findUnique({ where: { slug: "pathology-diagnostics" } });

  const doctors = [
    {
      name: "Dr. Navya Madabatula",
      designation: "Senior Consultant Oncologist",
      departmentId: medOnc?.id,
      experienceYrs: 15,
      qualifications: "MBBS, MD",
      bio: "Founder and lead oncologist at Navya Global Cancer Centre, specialising in personalised chemotherapy and targeted therapy across cancer types.",
      available: true,
      order: 1,
    },
    {
      name: "Dr. Kiran Varma",
      designation: "Consultant Surgical Oncologist",
      departmentId: surgOnc?.id,
      experienceYrs: 12,
      qualifications: "MS, MCh Surgical Oncology",
      bio: "Performs curative and reconstructive cancer surgeries across breast, GI, and head & neck sites.",
      available: true,
      order: 2,
    },
    {
      name: "Dr. Ramesh Pathuri",
      designation: "Consultant Radiation Oncologist",
      departmentId: radOnc?.id,
      experienceYrs: 10,
      qualifications: "MD Radiotherapy",
      bio: "Plans and delivers precision radiotherapy for curative and palliative cancer treatment.",
      available: true,
      order: 3,
    },
    {
      name: "Dr. Swathi Reddy",
      designation: "Consultant Gynaecologic Oncologist",
      departmentId: gynOnc?.id,
      experienceYrs: 11,
      qualifications: "MD, DGO, Fellowship in Gynaecologic Oncology",
      bio: "Manages breast and gynaecologic cancer care from screening through surgery and survivorship.",
      available: true,
      order: 4,
    },
    {
      name: "Dr. Arvind Chowdary",
      designation: "Consultant Haemato-Oncologist",
      departmentId: haemOnc?.id,
      experienceYrs: 9,
      qualifications: "MD, DM Clinical Haematology",
      bio: "Treats leukaemia, lymphoma, and other blood cancers with specialised chemotherapy protocols.",
      available: false,
      order: 5,
    },
    {
      name: "Dr. Lakshmi Prasanna",
      designation: "Consultant Pathologist",
      departmentId: pathology?.id,
      experienceYrs: 8,
      qualifications: "MD Pathology",
      bio: "Leads biopsy reporting and molecular diagnostics that guide accurate cancer staging and treatment planning.",
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
      name: "Cancer Risk Screening",
      priceRupees: 2499,
      description: "A foundational screening to catch early warning signs.",
      inclusions: "Tumour marker panel, CBC, liver & kidney function, physician consultation.",
      order: 1,
    },
    {
      name: "Breast Cancer Screening",
      priceRupees: 1999,
      description: "Early detection screening for breast cancer.",
      inclusions: "Clinical breast exam, mammogram, gynaecologic oncologist consultation.",
      order: 2,
    },
    {
      name: "Full Body Cancer Screening",
      priceRupees: 4999,
      description: "Comprehensive screening across common cancer sites.",
      inclusions: "Whole-body imaging, tumour marker panel, endoscopy referral, oncologist consultation.",
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
      message: "Dr. Navya and her team guided my wife through chemotherapy with so much care. We never felt alone in this.",
      rating: 5,
      order: 1,
    },
    {
      name: "Sowjanya K.",
      message: "The surgical oncology team explained every step before my surgery. Recovery support was excellent.",
      rating: 5,
      order: 2,
    },
    {
      name: "Durga Prasad",
      message: "Radiation therapy sessions were well organised with almost no waiting. Staff were attentive throughout.",
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
      title: "Free Breast Cancer Screening Camp",
      subtitle: "This weekend only — clinical exam and consultation at no cost for women 40+.",
      badge: "Limited Offer",
      theme: "accent",
      linkUrl: "/health-packages",
      linkLabel: "Book your slot",
      order: 1,
    },
    {
      title: "Full Body Cancer Screening at ₹4,999",
      subtitle: "Whole-body imaging, tumour marker panel, and an oncologist consultation — bundled.",
      badge: "Health Package",
      theme: "brand",
      linkUrl: "/health-packages",
      linkLabel: "View package",
      order: 2,
    },
    {
      title: "Meet Dr. Navya Madabatula",
      subtitle: "Senior Consultant Oncologist, now taking same-week consultations.",
      badge: "Featured Doctor",
      theme: "accent",
      linkUrl: "/doctors",
      linkLabel: "View profile",
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
      question: "Is chemotherapy available on-site?",
      answer: "Yes — we have a dedicated day-care chemotherapy unit where treatment is delivered under close monitoring.",
      order: 2,
    },
    {
      question: "Is cashless treatment available with insurance?",
      answer: "Yes, we support cashless treatment with major insurance providers and government health schemes. See Insurance & Billing for details.",
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
      title: "About Navya Global Cancer Centre",
      body: "Dr. Navya's Global Cancer Centre (NGCC) is a unit of Navya Green Hills Hospital, serving Visakhapatnam with complete cancer care under one roof — medical, surgical, and radiation oncology, backed by in-house pathology and a dedicated palliative care team.\n\nFounded by Dr. Navya Madabatula, Senior Consultant Oncologist, our mission is care beyond cancer: treating the whole patient, not just the diagnosis, with a multidisciplinary tumour board guiding every treatment plan.",
    },
    {
      slug: "facilities",
      title: "Our Facilities",
      body: "Navya Global Cancer Centre is equipped with a dedicated day-care chemotherapy unit, radiation therapy planning and delivery, in-house pathology and molecular diagnostics, and a palliative care unit focused on pain management and quality of life.\n\nOur surgical oncology team operates from Navya Green Hills Hospital's surgical suites for planned and reconstructive cancer procedures.",
    },
    {
      slug: "insurance-billing",
      title: "Insurance & Billing",
      body: "Navya Global Cancer Centre offers cashless treatment with major insurance providers and supports government health schemes including Aarogyasri and EHS. Our billing desk can verify your coverage before treatment begins — request a callback and our insurance desk will confirm your eligibility and estimated costs.\n\nFor self-paying patients, itemised estimates are available on request before any procedure.",
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
