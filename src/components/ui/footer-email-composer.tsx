"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function FooterEmailComposer() {
  const [email, setEmail] = useState("");

  const openInMailApp = () => {
    const replyTo = email.trim();
    if (!replyTo) return;
    const subject = encodeURIComponent("Website enquiry");
    const body = encodeURIComponent(
      `Hi,\n\nPlease reply to: ${replyTo}\n\n`
    );
    window.location.href = `mailto:bggwebsitedesign@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="mt-4 flex max-w-md flex-wrap items-stretch gap-2">
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-violet-400/60"
      />
      <button
        type="button"
        onClick={openInMailApp}
        disabled={!email.trim()}
        aria-label="Open your email app with a draft to BGG Website Design"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.08] px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send className="size-4" aria-hidden />
        Send
      </button>
    </div>
  );
}
