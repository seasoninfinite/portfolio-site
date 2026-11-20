"use client";

import { useState } from "react";

import { SITE } from "@/lib/site";

/** Footer quick-contact: opens the visitor's email app with a draft addressed to BGG. */
export function FooterEmailComposer() {
  const [email, setEmail] = useState("");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const replyTo = email.trim();
    if (!replyTo) return;
    const subject = encodeURIComponent("Website enquiry");
    const body = encodeURIComponent(`Hi Ben,\n\nI'd like to talk about a website. Please reply to: ${replyTo}\n\n`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };
  return (
    <form className="footer-mail" onSubmit={send}>
      <label htmlFor="footer-email" className="sr-only">
        Your email
      </label>
      <input
        id="footer-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn btn--accent btn--sm" aria-label="Open an email to BGG Website Design">
        Send
      </button>
    </form>
  );
}
