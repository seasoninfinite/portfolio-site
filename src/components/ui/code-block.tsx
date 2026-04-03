"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { codeToHtml, type BundledLanguage, type BundledTheme } from "shiki";

export type CodeBlockProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "not-prose flex w-full flex-col overflow-hidden border",
        "rounded-xl border-border bg-card text-card-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type CodeBlockCodeProps = {
  code: string;
  /** Shiki language id (e.g. tsx, javascript, css) */
  language?: string;
  /** Bundled Shiki theme name */
  theme?: string;
  className?: string;
} & Omit<React.HTMLProps<HTMLDivElement>, "children">;

function CodeBlockCode({
  code,
  language = "tsx",
  theme = "github-dark",
  className,
  ...props
}: CodeBlockCodeProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      if (!code) {
        if (!cancelled) setHighlightedHtml("<pre><code></code></pre>");
        return;
      }

      try {
        const html = await codeToHtml(code, {
          lang: language as BundledLanguage,
          theme: theme as BundledTheme,
        });
        if (!cancelled) setHighlightedHtml(html);
      } catch {
        if (!cancelled)
          setHighlightedHtml(
            `<pre class="shiki-fallback"><code>${escapeHtml(code)}</code></pre>`
          );
      }
    }

    void highlight();
    return () => {
      cancelled = true;
    };
  }, [code, language, theme]);

  const classNames = cn(
    "w-full overflow-x-auto text-[12px] leading-relaxed [&_pre]:m-0 [&_pre]:!bg-transparent [&_pre]:p-3 [&_pre]:text-[12px]",
    className
  );

  if (highlightedHtml) {
    return (
      <div
        className={classNames}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        {...props}
      />
    );
  }

  return (
    <div className={classNames} {...props}>
      <pre className="p-3">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>;

function CodeBlockGroup({
  children,
  className,
  ...props
}: CodeBlockGroupProps) {
  return (
    <div
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { CodeBlockGroup, CodeBlockCode, CodeBlock };
