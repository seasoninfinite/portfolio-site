"use client";

import React from "react";
import dynamic from "next/dynamic";

import { Navbar } from "@/components/ui/mini-navbar";

const AuroraBackgroundLazy = dynamic(
  () =>
    import("@/components/ui/aurora-background").then((m) => ({
      default: m.AuroraBackground,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(91,33,182,0.35),rgba(9,9,11,0.92),#000)]"
        aria-hidden
      />
    ),
  }
);

const PortfolioBelowFold = dynamic(
  () =>
    import("@/components/ui/portfolio-below-fold").then((m) => ({
      default: m.PortfolioBelowFold,
    })),
  {
    loading: () => (
      <div
        className="relative z-10 min-h-[50vh] bg-black"
        aria-busy
        aria-label="Loading page sections"
      />
    ),
  }
);

// --- TYPE DEFINITIONS FOR PROPS ---
interface NavLink {
  label: string;
  href: string;
}
interface Project {
  title: string;
  description: string;
  tags: string[];
  imageContent?: React.ReactNode;
}
interface Stat {
  value: string;
  label: string;
}

export interface PortfolioPageProps {
  navLinks?: NavLink[];
  hero?: {
    titleLine1: React.ReactNode;
    titleLine2Gradient: React.ReactNode;
    subtitle: React.ReactNode;
  };
  ctaButtons?: {
    primary: { label: string; onClick?: () => void };
    secondary: { label: string; onClick?: () => void };
  };
  projects?: Project[];
  stats?: Stat[];
  showAnimatedBackground?: boolean;
}

const defaultData = {
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
};

// --- MAIN CUSTOMIZABLE PORTFOLIO COMPONENT ---
const PortfolioPage: React.FC<PortfolioPageProps> = ({
  navLinks = defaultData.navLinks,
  hero = defaultData.hero,
  ctaButtons,
  projects = [],
  stats = [],
  showAnimatedBackground = true,
}) => {
  const showCtas =
    ctaButtons?.primary?.label || ctaButtons?.secondary?.label;
  const showProjects = projects.length > 0;
  const showStats = stats.length > 0;

  return (
    <div
      id="top"
      className="bg-background text-foreground geist-font min-h-screen flex flex-col"
    >
      {showAnimatedBackground ? <AuroraBackgroundLazy /> : null}
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar links={navLinks} />

        <div className="relative flex min-h-0 flex-1 flex-col">
          <main
            id="about"
            className="relative flex min-h-[100dvh] w-full flex-col px-6 pb-16 pt-24 md:pb-20 md:pt-28"
          >
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center">
              <div className="w-full text-center">
                <div className="float-animation mb-8 flex flex-col items-center pt-4 md:mb-10 md:pt-8">
                  <h1 className="mb-4 text-5xl font-light leading-[1.1] tracking-tight text-foreground geist-font md:text-6xl lg:text-7xl">
                    {hero.titleLine1}
                    <span className="gradient-text block tracking-tight">
                      {hero.titleLine2Gradient}
                    </span>
                  </h1>
                  <p className="inter-font mx-auto max-w-3xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
                    {hero.subtitle}
                  </p>
                </div>
              {showCtas ? (
                <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  {ctaButtons?.primary?.label ? (
                    <button
                      type="button"
                      onClick={ctaButtons.primary.onClick}
                      className="primary-button min-w-[160px] rounded-lg px-6 py-3 text-sm font-medium text-primary-foreground"
                    >
                      {ctaButtons.primary.label}
                    </button>
                  ) : null}
                  {ctaButtons?.secondary?.label ? (
                    <button
                      type="button"
                      onClick={ctaButtons.secondary.onClick}
                      className="glass-button inter-font min-w-[160px] rounded-lg px-6 py-3 text-sm font-medium text-foreground"
                    >
                      {ctaButtons.secondary.label}
                    </button>
                  ) : null}
                </div>
              ) : null}
              {showProjects || showStats ? (
                <div className="divider mb-16" />
              ) : null}
              {showProjects ? (
                <div
                  id="projects"
                  className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="glass-card rounded-2xl p-6 text-left"
                    >
                      <div className="project-image mb-4 flex h-32 items-center justify-center rounded-xl">
                        {project.imageContent}
                      </div>
                      <h3 className="mb-2 text-lg font-medium text-card-foreground geist-font">
                        {project.title}
                      </h3>
                      <p className="inter-font mb-4 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="skill-badge rounded px-2 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              {showStats ? (
                <>
                  <div className="divider mb-16" />
                  <div
                    id="skills"
                    className="flex flex-col items-center justify-center gap-8 text-center sm:flex-row"
                  >
                    {stats.map((stat, index) => (
                      <React.Fragment key={stat.label}>
                        <div>
                          <div className="mb-1 text-3xl font-light tracking-tight text-foreground geist-font md:text-4xl">
                            {stat.value}
                          </div>
                          <div className="inter-font text-sm font-normal text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                        {index < stats.length - 1 ? (
                          <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-input to-transparent sm:block" />
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[min(28vh,14rem)] min-h-[120px] bg-gradient-to-b from-transparent via-black/50 to-black md:h-[min(36vh,18rem)] md:via-black/60"
              aria-hidden
            />
          </main>

          <PortfolioBelowFold />
        </div>
      </div>
    </div>
  );
};

export { PortfolioPage };
