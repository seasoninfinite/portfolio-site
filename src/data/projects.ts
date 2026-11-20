/**
 * Every project in the portfolio. Device screenshots live in
 * public/work/devices/<slug>/{desktop,tablet,phone}.webp (captured at 1440, 834 and 390 px).
 *
 * kind:
 *  - "client"  = a real client's website.
 *  - "concept" = a demo build for a made-up business (internal only; the site never calls it a client).
 */

export type ProjectKind = "client" | "concept";

export type Category = "health" | "trades" | "hospitality" | "tech";

export const CATEGORY_LABELS: Record<Category, string> = {
  health: "Health & wellness",
  trades: "Trades & local services",
  hospitality: "Hospitality, retail & travel",
  tech: "Tech, education & media",
};

export type Project = {
  slug: string;
  category: Category;
  name: string;
  kind: ProjectKind;
  /** Client name for real work. */
  client?: string;
  sector: string;
  location?: string;
  /** One line used on cards. */
  summary: string;
  /** Background behind the device mockups, taken from the site's own palette. */
  tile: string;
  tileDark: boolean;
  /** Live link for the design shown, if it's live. */
  liveUrl?: string;
  /** Status note when the design shown isn't live yet. */
  status?: string;
  /** Where the client's current site lives (when the new design isn't live yet). */
  currentUrl?: string;
  brief: string;
  built: string[];
  outcome: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "gh-performance-nutrition",
    category: "health",
    name: "GH Performance Nutrition",
    kind: "client",
    client: "Gemma Holloway, Registered Sports Dietitian",
    sector: "Sports dietitian",
    summary: "A bold, kinetic site that turns runners into booked clients and sells Gemma's guide while she sleeps.",
    tile: "#0F2B2C",
    tileDark: true,
    status: "New design launching soon",
    currentUrl: "https://ghperformancenutrition.com",
    brief:
      "Gemma helps runners fuel properly for training and racing. She needed a site that felt as energetic as her clients, explained her services clearly, and could sell her carbohydrate guide without her lifting a finger.",
    built: [
      "A dark, high-energy design with moving pace lines and bright orange calls to action",
      "Services, testimonials and an about page that make booking feel easy",
      "A blog with in-depth articles that answer what runners search for",
      "A guide shop: secure online checkout and instant, protected PDF downloads",
      "Fully responsive, fast-loading pages built in clean, hand-written code",
    ],
    outcome: "A site that works as a 24/7 shop window: it explains, builds trust, and sells the guide automatically.",
    featured: true,
  },
  {
    slug: "family-wellbeing-dietitian",
    category: "health",
    name: "The Family Wellbeing Dietitian",
    kind: "client",
    client: "Varsha Nagaraj, Paediatric Dietitian",
    sector: "Paediatric dietitian",
    location: "Swansea",
    summary: "A warm, reassuring site that makes worried parents feel looked after before they've even booked.",
    tile: "#EADBC8",
    tileDark: false,
    status: "New design launching soon",
    currentUrl: "https://thefamilywellbeingdietitian.co.uk",
    brief:
      "Varsha supports families through pregnancy, breastfeeding, weaning and the early years. Parents arrive anxious, so the site had to feel calm and trustworthy, and make it effortless to get help.",
    built: [
      "A soft, editorial 'Garden Room' design with her own hand-drawn pen motif",
      "Clear service and consultation pages so parents know exactly what to expect",
      "Expert articles on breastfeeding, introducing solids and constipation",
      "A cookie-consent banner and privacy pages done properly",
      "Contact form and email links on every page, so help is always one tap away",
    ],
    outcome: "A site that answers parents' questions, shows real expertise, and gently guides them to book.",
    featured: true,
  },
  {
    slug: "ask-your-dietitian",
    category: "health",
    name: "Ask Your Dietitian",
    kind: "client",
    client: "Laura Coster, Clinical Director",
    sector: "Dietitian clinic",
    location: "Essex",
    summary: "A slow WordPress site rebuilt as a fast, modern clinic site with its own online shop.",
    tile: "#DCEBE5",
    tileDark: false,
    status: "Rebuild launching soon",
    currentUrl: "https://askyourdietitian.com",
    brief:
      "Laura's clinic was stuck on an ageing WordPress and Elementor site that nobody could maintain. She wanted it faster, easier to update and better at selling her webinars and guides.",
    built: [
      "The whole site rebuilt in clean code: no plugins, no page builder, no slowdowns",
      "A resources shop with secure Stripe checkout and protected paid downloads",
      "A reviews wall that shows off years of happy patients",
      "Team, services and contact pages redesigned around booking",
      "Her legal pages, newsletter sign-ups and analytics carried over safely",
    ],
    outcome: "A faster, cheaper-to-run site that sells for her and that she'll never have to fight with again.",
    featured: true,
  },
  {
    slug: "london-dietitian",
    category: "health",
    name: "London Dietitian",
    kind: "client",
    client: "Claudia Ehrlicher, Registered Dietitian",
    sector: "Dietitian & nutritionist",
    location: "London",
    summary: "A vibrant, confident site that makes a one-woman practice look like the go-to name in London.",
    tile: "#F3A07F",
    tileDark: false,
    status: "New design launching soon",
    currentUrl: "https://londondietitian.netlify.app",
    brief:
      "Claudia helps clients build lasting habits around food. She wanted a site that felt modern and optimistic, stood out from clinical competitors and turned visitors into free discovery calls.",
    built: [
      "A bright, warm design with bold type that's impossible to forget",
      "Consultation and 'work with me' pages that sell the outcome, not the jargon",
      "A resources hub, plus every policy page a practitioner needs",
      "A discovery-call booking flow repeated at every decision point",
      "Professional memberships shown up front to build instant trust",
    ],
    outcome: "A memorable site that gives Claudia a premium look and makes booking the obvious next step.",
    featured: true,
  },
  {
    slug: "cjg-medical-services",
    category: "health",
    name: "CJG Medical Services",
    kind: "client",
    client: "CJ, Occupational Health",
    sector: "Occupational health",
    summary: "A sleek, professional site that wins the trust of employers looking after their workforce.",
    tile: "#0E4442",
    tileDark: true,
    liveUrl: "https://cjgmedicalservices.netlify.app",
    brief:
      "CJ provides occupational health services to businesses. The site needed to look established and credible to employers, and explain the services clearly.",
    built: [
      "A modern, clinical-but-friendly design in deep teal",
      "Clear service pages written around what employers need",
      "Consultation calls to action on every screen",
      "Fully responsive build that looks sharp on every device",
    ],
    outcome: "A credible online presence that showcases CJ's services and makes enquiries easy.",
    featured: false,
  },
  {
    slug: "alder-finch-dental",
    category: "health",
    name: "Alder & Finch Dental",
    kind: "concept",
    sector: "Private dental practice",
    summary: "A private dental practice site built to fill the appointment book: prices up front and booking in one tap.",
    tile: "#3E2447",
    tileDark: true,
    liveUrl: "/showcase/alder-finch-dental/index.html",
    brief:
      "Most dental websites bury their prices and make booking a chore. This private practice site does the opposite, so nervous patients feel at ease and book.",
    built: [
      "A calm, premium plum and mint design that feels clean and clinical",
      "Treatment cards with clear 'from' prices",
      "Book online and click-to-call on every screen, including a sticky bar on phones",
      "Google rating, team and opening hours that build trust in seconds",
    ],
    outcome: "Shows how a practice can look premium and still feel welcoming, with every path leading to a booking.",
    featured: true,
  },
  {
    slug: "fernbrook-landscapes",
    category: "trades",
    name: "Fernbrook Landscapes",
    kind: "concept",
    sector: "Landscaping & driveways",
    summary: "A trades site that turns 'just browsing' homeowners into booked design visits.",
    tile: "#1F3A2B",
    tileDark: true,
    liveUrl: "/showcase/fernbrook-landscapes/index.html",
    brief:
      "Trades businesses often rely on a Facebook page and a phone number. This landscaping site shows the work, explains the process and asks for the job.",
    built: [
      "A rich forest-green and sunshine design built around big project photos",
      "Services, a three-step process and reviews that remove every doubt",
      "A short quote form that asks only what the team needs",
      "Built to load fast on a phone in a customer's garden",
    ],
    outcome: "Shows how a trade business can look as solid online as its work, and win more quote requests.",
    featured: true,
  },
  {
    slug: "apex-builds",
    category: "trades",
    name: "Apex Builds",
    kind: "concept",
    sector: "Construction & renovation",
    summary: "A rugged, confident builder's site with 'get a free quote' on every screen.",
    tile: "#2B1B10",
    tileDark: true,
    liveUrl: "https://apexbuilds.netlify.app/",
    brief: "A building and renovation firm that needs to look solid from the very first glance.",
    built: ["Dark, warm design with bold orange calls to action", "Trust badges and stats above the fold", "Services and project pages", "Quote request on every screen"],
    outcome: "A builder's site that looks as dependable as the work it advertises.",
  },
  {
    slug: "cafe-zero",
    category: "hospitality",
    name: "Cafe Zero",
    kind: "concept",
    sector: "Café & hospitality",
    summary: "A rich, editorial café site that makes you smell the coffee.",
    tile: "#3A2A1E",
    tileDark: true,
    liveUrl: "https://cafe-zero.netlify.app",
    brief: "An independent café: menu, hours and location clear on a phone, with a story worth reading.",
    built: ["Serif-led editorial design with coffee photography", "Menu, hours and directions that are easy to find", "Mobile-first layout for people on the move"],
    outcome: "A café site that sells the atmosphere as well as the menu.",
  },
  {
    slug: "targo-net",
    category: "trades",
    name: "Targo Net",
    kind: "concept",
    sector: "Logistics & freight",
    summary: "A high-octane logistics site that says 'fast' before you've read a word.",
    tile: "#A9211A",
    tileDark: true,
    liveUrl: "https://targonet.netlify.app",
    brief: "A premium logistics firm, where speed and reliability have to come across instantly.",
    built: ["Motion-heavy, high-contrast design", "Service and pricing sections built for B2B buyers", "Consultation booking front and centre"],
    outcome: "A logistics brand that feels disciplined, premium and quick.",
  },
  {
    slug: "power-ai",
    category: "tech",
    name: "Power AI",
    kind: "concept",
    sector: "AI software",
    summary: "A sleek product launch site with the polish of a funded startup.",
    tile: "#1C1033",
    tileDark: true,
    liveUrl: "https://power-x-ai.netlify.app/",
    brief: "An AI product launch, built to look as advanced as the software it sells.",
    built: ["Glowing 3D-style hero and gradient light", "Feature, pricing and social-proof sections", "Scroll animations throughout"],
    outcome: "A product page that looks ready for a big launch day.",
  },
  {
    slug: "novaforge",
    category: "tech",
    name: "Novaforge Institute",
    kind: "concept",
    sector: "Education & training",
    summary: "A premium course site structured around outcomes, modules and enrolments.",
    tile: "#0C1526",
    tileDark: true,
    liveUrl: "https://novaforge-institute.netlify.app",
    brief: "A product-design school that needs to feel credible and premium to career changers.",
    built: ["Dark, cinematic design", "Course, instructor and testimonial sections", "Enrolment calls to action throughout"],
    outcome: "An education brand that looks as good as the careers it promises.",
  },
  {
    slug: "noir",
    category: "hospitality",
    name: "Noir",
    kind: "concept",
    sector: "Fashion & retail",
    summary: "A minimal fashion store that lets the product do the talking.",
    tile: "#1A1714",
    tileDark: true,
    liveUrl: "https://noirsclothing.netlify.app",
    brief: "A premium menswear label that wants to look like a brand, not a template.",
    built: ["Monochrome luxury design", "Product-first layout", "Shop now calls to action"],
    outcome: "A fashion site with real brand presence.",
  },
  {
    slug: "flyro",
    category: "hospitality",
    name: "Flyro",
    kind: "concept",
    sector: "Aviation & travel",
    summary: "An airy, high-end private jet site that sells the feeling of first class.",
    tile: "#E6E4DF",
    tileDark: false,
    liveUrl: "https://flyro.netlify.app",
    brief: "Private aviation, where the website has to feel premium, calm and trustworthy.",
    built: ["Light, spacious design with a cinematic hero", "Experience, fleet and membership sections", "Booking calls to action"],
    outcome: "A travel brand that feels effortless and exclusive.",
  },
  {
    slug: "plain-space",
    category: "tech",
    name: "Plain Space",
    kind: "concept",
    sector: "Newsletter & writing",
    summary: "A dreamy, illustrated newsletter site that makes people want to subscribe.",
    tile: "#263A31",
    tileDark: true,
    liveUrl: "https://plainspace.netlify.app",
    brief: "A writer's newsletter that needed to feel calm, deliberate and different.",
    built: ["Illustrated, atmospheric hero", "Clear subscribe path", "Readable article layouts"],
    outcome: "A newsletter brand with a world of its own.",
  },
  {
    slug: "mistvale",
    category: "health",
    name: "Mistvale",
    kind: "concept",
    sector: "Spa & wellness retreat",
    summary: "A serene thermal-spa site that makes you want to book a weekend away.",
    tile: "#272B46",
    tileDark: true,
    brief: "A luxury spa retreat: calm, atmospheric and built to drive visit bookings.",
    built: ["Moody mountain photography and soft serif type", "Experiences, retreats and membership sections", "'Plan your visit' booking path"],
    outcome: "A wellness brand that sells the feeling before the facilities.",
  },
];

export const clientProjects = projects.filter((p) => p.kind === "client");
export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

const DEVICE_FOLDER: Record<string, string> = {
  "gh-performance-nutrition": "gh-performance",
  "family-wellbeing-dietitian": "family-wellbeing",
  "cjg-medical-services": "cjg-medical",
};

export function deviceFolder(slug: string): string {
  return DEVICE_FOLDER[slug] ?? slug;
}

export function deviceSrc(slug: string, device: "desktop" | "tablet" | "phone"): string {
  return `/work/devices/${deviceFolder(slug)}/${device}.webp`;
}
