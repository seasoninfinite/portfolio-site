"use client";

import { useEffect, useState } from "react";

import {
  PortfolioPage,
  type PortfolioPageProps,
} from "@/components/ui/starfall-portfolio-landing";
import { OrbitalLoader } from "@/components/ui/orbital-loader";

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

/** Visible time before fade-out starts (page loads underneath; no opacity tricks on the page). */
const SPLASH_HOLD_MS = 900;

type SplashPhase = "show" | "fade" | "gone";

const DemoOne = () => {
  const [phase, setPhase] = useState<SplashPhase>("show");

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("fade"), SPLASH_HOLD_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <PortfolioPage {...customPortfolioData} />
      </div>

      {phase !== "gone" ? (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading site"
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-white transition-opacity duration-500 ease-out motion-reduce:duration-150 ${
            phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.propertyName !== "opacity") return;
            setPhase((p) => (p === "fade" ? "gone" : p));
          }}
        >
          <div className="text-white [&_.border-t-foreground]:border-t-white/90">
            <OrbitalLoader message="Loading.." messagePlacement="top" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export { DemoOne };
