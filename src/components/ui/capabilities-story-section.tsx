"use client";

import type { ReactNode } from "react";
import { PRIORITY_CAPABILITY_VIDEO_SRCS } from "@/data/priority-videos";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function GhostCta({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={href}
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-xl border border-white/35 bg-transparent px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/55 hover:bg-white/[0.04]"
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}

function CapabilitySiteVideo({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const [shouldLoad, setShouldLoad] = useState(true);
  const rootRef = useRef<HTMLElement>(null);

  return (
    <figure
      ref={rootRef}
      className="relative m-0 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/[0.12] bg-zinc-950 shadow-[0_0_100px_-30px_rgba(120,140,255,0.35)]"
      aria-label={label}
    >
      {shouldLoad ? (
        <video
          className="h-full w-full object-cover"
          src={src}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          loading="lazy"
          aria-label={label}
        />
      ) : (
        <div className="h-full w-full bg-zinc-900/90" aria-hidden />
      )}
    </figure>
  );
}

export function CapabilitiesStorySection() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <header className="mb-16 text-center md:mb-24">
        <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
          Capabilities
        </p>
        <h2
          id="capabilities-heading"
          className="text-balance px-2 font-[family-name:var(--font-display)] text-[clamp(1.65rem,3.8vw,2.65rem)] font-normal italic leading-[1.15] tracking-tight text-white"
        >
          Motion, polish, and detail that still feels fast and readable.
        </h2>
      </header>

      <div className="flex flex-col gap-20 md:gap-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="order-2 md:order-1">
            <p className="inter-font mb-6 text-[15px] leading-relaxed text-white/65 md:text-base">
              This one is heavy on motion and gradient backgrounds. Sections fade
              and slide in as you scroll, and the hero feels alive without being
              messy. If you want something that feels premium and modern, this is
              the kind of direction I can take.
            </p>
            <GhostCta href="#sites">See more</GhostCta>
          </div>
          <div className="order-1 md:order-2">
            <CapabilitySiteVideo
              src={PRIORITY_CAPABILITY_VIDEO_SRCS[0]}
              label="Animated site preview: Logoipsum"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="order-1">
            <CapabilitySiteVideo
              src={PRIORITY_CAPABILITY_VIDEO_SRCS[1]}
              label="Animated site preview: Logoipsum build two"
            />
          </div>
          <div className="order-2">
            <h3 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-normal italic leading-snug text-white md:text-3xl">
              Another version of my work.
            </h3>
            <p className="inter-font mb-8 text-[15px] leading-relaxed text-white/65 md:text-base">
              Same attention to detail, different vibe: bolder colour, stronger
              contrast, and animation that shows up in the small interactions
              (hovers, buttons, little transitions). I treat each project like its
              own brand, not a copy paste template.
            </p>
            <GhostCta href="#sites">See more</GhostCta>
          </div>
        </div>
      </div>
    </div>
  );
}
