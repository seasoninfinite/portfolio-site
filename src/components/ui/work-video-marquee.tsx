"use client";

import { animatedLoopVideos } from "@/data/work-content";
import { useEffect, useMemo, useRef, useState } from "react";

type LoopItem = (typeof animatedLoopVideos)[number];

function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function LoopCard({
  src,
  label,
  crop,
  stillImageSrc,
}: {
  src: string;
  label: string;
  matte?: "light" | "dark";
  crop?: "trimY";
  stillImageSrc: string;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoBroken, setVideoBroken] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [stillBroken, setStillBroken] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cropClass = crop === "trimY" ? "scale-[1.08]" : "";

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin: "120px 0px", threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const showVideoLayer = shouldLoad && !videoBroken;
  const markVideoReady = () => setVideoReady(true);

  if (stillBroken) {
    return (
      <div className="group relative flex w-[min(17.5rem,calc(100vw-2rem))] max-w-[22rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-violet-950/90 to-zinc-950 shadow-[0_0_40px_-12px_rgba(139,92,246,0.25)]">
        <div className="relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-1 px-3 text-center">
          <span className="text-sm font-medium text-white/90">{label}</span>
          <span className="text-[11px] text-white/45">Preview unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="group relative w-[min(17.5rem,calc(100vw-2rem))] max-w-[22rem] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
        {showVideoLayer ? (
          <video
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out group-hover:scale-[1.02] ${cropClass} ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            src={src}
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            aria-label={label}
            onLoadedData={markVideoReady}
            onPlaying={markVideoReady}
            onError={() => setVideoBroken(true)}
          />
        ) : null}
        {shouldLoad && videoBroken ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote fallback when MP4 missing on host
          <img
            src={stillImageSrc}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] ${cropClass}`}
            loading="lazy"
            decoding="async"
            onError={() => setStillBroken(true)}
          />
        ) : null}
        {shouldLoad && showVideoLayer && !videoReady ? (
          <div
            className="absolute inset-0 bg-zinc-900"
            aria-hidden
          />
        ) : null}
        {!shouldLoad ? (
          <div className="absolute inset-0 bg-zinc-900" aria-hidden />
        ) : null}
      </div>
    </div>
  );
}

function MarqueeTrack({
  items,
  reverse,
}: {
  items: LoopItem[];
  reverse?: boolean;
}) {
  return (
    <div className="work-marquee-fade work-marquee-mobile overflow-hidden">
      <div
        className={`work-marquee-track ${reverse ? "work-marquee-track-reverse" : ""}`}
      >
        {items.map((item, i) => (
          <LoopCard
            key={`${item.id}-${i}`}
            src={item.src}
            label={item.label}
            matte={item.matte}
            crop={item.crop}
            stillImageSrc={item.stillImageSrc}
          />
        ))}
      </div>
    </div>
  );
}

export function WorkVideoMarquee() {
  const [pool, setPool] = useState<LoopItem[]>(animatedLoopVideos);

  useEffect(() => {
    const next = [...animatedLoopVideos];
    shuffleInPlace(next);
    setPool(next);
  }, []);

  const { row1, row2, mobileDup } = useMemo(() => {
    const mid = Math.ceil(pool.length / 2);
    const a = pool.slice(0, mid);
    const b = pool.slice(mid);
    return {
      row1: [...a, ...a],
      row2: [...b, ...b],
      mobileDup: [...pool, ...pool],
    };
  }, [pool]);

  if (animatedLoopVideos.length === 0) return null;

  return (
    <div className="w-full space-y-5 py-2">
      <div className="md:hidden">
        <MarqueeTrack items={mobileDup} />
      </div>
      <div className="hidden space-y-5 md:block">
        <MarqueeTrack items={row1} />
        <MarqueeTrack items={row2} reverse />
      </div>
    </div>
  );
}
