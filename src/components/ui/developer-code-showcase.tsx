"use client";

import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

function CodeSectionSkipFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById("code");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setShow(entry.isIntersecting && entry.intersectionRatio > 0.08);
      },
      { threshold: [0, 0.08, 0.2] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-[38] sm:bottom-8 sm:right-6">
      <button
        type="button"
        className="pointer-events-auto rounded-full border border-white/20 bg-zinc-950/92 px-4 py-2.5 text-sm font-medium text-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-white/40 hover:bg-zinc-900/95"
        onClick={() => {
          document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", "#pricing");
        }}
      >
        Skip the code bit?
      </button>
    </div>
  );
}

type LangSample = {
  badge: string;
  filename: string;
  language: string;
  code: string;
};

type LangBlock = {
  title: string;
  paragraphs: string[];
  sample: LangSample;
};

const languageBlocks: LangBlock[] = [
  {
    title: "HTML",
    paragraphs: [
      "This is the one basically every website uses. It’s not a “programming” language in the same way as the others. It’s more like the skeleton.",
      "You use tags like <h1> for a heading and <p> for a paragraph. The browser reads it top to bottom and builds the page structure. If HTML is messy, the whole site feels messy no matter how nice your colours are.",
    ],
    sample: {
      badge: "HTML",
      filename: "index.html",
      language: "html",
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My website</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is a normal paragraph.</p>
    <a href="/contact">Contact</a>
  </body>
</html>`,
    },
  },
  {
    title: "CSS",
    paragraphs: [
      "CSS is what makes the HTML actually look like something. Colours, fonts, spacing, layouts, how it looks on a phone vs a laptop: all of that.",
      "You can write it in a separate file (like styles.css) or sometimes next to components in bigger projects. Without CSS you’d just have black text on a white background.",
    ],
    sample: {
      badge: "CSS",
      filename: "styles.css",
      language: "css",
      code: `body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  margin: 0;
  background: #0f0f0f;
  color: #f5f5f5;
}

h1 {
  font-size: 2rem;
  letter-spacing: -0.02em;
}

a {
  color: #7dd3fc;
}`,
    },
  },
  {
    title: "JavaScript",
    paragraphs: [
      "JavaScript runs in the browser and handles the interactive stuff: menus opening, buttons doing something, checking a form before it sends, that kind of thing.",
      "Almost every modern site uses it somewhere. It can look noisy at first but you learn it in small pieces, same as anything else.",
    ],
    sample: {
      badge: "JavaScript",
      filename: "menu.js",
      language: "javascript",
      code: `const btn = document.querySelector("#menu-btn");
const panel = document.querySelector("#menu-panel");

btn.addEventListener("click", () => {
  const open = panel.classList.toggle("is-open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
});`,
    },
  },
  {
    title: "TypeScript",
    paragraphs: [
      "TypeScript is JavaScript with types added on. You still end up with normal JavaScript in the browser, but while you’re writing it the editor can catch mistakes earlier.",
      "A lot of newer sites (including ones built with React or Next.js) use TypeScript so things don’t break when the project gets bigger.",
    ],
    sample: {
      badge: "TypeScript",
      filename: "types.ts",
      language: "typescript",
      code: `type Link = { label: string; href: string };

const nav: Link[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
];

function isExternal(href: string): boolean {
  return href.startsWith("http");
}`,
    },
  },
];

function MiniCodeCard({ sample }: { sample: LangSample }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(sample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CodeBlock className="h-full shadow-sm">
      <CodeBlockGroup className="border-b border-border px-3 py-1.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            {sample.badge}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {sample.filename}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="h-7 w-7 shrink-0"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </CodeBlockGroup>
      <CodeBlockCode code={sample.code} language={sample.language} />
    </CodeBlock>
  );
}

export function DeveloperCodeShowcase() {
  return (
    <section
      id="code"
      className="relative border-t border-white/5 bg-black px-4 py-16 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl space-y-4 md:mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            For clients who want to know how websites really work
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            What websites are actually made of
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Before we get into examples: a normal website is usually a mix of a
            few languages that each do a different job. If you&apos;ve never
            seen code it can look a bit scary, but it&apos;s not magic. It&apos;s
            just rules and patterns, kind of like learning French or Italian
            except with more brackets and semicolons.
          </p>
          <p className="text-sm font-medium text-foreground/90 md:text-base">
            Here are the different programming languages I specialise in.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {languageBlocks.map((block) => (
            <article
              key={block.title}
              className="grid gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-2 md:items-stretch md:gap-10 md:p-8"
            >
              <div className="flex flex-col justify-center space-y-3">
                <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {block.title}
                </h3>
                {block.paragraphs.map((p, i) => (
                  <p
                    key={`${block.title}-${i}`}
                    className="text-sm leading-relaxed text-muted-foreground md:text-[15px]"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="min-w-0 md:border-l md:border-white/10 md:pl-8">
                <MiniCodeCard sample={block.sample} />
              </div>
            </article>
          ))}
        </div>
      </div>
      <CodeSectionSkipFab />
    </section>
  );
}
