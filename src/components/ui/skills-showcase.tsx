"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "HTML", level: 92 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 86 },
  { name: "TypeScript", level: 80 },
  { name: "React / Next.js", level: 84 },
];

export function Skills({ showHeader = true }: { showHeader?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full max-w-md flex-col">
      {showHeader ? (
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px w-12 bg-foreground/20 dark:bg-foreground/10" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Expertise
          </span>
        </div>
      ) : null}

      <div className="flex flex-col gap-1">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={cn(
                "relative -mx-4 flex cursor-pointer items-center justify-between rounded-lg px-4 py-5",
                "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                hoveredIndex === index
                  ? "bg-foreground/[0.03] dark:bg-foreground/[0.05]"
                  : "bg-transparent"
              )}
            >
              <div className="relative flex items-center gap-4">
                <div
                  className={cn(
                    "h-5 w-0.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    hoveredIndex === index
                      ? "scale-y-100 bg-red-500 opacity-100"
                      : "scale-y-50 bg-border opacity-0"
                  )}
                />

                <span
                  className={cn(
                    "text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    hoveredIndex === index
                      ? "translate-x-0 text-foreground"
                      : "-translate-x-5 text-muted-foreground"
                  )}
                >
                  {skill.name}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative h-1 w-24 overflow-hidden rounded-full bg-border/50 dark:bg-border/30">
                  <div className="absolute inset-0 bg-muted/50 dark:bg-muted/20" />
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "bg-gradient-to-r from-red-500/90 to-red-600"
                    )}
                    style={{
                      width: hoveredIndex === index ? `${skill.level}%` : "0%",
                      transitionDelay: hoveredIndex === index ? "100ms" : "0ms",
                    }}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent",
                      "transition-transform duration-700 ease-out",
                      hoveredIndex === index
                        ? "translate-x-full"
                        : "-translate-x-full"
                    )}
                    style={{
                      transitionDelay: hoveredIndex === index ? "300ms" : "0ms",
                    }}
                  />
                </div>

                <div className="relative w-10 overflow-hidden">
                  <span
                    className={cn(
                      "block text-right text-sm font-mono tabular-nums",
                      "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      hoveredIndex === index
                        ? "translate-y-0 text-foreground opacity-100 blur-0"
                        : "translate-y-3 text-muted-foreground/40 opacity-0 blur-sm"
                    )}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>

            {index < skills.length - 1 ? (
              <div
                className={cn(
                  "mx-4 h-px transition-all duration-500",
                  hoveredIndex === index || hoveredIndex === index + 1
                    ? "bg-transparent"
                    : "bg-border/30 dark:bg-border/20"
                )}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-3 border-t border-border/30 pt-6 dark:border-border/20">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500/70" />
        <p className="text-[11px] tracking-wide text-muted-foreground">
          Hover to explore
        </p>
      </div>
    </div>
  );
}
