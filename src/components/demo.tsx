"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

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

const SPLASH_SEEN_KEY = "portfolio-splash-seen";

/** Short splash: hero fonts + brief aurora attempt, hard cap. */
const SPLASH_MIN_MS = 280;
const SPLASH_AURORA_GIVEUP_MS = 900;
const SPLASH_MAX_MS = 2400;

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
  const [progress, setProgress] = useState(0);

  const splashStartedAt = useRef<number | null>(null);
  const finishingRef = useRef(false);

  const handleAuroraFirstFrame = useCallback(() => {
    setAuroraReady(true);
  }, []);

  useLayoutEffect(() => {
    if (phase === "show") {
      splashStartedAt.current ??= performance.now();
    } else if (phase === "gone") {
      splashStartedAt.current = null;
      finishingRef.current = false;
    }
  }, [phase]);

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
    const t = window.setTimeout(() => setAuroraReady(true), SPLASH_AURORA_GIVEUP_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "show") return;

    const tick = () => {
      const start = splashStartedAt.current;
      if (start === null) return;
      if (finishingRef.current) {
        setProgress(100);
        return;
      }

      const elapsed = performance.now() - start;

      let target = 0;
      target += textAndFontsReady
        ? 44
        : Math.min(14, (elapsed / 400) * 14);
      target += auroraReady
        ? 36
        : Math.min(22, (elapsed / 700) * 22);
      target += Math.min(20, (elapsed / SPLASH_MAX_MS) * 20);
      target = Math.min(99, Math.round(target));
      setProgress((p) => (target > p ? target : p));

      const auroraOk = auroraReady || elapsed >= SPLASH_AURORA_GIVEUP_MS;
      const canFinish =
        textAndFontsReady && auroraOk && elapsed >= SPLASH_MIN_MS;
      const mustFinish = elapsed >= SPLASH_MAX_MS;

      if ((canFinish || mustFinish) && !finishingRef.current) {
        finishingRef.current = true;
        setProgress(100);
        window.setTimeout(() => setPhase("fade"), 120);
      }
    };

    const id = window.setInterval(tick, 48);
    tick();
    return () => window.clearInterval(id);
  }, [phase, textAndFontsReady, auroraReady]);

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
