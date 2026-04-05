"use client";

import { WorkStaticGallery } from "@/components/ui/work-static-gallery";
import { WorkVideoMarquee } from "@/components/ui/work-video-marquee";

export function WorkSitesSection() {
  return (
    <section
      id="sites"
      className="border-t border-white/10 bg-black px-6 py-16 md:py-20"
      aria-labelledby="sites-heading"
    >
      <div className="mx-auto max-w-7xl overflow-x-hidden">
        <header className="mb-6 text-center md:mb-10">
          <h2
            id="sites-heading"
            className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            My work
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/55 md:text-base">
            Here are examples of a few animated, stunning sites I&apos;ve made.
          </p>
        </header>

        <div className="relative -mx-6 mt-2 overflow-x-hidden px-0 sm:mx-0 md:mt-4">
          <WorkVideoMarquee />
        </div>

        <p className="mx-auto mt-12 max-w-2xl px-1 text-center text-sm text-white/60 md:mt-16 md:text-base">
          Below are static shots of live builds.{" "}
          <span className="text-white/85">Click a card</span> when a live link is
          available to open the site in a new tab.
        </p>

        <WorkStaticGallery />
      </div>
    </section>
  );
}
