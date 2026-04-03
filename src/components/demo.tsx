"use client";

import {
  PortfolioPage,
  type PortfolioPageProps,
} from "@/components/ui/starfall-portfolio-landing";

const customPortfolioData: PortfolioPageProps = {
  navLinks: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#my-story" },
    { label: "Code", href: "#code" },
    { label: "Services", href: "#pricing" },
    { label: "Work", href: "#sites" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    titleLine1: "Websites that look great",
    titleLine2Gradient: "& actually work",
    subtitle:
      "I'm Ben, a web designer and developer focused on making modern, functional sites that look premium and suit your business needs.",
  },
  showAnimatedBackground: true,
};

const DemoOne = () => {
  return <PortfolioPage {...customPortfolioData} />;
};

export { DemoOne };
