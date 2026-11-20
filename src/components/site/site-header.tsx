"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ArrowRight, ArrowUpRight, Close, Menu } from "@/components/site/icons";
import { NAV, SITE } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState(72);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes (adjusting state during render, per React docs).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close on Escape; lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header ref={headerRef} className={`site-header${scrolled || open ? " is-scrolled" : ""}`}>
      <div className="wrap site-header__bar">
        <Link href="/" className="brand" aria-label={`${SITE.name}, home`}>
          <span className="brand__mark" aria-hidden>
            BGG
          </span>
          <span>
            BGG <span className="brand__sub">Website Design</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn btn--accent btn--sm header-cta">
          Get a free quote <ArrowUpRight />
        </Link>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => {
            // The offer bar above the header can push it down: open the panel right under the header.
            setMenuTop(Math.round(headerRef.current?.getBoundingClientRect().bottom ?? 72));
            setOpen((o) => !o);
          }}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>
    </header>

      {/* Outside the header: its backdrop-filter would otherwise trap this fixed panel. */}
      {open ? (
        <div id="mobile-menu" className="mobile-menu" style={{ top: menuTop }}>
          <nav aria-label="Mobile">
            <Link href="/" className="mobile-menu__link" aria-current={pathname === "/" ? "page" : undefined}>
              Home <ArrowRight className="size-6" />
            </Link>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-menu__link"
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label} <ArrowRight className="size-6" />
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__foot">
            <Link href="/contact" className="btn btn--accent btn--block">
              Get a free quote <ArrowUpRight />
            </Link>
            <a href={`mailto:${SITE.email}`} className="btn btn--ghost btn--block">
              {SITE.email}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
