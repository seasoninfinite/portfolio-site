"use client";

import { useCallback, useEffect, useState } from "react";

import {
  PortfolioPage,
  type PortfolioPageProps,
} from "@/components/ui/starfall-portfolio-landing";
import { PRIORITY_CAPABILITY_VIDEO_SRCS } from "@/data/priority-videos";
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

const SPLASH_SEEN_KEY = "portfolio-splash-seen";

/** Never block the user longer than this if assets stall. */
const SPLASH_MAX_WAIT_MS = 28_000;

type SplashPhase = "show" | "fade" | "gone";

const DemoOne = () => {
  const [phase, setPhase] = useState<SplashPhase>(() =>
    typeof window !== "undefined" && sessionStorage.getItem(SPLASH_SEEN_KEY) === "1"
      ? "gone"
      : "show"
  );

  const [textAndFontsReady, setTextAndFontsReady] = useState(false);
  const [auroraReady, setAuroraReady] = useState(
    !customPortfolioData.showAnimatedBackground
  );
  const [priorityVid0, setPriorityVid0] = useState(false);
  const [priorityVid1, setPriorityVid1] = useState(false);

  const handleAuroraFirstFrame = useCallback(() => {
    setAuroraReady(true);
  }, []);

  useEffect(() => {
    if (phase === "gone") return;
    let cancelled = false;
    void (async () => {
      try {
        await document.fonts.ready;
      } catch {
        /* ignore */
      }
      if (cancelled) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setTextAndFontsReady(true);
        });
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  useEffect(() => {
    if (!customPortfolioData.showAnimatedBackground) return;
    const t = window.setTimeout(() => setAuroraReady(true), 10_000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "show") return;
    if (
      !textAndFontsReady ||
      !auroraReady ||
      !priorityVid0 ||
      !priorityVid1
    ) {
      return;
    }
    setPhase("fade");
  }, [phase, textAndFontsReady, auroraReady, priorityVid0, priorityVid1]);

  useEffect(() => {
    if (phase !== "show") return;
    const t = window.setTimeout(() => setPhase("fade"), SPLASH_MAX_WAIT_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  const showSplash = phase !== "gone";

  return (
    <>
      <div className="min-h-screen">
        <PortfolioPage
          {...customPortfolioData}
          onAuroraFirstFrame={
            customPortfolioData.showAnimatedBackground
              ? handleAuroraFirstFrame
              : undefined
          }
        />
      </div>

      {showSplash ? (
        <>
          {PRIORITY_CAPABILITY_VIDEO_SRCS.map((src, index) => {
            const markReady = () =>
              index === 0 ? setPriorityVid0(true) : setPriorityVid1(true);
            return (
              <video
                key={src}
                className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
                aria-hidden
                src={src}
                preload="auto"
                muted
                playsInline
                onCanPlayThrough={markReady}
                onLoadedData={markReady}
                onError={markReady}
              />
            );
          })}
        </>
      ) : null}

      {showSplash ? (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading site"
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-white transition-opacity duration-200 ease-out motion-reduce:duration-100 ${
            phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.propertyName !== "opacity") return;
            setPhase((p) => {
              if (p === "fade") {
                try {
                  sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
                } catch {
                  /* private mode */
                }
                return "gone";
              }
              return p;
            });
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
