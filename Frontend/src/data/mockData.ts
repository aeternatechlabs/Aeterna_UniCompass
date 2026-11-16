import type {
  DestinationCardData,
  PathwayAmbitionData,
  CountryCostData,
} from "../types";

export const EDUCATION_OPTIONS = [
  "Graduate",
  "Undergraduate",
  "High School (12th)",
  "Working Professional / Diploma",
];

export const FIELD_OPTIONS = [
  "Healthcare / Nursing",
  "Computer Science & AI",
  "Engineering",
  "Business & Management",
  "Medicine & MBBS",
  "Biotechnology & Life Sciences",
  "Law & International Relations",
];

export const BUDGET_OPTIONS = [
  "Below ₹8 Lakh",
  "₹8 - 12 Lakh",
  "₹12 - 20 Lakh",
  "₹20 - 35 Lakh",
  "Above ₹35 Lakh",
];

export const DESTINATION_OPTIONS = [
  "Open to all countries",
  "United Kingdom",
  "Germany",
  "Australia",
  "France",
  "Italy",
  "Canada",
  "United States",
];

export const DESTINATION_CARDS: DestinationCardData[] = [
  {
    id: "germany",
    country: "Germany",
    tags: "Engineering · Research · €0 Tuition",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
    tuitionOverview:
      "Public universities charge €0 tuition for most degrees, only nominal semester ticket (€150–€350).",
    visaHighlights:
      "18-month post-study work visa (Chancenkarte / Jobseeker permit), APS certificate mandatory.",
    topUniversities: [
      "TU Munich",
      "RWTH Aachen",
      "Heidelberg University",
      "KIT Karlsruhe",
    ],
  },
  {
    id: "uk",
    country: "United Kingdom",
    tags: "Medicine · Bioscience · Technology",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    tuitionOverview:
      "Undergraduate £14k–£26k/yr; Postgraduate Masters typically £16k–£32k (1 year duration).",
    visaHighlights:
      "2-year Graduate Route Post-Study Work Visa, 20 hrs/week part-time work permitted during term.",
    topUniversities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College",
      "UCL",
      "Manchester",
    ],
  },
  {
    id: "australia",
    country: "Australia",
    tags: "Healthcare · IT · Management",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80",
    tuitionOverview:
      "Average AUD $30,000–$48,000/yr depending on institution and CRICOS registered status.",
    visaHighlights:
      "Subclass 500 Student Visa; 48 hours per fortnight work rights; 2-4 year post-study work visa.",
    topUniversities: [
      "University of Melbourne",
      "University of Sydney",
      "UNSW Sydney",
      "Monash University",
    ],
  },
  {
    id: "france",
    country: "France",
    tags: "Fashion · Design · Culinary",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    tuitionOverview:
      "Subsidised public university rates (€2,770 Bachelor / €3,770 Masters); Grand Écoles vary.",
    visaHighlights:
      "CAF housing allowance subsidy up to 40%; 1-2 year APS post-graduation authorization.",
    topUniversities: [
      "Sorbonne University",
      "École Polytechnique",
      "HEC Paris",
      "Sciences Po",
    ],
  },
  {
    id: "italy",
    country: "Italy",
    tags: "Medicine · Design · Architecture",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    tuitionOverview:
      "Means-tested public tuition (€900–€4,000/yr) with extensive DSU regional merit/need scholarships.",
    visaHighlights:
      "English-taught IMAT medical programs; 1-year permit to search for employment after graduation.",
    topUniversities: [
      "University of Bologna",
      "Politecnico di Milano",
      "Sapienza University of Rome",
      "University of Milan",
    ],
  },
];

export const AMBITION_CARDS: PathwayAmbitionData[] = [
  {
    id: "medicine",
    title: "Medicine & MBBS",
    category: "HEALTHCARE",
    description:
      "Medical degrees, clinical pathways, entry benchmarks and healthcare careers.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore medicine",
  },
  {
    id: "engineering",
    title: "Engineering",
    category: "TECHNOLOGY",
    description:
      "Mechanical, electrical, civil and emerging engineering specialisations.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore engineering",
  },
  {
    id: "cs-ai",
    title: "Computer Science & AI",
    category: "FUTURE TECH",
    description:
      "Software development, data science, machine learning and cyber security.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore technology",
  },
  {
    id: "business",
    title: "Business & Management",
    category: "BUSINESS",
    description: "Management, finance, marketing, economics and MBA pathways.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    linkText: "Explore business",
  },
];

export const COUNTRY_COMPARISONS: CountryCostData[] = [
  {
    country: "Germany",
    flag: "🇩🇪",
    tuitionModel: {
      INR: "Varies by institution (€0 public)",
      EUR: "Varies by institution (€0 public)",
      GBP: "Varies by institution (€0 public)",
      AUD: "Varies by institution (€0 public)",
      USD: "Varies by institution (€0 public)",
    },
    language: "German / English",
    typicalPlanning: {
      INR: "₹11.85 Lakhs / yr (Blocked a/c)",
      EUR: "€11,208 / yr (Blocked a/c)",
      GBP: "£9,650 / yr (Blocked a/c)",
      AUD: "A$18,400 / yr (Blocked a/c)",
      USD: "$12,150 / yr (Blocked a/c)",
    },
    planningLabels: "Living · Insurance · Blocked a/c",
    intake: "Check programme (Winter Oct / Summer Apr)",
    verificationNotice: "Official sources verification required",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    tuitionModel: {
      INR: "Course-specific (₹23.75 Lakhs avg)",
      EUR: "Course-specific (€26,200 avg)",
      GBP: "Course-specific (£22,500 avg)",
      AUD: "Course-specific (A$43,800 avg)",
      USD: "Course-specific ($28,900 avg)",
    },
    language: "English",
    typicalPlanning: {
      INR: "₹18.2 Lakhs / yr",
      EUR: "€20,100 / yr",
      GBP: "£15,000 / yr (UKVI London/Outer)",
      AUD: "A$33,600 / yr",
      USD: "$22,200 / yr",
    },
    planningLabels: "Tuition · Living · Visa",
    intake: "Check programme (Autumn Sep / Winter Jan)",
    verificationNotice: "Official sources verification required",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    tuitionModel: {
      INR: "Provider-specific (₹25.13 Lakhs avg)",
      EUR: "Provider-specific (€27,800 avg)",
      GBP: "Provider-specific (£23,900 avg)",
      AUD: "Provider-specific (A$46,500 avg)",
      USD: "Provider-specific ($30,600 avg)",
    },
    language: "English",
    typicalPlanning: {
      INR: "₹18.18 Lakhs / yr",
      EUR: "€20,080 / yr",
      GBP: "£17,250 / yr",
      AUD: "A$33,600 / yr (OSHC + Living)",
      USD: "$22,150 / yr",
    },
    planningLabels: "Tuition · Living · OSHC",
    intake: "Check programme (Semester 1 Feb / Semester 2 Jul)",
    verificationNotice: "Official sources verification required",
  },
];
