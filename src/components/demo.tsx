"use client";

import { useEffect, useState } from "react";

import {
  PortfolioPage,
  type PortfolioPageProps,
} from "@/components/ui/starfall-portfolio-landing";

const customPortfolioData: PortfolioPageProps = {
  navLinks: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#my-story" },
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

const SPLASH_SEEN_KEY = "portfolio-splash-seen";

/** Short splash: hero fonts + brief aurora attempt, hard cap. */
const SPLASH_MIN_MS = 280;
const SPLASH_AURORA_GIVEUP_MS = 900;
const SPLASH_MAX_MS = 2400;

type SplashPhase = "show" | "fade" | "gone";

const DemoOne = () => {
  const [phase, setPhase] = useState<SplashPhase>("show");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Always show splash on first load
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setPhase("fade"), 200);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "show") {
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + 2;
        });
      }, 16);

      return () => clearInterval(progressTimer);
    }
  }, [phase]);

  const showSplash = phase !== "gone";

  return (
    <>
      <div className="min-h-screen">
        <PortfolioPage
          {...customPortfolioData}
          onAuroraFirstFrame={
            customPortfolioData.showAnimatedBackground
              ? () => {}
              : undefined
          }
        />
      </div>

      {showSplash ? (
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Loading BGG Website Design"
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-white transition-opacity duration-200 ease-out motion-reduce:duration-100 ${
            phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.propertyName !== "opacity") return;
            setPhase((p) => {
              if (p === "fade") {
                return "gone";
              }
              return p;
            });
          }}
        >
          <div className="w-[min(20rem,86vw)] px-4">
            <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
              BGG Website Design
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-center text-sm tabular-nums text-white/70">
              {progress}%
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { DemoOne };
