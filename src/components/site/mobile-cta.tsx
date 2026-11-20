"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Phone-only bar that slides up after the first screen, so the next step is always one tap away. */
export function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setVisible(window.scrollY > window.innerHeight * 0.8 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/contact")) return null;

  return (
    <div className={`mobile-cta on-dark${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <Link href="/pricing" className="btn btn--ghost" tabIndex={visible ? 0 : -1}>
        See prices
      </Link>
      <Link href="/contact" className="btn btn--accent" tabIndex={visible ? 0 : -1}>
        Free quote
      </Link>
    </div>
  );
}
