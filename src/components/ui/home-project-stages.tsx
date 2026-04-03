"use client";

import { OnboardingStages } from "@/components/ui/onboarding-stages";

export function HomeProjectStages() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="process"
      className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-8 pt-2 md:px-6 md:pb-14 md:pt-6"
      aria-labelledby="process-heading"
    >
      <header className="mb-8 w-full max-w-2xl md:mb-12">
        <p className="mb-4 inline-flex rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/65">
          How it works
        </p>
        <h2
          id="process-heading"
          className="text-balance font-[family-name:var(--font-display)] text-[1.65rem] font-normal leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.65rem]"
        >
          From your first answers to a site on your domain.
        </h2>
        <p className="inter-font mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
          Here&apos;s the usual order of things when you hire me for a website, in
          plain English. Tap through each step.
        </p>
      </header>

      <OnboardingStages
        theme="dark"
        className="mx-auto w-full max-w-md sm:max-w-lg"
        contentAlign="center"
        title="PROJECT STEPS"
        percentage={100}
        buttonText="See more below"
        onButtonClick={scrollToWork}
        animationDuration={1600}
        staggerDelay={0.1}
        rounded="xl"
        variant="default"
        stage1Title="First draft"
        stage2Title="Content, polish, launch"
        revealMode="step"
        nextStepLabel="Next step"
      />
    </section>
  );
}
