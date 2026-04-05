/**
 * Screenshots: public/work/screenshots/
 * Loops: public/work/loops/
 */

export type WebsiteTier = "basic" | "standard" | "advanced";

export const tierLabel: Record<WebsiteTier, string> = {
  basic: "Basic",
  standard: "Standard",
  advanced: "Advanced",
};

export function formatProjectSubtitle(
  businessLine: string,
  tier: WebsiteTier
): string {
  return `${businessLine} - ${tierLabel[tier]} Website Design`;
}

export const animatedLoopVideos: {
  id: string;
  src: string;
  label: string;
  /** Fill color behind the video (helps match site theme). */
  matte?: "light" | "dark";
  /** Per-loop crop tweak (visual only). */
  crop?: "trimY";
  /**
   * HTTPS still shown when the MP4 is missing (common on Netlify if loops are not in git).
   * Matches staticWorkItems fallbacks where possible.
   */
  stillImageSrc: string;
}[] = [
  {
    id: "logoipsum",
    src: "/work/loops/logoipsum.mp4",
    label: "Logoipsum",
    stillImageSrc:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
  },
  {
    id: "logoipsum2",
    src: "/work/loops/logoipsum2.mp4",
    label: "Logoipsum build 2",
    stillImageSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
  },
  {
    id: "logoipsum3",
    src: "/work/loops/logoipsum3.mp4",
    label: "Logoipsum build 3",
    stillImageSrc:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&q=80",
  },
  {
    id: "powerai",
    src: "/work/loops/powerai.mp4",
    label: "Power AI",
    matte: "light",
    crop: "trimY",
    stillImageSrc:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=80",
  },
  {
    id: "nanobuds",
    src: "/work/loops/nanobuds.mp4",
    label: "Nanobuds",
    stillImageSrc:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80",
  },
  {
    id: "targonet",
    src: "/work/loops/targonet.mp4",
    label: "Targo Net",
    stillImageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
  },
  {
    id: "apex",
    src: "/work/loops/apex.mp4",
    label: "Apex",
    stillImageSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80",
  },
  {
    id: "flyro",
    src: "/work/loops/flyro.mp4",
    label: "Flyro",
    stillImageSrc:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80",
  },
  {
    id: "novaforge",
    src: "/work/loops/novaforge.mp4",
    label: "Novaforge",
    stillImageSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
  },
  {
    id: "venture",
    src: "/work/loops/venture.mp4",
    label: "Venture",
    stillImageSrc:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80",
  },
  {
    id: "grow",
    src: "/work/loops/grow.mp4",
    label: "Grow",
    stillImageSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80",
  },
  {
    id: "brandly",
    src: "/work/loops/brandly.mp4",
    label: "Brandly",
    stillImageSrc:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
  },
  {
    id: "evr",
    src: "/work/loops/evr.mp4",
    label: "EVR",
    stillImageSrc:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80",
  },
  {
    id: "terra",
    src: "/work/loops/terra.mp4",
    label: "Terra",
    stillImageSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80",
  },
];

export type StaticWorkItem = {
  id: string;
  title: string;
  ownerName?: string;
  businessLine: string;
  tier: WebsiteTier;
  imageSrc: string;
  fallbackImageSrc: string;
  /** null = no public URL yet */
  href: string | null;
};

export const staticWorkItems: StaticWorkItem[] = [
  {
    id: "power-ai",
    title: "Power AI",
    businessLine: "Business AI",
    tier: "advanced",
    imageSrc: "/work/screenshots/powerai.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80",
    href: "https://power-x-ai.netlify.app/",
  },
  {
    id: "nanobuds",
    title: "Nanobuds",
    businessLine: "Tech product",
    tier: "advanced",
    imageSrc: "/work/screenshots/nanobuds.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    href: null,
  },
  {
    id: "targo-net",
    title: "Targo Net",
    businessLine: "Premium logistics & expedited freight",
    tier: "advanced",
    imageSrc: "/work/screenshots/car-site.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    href: "https://targonet.netlify.app",
  },
  {
    id: "apex-builds",
    title: "Apex Builds",
    businessLine: "Construction & builds",
    tier: "standard",
    imageSrc: "/work/screenshots/apexbuilds.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    href: "https://apexbuilds.netlify.app/",
  },
  {
    id: "cafe-zero",
    title: "Cafe Zero",
    businessLine: "Café & hospitality",
    tier: "standard",
    imageSrc: "/work/screenshots/CafeZero.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
    href: "https://cafe-zero.netlify.app",
  },
  {
    id: "flyro",
    title: "Flyro",
    businessLine: "Aviation & travel",
    tier: "standard",
    imageSrc: "/work/screenshots/flyro.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    href: "https://flyro.netlify.app",
  },
  {
    id: "noir",
    title: "Noir",
    businessLine: "Clothing & retail",
    tier: "standard",
    imageSrc: "/work/screenshots/Noir.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    href: "https://noirsclothing.netlify.app",
  },
  {
    id: "cjg-medical",
    title: "CJG Medical Services",
    ownerName: "CJ",
    businessLine: "Medical services",
    tier: "standard",
    imageSrc: "/work/screenshots/cjgmedicalservices.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    href: "https://cjgmedicalservices.netlify.app",
  },
  {
    id: "gh-performance",
    title: "GH Performance Nutrition",
    ownerName: "Gemma Holloway",
    businessLine: "Registered Sports Dietitian",
    tier: "standard",
    imageSrc: "/work/screenshots/GHP.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    href: "https://ghperformancenutrition.com",
  },
  {
    id: "plain-space",
    title: "Plain Space",
    businessLine: "Newsletter & clarity-focused writing",
    tier: "standard",
    imageSrc: "/work/screenshots/plainspace.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    href: "https://plainspace.netlify.app",
  },
  {
    id: "novaforge",
    title: "Novaforge Institute",
    businessLine: "Product design education & career training",
    tier: "advanced",
    imageSrc: "/work/screenshots/novaforge.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    href: "https://novaforge-institute.netlify.app",
  },
  {
    id: "kims-yoga",
    title: "Kim's Yoga",
    businessLine: "Wellness & fitness",
    tier: "basic",
    imageSrc: "/work/screenshots/kimsyoga.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
    href: "https://kimsyoga.netlify.app",
  },
  {
    id: "family-wellbeing",
    title: "Family Wellbeing Dietitian",
    businessLine: "Healthcare & nutrition",
    tier: "basic",
    imageSrc: "/work/screenshots/familywellbeingdietitian.png",
    fallbackImageSrc:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    href: "https://thefamilywellbeingdietitian.co.uk",
  },
];
