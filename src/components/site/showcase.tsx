"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Devices } from "@/components/site/devices";
import { ArrowUpRight } from "@/components/site/icons";
import type { Project } from "@/data/projects";

/**
 * Hero showcase: the colour tile behind the devices shifts to each client's brand colour
 * as it cycles through real work. Pauses on hover/focus, off-screen and for reduced motion.
 */
export function Showcase({ projects }: { projects: Project[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const ref = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    // Load the other slides' images once the page is idle, so the first one wins LCP.
    const t = window.setTimeout(() => setMounted(new Set(projects.map((_, n) => n))), 1800);
    return () => window.clearTimeout(t);
  }, [projects]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % projects.length), 5200);
    return () => window.clearInterval(t);
  }, [paused, onScreen, projects.length]);

  const p = projects[i];

  return (
    <div
      ref={ref}
      className={`stage${p.tileDark ? "" : " is-light"}`}
      style={{ background: p.tile }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Recent websites"
    >
      <div className="stage__inner">
        <div className="stage__slides">
          {projects.map((proj, n) => (
            <div
              key={proj.slug}
              className={`stage__slide${n === i ? " is-active" : ""}`}
              aria-hidden={n !== i}
              aria-roledescription="slide"
              aria-label={`${n + 1} of ${projects.length}: ${proj.name}`}
            >
              {mounted.has(n) ? <Devices slug={proj.slug} name={proj.name} priority={n === 0} sizes="(min-width: 1240px) 1160px, 100vw" /> : <div className="devices" />}
            </div>
          ))}
        </div>
      </div>
      <div className="stage__caption">
        <div>
          <strong>{p.name}</strong>{" "}
          <span>· {p.sector}</span>
        </div>
        <div className="stage__nav">
          <div className="stage__dots" role="group" aria-label="Choose a project">
            {projects.map((proj, n) => (
              <button
                key={proj.slug}
                type="button"
                aria-label={`Show ${proj.name}`}
                aria-current={n === i}
                onClick={() => setI(n)}
              >
                <span />
              </button>
            ))}
          </div>
          <Link
            href={`/work/${p.slug}`}
            className="text-link"
            style={{ color: "inherit", textDecorationColor: "currentColor" }}
          >
            View project <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
