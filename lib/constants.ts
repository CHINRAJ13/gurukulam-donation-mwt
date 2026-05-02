export const SITE_NAME = "Shree Easanamma Gurukulam";
export const SITE_TAGLINE = "Reviving the Sacred Siddhar Tradition";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gurukulam.org";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Causes", href: "/causes" },
  { label: "Gallery", href: "/gallery" },
  { label: "Updates", href: "/updates" },
  { label: "Contact", href: "/contact" },
] as const;

export const DONATION_PRESETS = [1001, 5001, 10001, 25001, 50001] as const;

export const DONATION_CATEGORIES = [
  {
    slug: "temple-construction",
    icon: "🛕",
    title: "Temple Construction",
    description:
      "Help build a sacred temple with Shiva Lingam and Mahameru to serve as a beacon of spiritual energy for future generations.",
    tiers: [
      { label: "Sponsor a stone", amount: 1000 },
      { label: "Sponsor 1 sq.ft", amount: 5000 },
      { label: "Support Mahameru & sanctum", amount: 25000 },
    ],
    ctaLabel: "Donate to Temple",
    accentColor: "gold",
  },
  {
    slug: "adopt-othuvar-student",
    icon: "🎓",
    title: "Adopt an Othuvar Student",
    description:
      "Support the training of students in the ancient Othuvar tradition — a 3-year residential program preserving sacred Tamil hymns.",
    tiers: [
      { label: "Monthly support", amount: 3000 },
      { label: "Education materials", amount: 10000 },
      { label: "Full year sponsorship", amount: 36000 },
    ],
    ctaLabel: "Sponsor a Student",
    accentColor: "saffron",
  },
  {
    slug: "aadhib-vithai-program",
    icon: "🔥",
    title: "Aadhib Vithai Program",
    description:
      "Fund free 7-day transformational spiritual programs that awaken seekers to their inner potential through ancient Siddhar practices.",
    tiers: [
      { label: "Sponsor 1 participant", amount: 5000 },
      { label: "Sponsor full batch", amount: 200000 },
    ],
    ctaLabel: "Support Program",
    accentColor: "crimson",
  },
  {
    slug: "annadhanam",
    icon: "🍛",
    title: "Annadhanam",
    description:
      "Provide nourishing meals to students, seekers, and visitors. Feeding those on the spiritual path is one of the highest forms of seva.",
    tiers: [
      { label: "Sponsor 1 meal", amount: 100 },
      { label: "Feed for 1 day", amount: 3000 },
      { label: "Full program meals", amount: 21000 },
    ],
    ctaLabel: "Feed Now",
    accentColor: "saffron",
  },
  {
    slug: "guru-teacher-support",
    icon: "👨‍🏫",
    title: "Guru & Teacher Support",
    description:
      "Sustain the livelihood of senior Othuvar masters and teachers who dedicate their lives to passing ancient knowledge to the next generation.",
    tiers: [
      { label: "Senior Othuvar (monthly)", amount: 40000 },
      { label: "Teacher support (monthly)", amount: 10000 },
    ],
    ctaLabel: "Support Guru",
    accentColor: "gold",
  },
  {
    slug: "daily-operations",
    icon: "⚡",
    title: "Daily Operations",
    description:
      "Keep the gurukulam running with essential daily expenses — electricity, cooking gas, maintenance, and essential supplies.",
    tiers: [
      { label: "Electricity for 1 month", amount: 5000 },
      { label: "Cooking supplies", amount: 3000 },
      { label: "Maintenance & repairs", amount: 10000 },
    ],
    ctaLabel: "Support Operations",
    accentColor: "crimson",
  },
] as const;

export const PATRON_TIERS = [
  {
    tier: "Gold" as const,
    amount: 100000,
    benefits: [
      "Name engraved in temple",
      "Special pooja participation",
      "Direct blessings from the Guru",
      "Annual spiritual retreat invitation",
    ],
  },
  {
    tier: "Diamond" as const,
    amount: 500000,
    featured: true,
    benefits: [
      "Name engraved in temple sanctum",
      "Priority pooja participation",
      "Direct blessings from the Guru",
      "Lifetime spiritual retreat access",
      "Personal spiritual guidance session",
    ],
  },
  {
    tier: "Lifetime" as const,
    amount: 1000000,
    benefits: [
      "Name on temple foundation stone",
      "Lifetime pooja privileges",
      "Direct blessings from the Guru",
      "Lifetime retreat & program access",
      "Personal spiritual mentorship",
      "Family blessings ceremony",
    ],
  },
] as const;

export const IMPACT_STATS = [
  { number: 25, label: "Students trained in sacred traditions", icon: "🎓" },
  { number: 40, label: "Participants transformed every 10 days", icon: "🔥" },
  { number: 100, label: "Transparency in fund utilisation", icon: "✅", suffix: "%" },
  { number: 0, label: "Annadhanam for residents and seekers", icon: "🍛", displayText: "Daily" },
] as const;

export const TRUST_POINTS = [
  { icon: "✅", text: "Registered Trust" },
  { icon: "✅", text: "Proper utilisation of all funds" },
  { icon: "✅", text: "Regular updates sent to donors" },
  { icon: "✅", text: "Full accountability in all activities" },
] as const;

export const WHY_DONATE_PILLARS = [
  { icon: "🏺", title: "Supporting ancient wisdom" },
  { icon: "📚", title: "Enabling education" },
  { icon: "🍛", title: "Feeding seekers" },
  { icon: "🛕", title: "Building a sacred space" },
] as const;

export const CONSTRUCTION_ITEMS = [
  { id: "brick", name: "Sacred Brick", price: 11, unit: "per brick", icon: "🧱" },
  { id: "cement", name: "Cement Bag", price: 450, unit: "per bag", icon: "📦" },
  { id: "stone", name: "Granite Stone", price: 1000, unit: "per sq.ft", icon: "🪨" },
  { id: "sand", name: "Sacred Sand", price: 2100, unit: "per load", icon: "⏳" },
  { id: "steel", name: "Steel Rod", price: 500, unit: "per rod", icon: "🏗️" },
  { id: "lamp", name: "Temple Lamp", price: 5001, unit: "per lamp", icon: "🪔" },
];
