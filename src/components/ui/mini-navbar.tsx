"use client";

import { Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export type NavbarLinkItem = { label: string; href: string };

const defaultLinks: NavbarLinkItem[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#my-story" },
  { label: "Code", href: "#code" },
  { label: "Services", href: "#pricing" },
  { label: "Work", href: "#sites" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const hoverHints: Record<string, string> = {
  Home: "Back to the top",
  About: "My story and what I do",
  Code: "What is your website going to be made of?",
  Work: "Examples of websites I have built",
  Testimonials: "What people say",
  Services: "Packages and pricing",
  Contact: "Lets start building your site today",
};

function DotMark() {
  return (
    <a
      href="#top"
      aria-label="BGG Website Design — Back to top"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold leading-none tracking-normal text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
    >
      BGG
    </a>
  );
}

function AnimatedNavLink({
  href,
  children,
  onHover,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onHover?: (label: string | null) => void;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const label = String(children);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => onHover?.(label)}
      onMouseLeave={() => onHover?.(null)}
      className="group relative inline-flex shrink-0 text-sm font-medium text-gray-200"
    >
      <span className="relative block h-5 overflow-hidden">
        <span className="flex flex-col transition-transform duration-[400ms] ease-out group-hover:-translate-y-1/2">
          <span className="flex h-5 shrink-0 items-center leading-none text-gray-300">
            {children}
          </span>
          <span className="flex h-5 shrink-0 items-center leading-none text-white">
            {children}
          </span>
        </span>
      </span>
    </a>
  );
}

export type NavbarProps = {
  links?: NavbarLinkItem[];
};

export function Navbar({ links = defaultLinks }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const [hovered, setHovered] = useState<string | null>(null);
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    if (isOpen) {
      setHeaderShapeClass("rounded-xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 300);
    }
    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false
  ) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }
    if (closeMenu) setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-1/2 z-20 w-[calc(100%-1.25rem)] max-w-none -translate-x-1/2 transform border border-[#333] bg-[#1a1a1a]/92 py-2 pl-3 pr-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] backdrop-blur-md transition-[border-radius] duration-0 ease-in-out sm:w-max sm:px-4 ${headerShapeClass} top-[max(0.75rem,env(safe-area-inset-top,0px))] sm:top-[max(1rem,env(safe-area-inset-top,0px))]`}
      >
        <nav className="hidden items-center gap-3 sm:flex sm:gap-4 md:gap-5">
          <DotMark />
          {links.map((link) => (
            <AnimatedNavLink
              key={`${link.label}-${link.href}`}
              href={link.href}
              onHover={setHovered}
              onClick={(event) => handleNavClick(event, link.href)}
            >
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-3 sm:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <DotMark />
            <AnimatedNavLink
              href={links[0]?.href ?? "#top"}
              onClick={(event) => handleNavClick(event, links[0]?.href ?? "#top")}
            >
              {links[0]?.label ?? "Home"}
            </AnimatedNavLink>
          </div>
          <button
            type="button"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
            isOpen ? "max-h-96 pt-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 border-t border-white/10 pt-3 text-center text-sm">
            {links.slice(1).map((link) => (
              <a
                key={`${link.label}-${link.href}-m`}
                href={link.href}
                className="text-gray-300 hover:text-white"
                onClick={(event) => handleNavClick(event, link.href, true)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {hovered ? (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-[45] hidden -translate-x-1/2 rounded-full border border-white/15 bg-black/75 px-4 py-2 text-[11px] text-gray-300 shadow-lg backdrop-blur sm:block">
          {hoverHints[hovered] ?? ""}
        </div>
      ) : null}
    </>
  );
}
