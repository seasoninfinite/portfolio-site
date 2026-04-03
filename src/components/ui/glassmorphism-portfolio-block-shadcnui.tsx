"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, CircleDollarSign, Layers, Sparkles, Zap } from "lucide-react";
import Image from "next/image";

const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
};

const rightFeatures = [
  {
    icon: CircleDollarSign,
    title: "Fair pricing",
    body: "My prices are lower because im 14 but I still create the same professional style site.",
  },
  {
    icon: Sparkles,
    title: "Layout & design",
    body: "Pages that make sense on phone and desktop, with spacing and type that still look sharp.",
  },
  {
    icon: Zap,
    title: "Motion & polish",
    body: "Quick, smooth animations where they help: hovers, section reveals, and little transitions that feel intentional.",
  },
  {
    icon: Layers,
    title: "Structure you can grow into",
    body: "Clean structure underneath so it’s easier to add pages or tweak content later without starting over.",
  },
];

export function GlassmorphismPortfolioBlock() {
  return (
    <section id="my-story" className="relative min-h-screen overflow-hidden px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-background/45 p-8 backdrop-blur-2xl md:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.05] via-transparent to-transparent" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={staggerParent}
            >
              <motion.div variants={fadeUp}>
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-2 rounded-full border-border/50 bg-background/55 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur"
                >
                  My story
                </Badge>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                My Story
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="max-w-xl space-y-4 text-base leading-relaxed text-foreground/75 md:text-[17px]"
              >
                <p>
                  I&apos;m 14 years old, which is why my prices are significantly
                  lower than industry standards. I learned to code websites 2 years
                  ago and have been improving my skills ever since.
                </p>
                <p>
                  My journey began with a fascination for how design could
                  transform user experiences. Starting young has given me a fresh
                  perspective and a passion for creating digital solutions that
                  not only look great but drive real results.
                </p>
                <p>
                  Despite my age, I bring dedication, creativity, and technical
                  expertise to every project. I&apos;m constantly learning and
                  adapting to new technologies to deliver quality work at
                  affordable prices.
                </p>
              </motion.div>



              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { value: "25+", label: "Projects completed" },
                  { value: "25+", label: "Happy clients" },
                  { value: "2+", label: "Years experience" },
                  { value: "100%", label: "Client satisfaction" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center"
                  >
                    <p className="text-lg font-semibold text-foreground md:text-xl">{stat.value}</p>
                    <p className="text-xs text-foreground/60">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-3">
                <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  What I do.
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-foreground/75 md:text-[17px]">
                  I use code like the examples below to create full working
                  sites.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="h-11 w-full gap-2 rounded-full px-6 text-sm font-medium sm:w-auto"
                >
                  I want to start making my site today!
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-primary/12 via-transparent to-transparent blur-3xl" />
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.1 }}
                className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/50 bg-background/60 p-6 backdrop-blur-xl sm:p-8"
              >
                <div className="flex flex-col items-center border-b border-border/30 pb-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="relative mb-5"
                  >
                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-2xl sm:h-28 sm:w-28" />
                    <Image
                      src="/about/ben.png"
                      alt="Ben"
                      width={112}
                      height={112}
                      className="relative h-24 w-24 rounded-full border border-border/40 object-cover sm:h-28 sm:w-28"
                    />
                  </motion.div>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    Ben · BGG
                  </h3>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/45 sm:text-xs">
                    Websites &amp; small business
                  </p>

                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70">
                    I build and design sites for people who need something clean
                    and professional without paying agency money.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {rightFeatures.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 26,
                          delay: 0.06 * index,
                        }}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        className="flex items-start gap-3 rounded-xl border border-border/35 bg-background/50 p-4 text-left"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/80 text-foreground/80">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="text-xs leading-relaxed text-foreground/60">
                            {item.body}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
