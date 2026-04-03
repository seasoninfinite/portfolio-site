"use client";

import { Button } from "@/components/ui/button";
import {
  formatProjectSubtitle,
  staticWorkItems,
  type StaticWorkItem,
} from "@/data/work-content";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

const FIRST = 2;

function WorkCardImage({ site }: { site: StaticWorkItem }) {
  const [src, setSrc] = useState(site.imageSrc);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.01]"
        onError={() => {
          if (src !== site.fallbackImageSrc) setSrc(site.fallbackImageSrc);
        }}
      />
    </>
  );
}

function CardInner({ site }: { site: StaticWorkItem }) {
  const body = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 sm:aspect-video md:aspect-[16/10]">
        <WorkCardImage site={site} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="px-4 py-4 text-center sm:px-6 sm:py-5">
        <h3 className="text-lg font-semibold text-white sm:text-xl">{site.title}</h3>
        {site.ownerName ? (
          <p className="mt-1 text-sm text-white/50">{site.ownerName}</p>
        ) : null}
        <p className="mt-2 text-sm font-medium leading-snug text-cyan-400/90 sm:text-[15px]">
          {formatProjectSubtitle(site.businessLine, site.tier)}
        </p>
        {site.href ? (
          <span className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white/75 group-hover:text-white">
            Visit live site
            <ArrowUpRight className="size-4" />
          </span>
        ) : (
          <span className="mt-4 block text-sm text-white/40">Live link coming soon</span>
        )}
      </div>
    </>
  );

  if (site.href) {
    return (
      <a
        href={site.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80"
      >
        {body}
      </a>
    );
  }

  return <div className="block">{body}</div>;
}

export function WorkStaticGallery() {
  const [stage, setStage] = useState(0);

  const { visible, canRevealMore } = useMemo(() => {
    const n = staticWorkItems.length;
    if (n === 0) return { visible: [] as StaticWorkItem[], canRevealMore: false };
    const count =
      stage === 0 ? Math.min(FIRST, n) : stage === 1 ? Math.min(6, n) : n;
    return {
      visible: staticWorkItems.slice(0, count),
      canRevealMore: count < n,
    };
  }, [stage]);

  if (staticWorkItems.length === 0) return null;

  return (
    <div className="mt-8 w-full">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:gap-x-12">
        {visible.map((site, i) => (
          <motion.article
            key={site.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            <CardInner site={site} />
          </motion.article>
        ))}
      </div>

      {canRevealMore ? (
        <div className="mt-12 flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            onClick={() => setStage((s) => s + 1)}
          >
            See more
          </Button>
        </div>
      ) : null}
    </div>
  );
}
