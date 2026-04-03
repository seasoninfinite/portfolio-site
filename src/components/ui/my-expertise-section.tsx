"use client";

import { Skills } from "@/components/ui/skills-showcase";

export function MyExpertiseSection() {
  return (
    <section
      id="expertise"
      className="border-t border-white/10 bg-black px-6 py-16 md:py-20"
      aria-labelledby="expertise-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
          My expertise
        </p>
        <h2
          id="expertise-heading"
          className="mb-4 max-w-2xl text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          Where I&apos;m strongest
        </h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
          A quick look at how comfortable I am with the kinds of code you&apos;ll
          see broken down in more detail in the next section. Hover each row to
          see the bar fill in.
        </p>
        <div>
          <Skills showHeader={false} />
        </div>
      </div>
    </section>
  );
}
