import type { Metadata } from "next";
import { Skills } from "@/components/ui/skills-showcase";
import { Navbar } from "@/components/ui/mini-navbar";
import { FooterEmailComposer } from "@/components/ui/footer-email-composer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "My Expertise - BGG Website Design",
  description: "Where I'm strongest - A quick look at my technical skills and expertise in web development.",
};

const expertiseNavLinks = [
  { label: "Home", href: "/" },
  { label: "Expertise", href: "/expertise" },
  { label: "How Websites Work", href: "/how-websites-work" },
  { label: "Work", href: "/#sites" },
  { label: "Contact", href: "/#contact" },
];

export default function ExpertisePage() {
  return (
    <div className="bg-background text-foreground geist-font min-h-screen flex flex-col">
      <Navbar links={expertiseNavLinks} />
      
      <main className="relative flex min-h-0 flex-1 flex-col">
        <section
          id="expertise"
          className="border-t border-white/10 bg-black px-6 py-16 md:py-20"
          aria-labelledby="expertise-heading"
        >
          <div className="mx-auto max-w-6xl">
            <a
              href="/"
              className="inline-flex items-center gap-2 mb-8 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </a>
            
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
      </main>

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
                <a className="hover:text-white" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/expertise">
                  Expertise
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/how-websites-work">
                  How Websites Work
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/#pricing">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/#sites">
                  Work
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/#contact">
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
    </div>
  );
}