"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowRight, ArrowUpRight } from "@/components/site/icons";

type Step = { who: "You" | "Me" | "Together"; text: string };

const stages: { title: string; steps: Step[] }[] = [
  {
    title: "Stage 1 · Your first draft",
    steps: [
      { who: "You", text: "Fill in my short project form: what you do, the pages you need and the style you like. Ten minutes, tops." },
      { who: "Me", text: "I design and build the first version of your site: layout, look and feel, with placeholder words where we don't have yours yet." },
      { who: "Me", text: "You get a private preview link to click through on your own phone and laptop, and note anything you'd like changed." },
    ],
  },
  {
    title: "Stage 2 · Content, polish, launch",
    steps: [
      { who: "You", text: "Send me your real content: about you, your services, photos and logo. Stuck for words? I'll help you write them." },
      { who: "Me", text: "I drop it all in, polish every detail and send back an updated build that's ready to sell." },
      { who: "Together", text: "We fine-tune it together until you love it. Your package includes rounds of changes, so nothing is left 'nearly right'." },
      { who: "Me", text: "Launch day: I connect your domain, switch on Google tracking and your site goes live for the world to see." },
    ],
  },
];

const all = stages.flatMap((s, si) => s.steps.map((st, i) => ({ ...st, stage: si, n: si === 0 ? i + 1 : stages[0].steps.length + i + 1 })));

export function ProjectSteps() {
  const [shown, setShown] = useState(1);
  const done = shown >= all.length;

  return (
    <div className="steps__panel on-dark" aria-live="polite">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <p className="eyebrow" style={{ color: "var(--on-night-muted)" }}>
          Your project
        </p>
        <span style={{ fontFamily: "var(--font-code)", fontSize: 14 }}>
          Step {Math.min(shown, all.length)} of {all.length}
        </span>
      </div>
      <div className="steps__progress" aria-hidden>
        <span style={{ width: `${(shown / all.length) * 100}%` }} />
      </div>

      {stages.map((stage, si) => {
        const items = all.filter((s) => s.stage === si && s.n <= shown);
        if (!items.length) return null;
        return (
          <div key={stage.title}>
            <p className="steps__stage">{stage.title}</p>
            <ol className="steps__list">
              {items.map((s) => (
                <li
                  key={s.n}
                  className={`step${s.n < shown || done ? " is-done" : ""}${s.n === shown && !done ? " is-current" : ""}`}
                >
                  <span className="step__num">{String(s.n).padStart(2, "0")}</span>
                  <div>
                    <span className="step__who">{s.who}</span>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        );
      })}

      <div className="steps__actions">
        {!done ? (
          <>
            <button type="button" className="btn btn--accent" onClick={() => setShown((n) => n + 1)}>
              Next step <ArrowRight />
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setShown(all.length)}>
              Show all steps
            </button>
          </>
        ) : (
          <>
            <Link href="/contact" className="btn btn--accent">
              Start step one <ArrowUpRight />
            </Link>
            <button type="button" className="btn btn--ghost" onClick={() => setShown(1)}>
              Start again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
