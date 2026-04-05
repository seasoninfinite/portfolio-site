"use client";

import { CapabilitiesStorySection } from "@/components/ui/capabilities-story-section";
import { DeveloperCodeShowcase } from "@/components/ui/developer-code-showcase";
import { GlassmorphismPortfolioBlock } from "@/components/ui/glassmorphism-portfolio-block-shadcnui";
import { HomeProjectStages } from "@/components/ui/home-project-stages";
import { MyExpertiseSection } from "@/components/ui/my-expertise-section";
import { PortfolioClientsBlock } from "@/components/ui/testimonial-card";
import { PortfolioPricingSection } from "@/components/ui/portfolio-pricing-section";
import { WorkSitesSection } from "@/components/ui/work-sites-section";
import { ContactPaymentSection } from "@/components/ui/contact-payment-section";
import { FooterEmailComposer } from "@/components/ui/footer-email-composer";

export function PortfolioBelowFold() {
  return (
    <>
      <section
        id="capabilities"
        className="relative z-10 bg-black text-white"
        aria-labelledby="capabilities-heading"
      >
        <CapabilitiesStorySection />
      </section>

      <div
        id="work"
        className="relative z-10 bg-black pb-12 pt-6 md:pb-16 md:pt-10"
      >
        <GlassmorphismPortfolioBlock />
        <MyExpertiseSection />
        <DeveloperCodeShowcase />
        <PortfolioPricingSection />
        <WorkSitesSection />
        <PortfolioClientsBlock />
        <HomeProjectStages />
        <ContactPaymentSection />
      </div>

      <footer className="relative z-10 border-t border-white/10 bg-black px-6 py-10 text-sm text-white/60">
        <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-3">
          <div>
            <p className="text-base font-semibold text-white">BGG Website Design</p>
            <p className="mt-4">
              <a
                className="font-medium text-white/80 underline underline-offset-4 transition hover:text-white"
                href="mailto:bggwebsitedesign@gmail.com"
              >
                bggwebsitedesign@gmail.com
              </a>
            </p>
            <FooterEmailComposer />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              Pages
            </p>
            <ul className="mt-4 grid gap-2">
              <li>
                <a className="hover:text-white" href="#top">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#my-story">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#capabilities">
                  Capabilities
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#code">
                  Code
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#sites">
                  Work
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#testimonials">
                  Testimonials
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              Policies
            </p>
            <ul className="mt-4 grid gap-2">
              <li>
                <a
                  className="hover:text-white"
                  href="https://1drv.ms/b/c/b7227f61a4ced3d4/IQDRGY0SW_bCRIAvsTa2NkqVAbTqaLe-HUi9bsYgeLLfe3A?e=3KN0Ze"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms & conditions (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center">
          <p>© {new Date().getFullYear()} BGG Studio. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
