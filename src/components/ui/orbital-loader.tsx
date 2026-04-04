"use client";

import React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const orbitalLoaderVariants = cva("flex gap-2 items-center justify-center", {
  variants: {
    messagePlacement: {
      bottom: "flex-col",
      top: "flex-col-reverse",
      right: "flex-row",
      left: "flex-row-reverse",
    },
  },
  defaultVariants: {
    messagePlacement: "bottom",
  },
});

export interface OrbitalLoaderProps {
  message?: string;
  /**
   * Position of the message relative to the spinner.
   * @default bottom
   */
  messagePlacement?: "top" | "bottom" | "left" | "right";
}

export function OrbitalLoader({
  className,
  message,
  messagePlacement,
  ...props
}: React.ComponentProps<"div"> & OrbitalLoaderProps) {
  return (
    <div className={cn(orbitalLoaderVariants({ messagePlacement }))}>
      <div className={cn("relative h-16 w-16", className)} {...props}>
        <div className="orbital-ring-cw absolute inset-0 rounded-full border-2 border-transparent border-t-foreground" />
        <div className="orbital-ring-ccw absolute inset-2 rounded-full border-2 border-transparent border-t-foreground" />
        <div className="orbital-ring-cw-fast absolute inset-4 rounded-full border-2 border-transparent border-t-foreground" />
      </div>
      {message ? (
        <div className="text-sm font-medium tracking-wide text-foreground/90">
          {message}
        </div>
      ) : null}
    </div>
  );
}
