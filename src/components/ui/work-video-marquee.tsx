"use client";

import { animatedLoopVideos } from "@/data/work-content";
import { useState } from "react";

function LoopCard({
  src,
  label,
  matte,
  crop,
}: {
  src: string;
  label: string;
  matte?: "light" | "dark";
  crop?: "trimY";
}) {
  const [failed, setFailed] = useState(false);
  const cropClass = crop === "trimY" ? "scale-[1.08]" : "";

  if (failed) {
    return (
      <div className="group relative flex w-[min(100vw-3rem,22rem)] shrink-0 flex-col overflow-hidden rounded-2xl border border-dashed border-white/20 bg-gradient-to-br from-violet-950/80 to-zinc-950 shadow-[0_0_40px_-12px_rgba(139,92,246,0.25)]">
        <div className="relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 px-4 text-center">
          <span className="text-sm font-medium text-white/80">{label}</span>
          <span className="text-[11px] leading-snug text-white/45">
            Add your loop at{" "}
            <code className="rounded bg-white/10 px-1 py-0.5 text-[10px]">public{src}</code>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative w-[min(100vw-3rem,22rem)] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
        <video
          className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] ${cropClass}`}
          src={src}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          aria-label={label}
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}

export function WorkVideoMarquee() {
  if (animatedLoopVideos.length === 0) return null;

  const row1 = [...animatedLoopVideos, ...animatedLoopVideos];
  const reversed = [...animatedLoopVideos].reverse();
  const row2 = [...reversed, ...reversed];

  return (
    <div className="mx-auto max-w-[100vw] space-y-5 py-2">
      <div className="work-marquee-fade overflow-hidden">
        <div className="work-marquee-track">
          {row1.map((item, i) => (
            <LoopCard
              key={`r1-${item.id}-${i}`}
              src={item.src}
              label={item.label}
              matte={item.matte}
              crop={item.crop}
            />
          ))}
        </div>
      </div>
      <div className="work-marquee-fade overflow-hidden">
        <div className="work-marquee-track work-marquee-track-reverse">
          {row2.map((item, i) => (
            <LoopCard
              key={`r2-${item.id}-${i}`}
              src={item.src}
              label={item.label}
              matte={item.matte}
              crop={item.crop}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
