"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Check,
  ClipboardList,
  Globe,
  LayoutTemplate,
  Monitor,
  RefreshCw,
  Send,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export interface StageItem {
  id: string;
  text: string;
  completed: boolean;
  icon: React.ReactNode;
}

export interface ThemeColors {
  outerGradient?: { from: string; to: string };
  headerText?: string;
  percentageText?: string;
  cardBackground?: string;
  dividerColor?: string;
  stageTitle?: string;
  completedBadge?: { background: string; text: string };
  todoBadge?: { background: string; text: string };
  completedIcon?: { background: string; text: string };
  completedText?: string;
  pendingIcon?: string;
  pendingText?: string;
  button?: { background: string; hover: string; text: string };
}

export type OnboardingTheme =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "dark"
  | "custom";

const themes: Record<string, ThemeColors> = {
  blue: {
    outerGradient: { from: "from-blue-100", to: "to-purple-100" },
    headerText: "text-blue-800",
    percentageText: "text-blue-800",
    cardBackground: "bg-white",
    dividerColor: "bg-gray-200",
    stageTitle: "text-gray-900",
    completedBadge: { background: "bg-green-100", text: "text-green-700" },
    todoBadge: { background: "bg-blue-100", text: "text-blue-700" },
    completedIcon: { background: "bg-green-500", text: "text-white" },
    completedText: "text-gray-700",
    pendingIcon: "text-gray-500",
    pendingText: "text-gray-500",
    button: {
      background: "bg-blue-600",
      hover: "hover:bg-blue-700",
      text: "text-white",
    },
  },
  purple: {
    outerGradient: { from: "from-purple-100", to: "to-pink-100" },
    headerText: "text-purple-800",
    percentageText: "text-purple-800",
    cardBackground: "bg-white",
    dividerColor: "bg-gray-200",
    stageTitle: "text-gray-900",
    completedBadge: { background: "bg-green-100", text: "text-green-700" },
    todoBadge: { background: "bg-purple-100", text: "text-purple-700" },
    completedIcon: { background: "bg-green-500", text: "text-white" },
    completedText: "text-gray-700",
    pendingIcon: "text-gray-500",
    pendingText: "text-gray-500",
    button: {
      background: "bg-purple-600",
      hover: "hover:bg-purple-700",
      text: "text-white",
    },
  },
  green: {
    outerGradient: { from: "from-green-100", to: "to-emerald-100" },
    headerText: "text-green-800",
    percentageText: "text-green-800",
    cardBackground: "bg-white",
    dividerColor: "bg-gray-200",
    stageTitle: "text-gray-900",
    completedBadge: { background: "bg-emerald-100", text: "text-emerald-700" },
    todoBadge: { background: "bg-green-100", text: "text-green-700" },
    completedIcon: { background: "bg-emerald-500", text: "text-white" },
    completedText: "text-gray-700",
    pendingIcon: "text-gray-500",
    pendingText: "text-gray-500",
    button: {
      background: "bg-green-600",
      hover: "hover:bg-green-700",
      text: "text-white",
    },
  },
  orange: {
    outerGradient: { from: "from-orange-100", to: "to-amber-100" },
    headerText: "text-orange-800",
    percentageText: "text-orange-800",
    cardBackground: "bg-white",
    dividerColor: "bg-gray-200",
    stageTitle: "text-gray-900",
    completedBadge: { background: "bg-green-100", text: "text-green-700" },
    todoBadge: { background: "bg-orange-100", text: "text-orange-700" },
    completedIcon: { background: "bg-green-500", text: "text-white" },
    completedText: "text-gray-700",
    pendingIcon: "text-gray-500",
    pendingText: "text-gray-500",
    button: {
      background: "bg-orange-600",
      hover: "hover:bg-orange-700",
      text: "text-white",
    },
  },
  dark: {
    outerGradient: {
      from: "from-cyan-500/20",
      to: "to-fuchsia-500/15",
    },
    headerText: "text-white",
    percentageText: "text-white/90",
    cardBackground:
      "border border-white/[0.09] bg-zinc-950/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]",
    dividerColor: "bg-white/10",
    stageTitle: "text-white",
    completedBadge: {
      background: "bg-emerald-500/15",
      text: "text-emerald-300",
    },
    todoBadge: { background: "bg-violet-500/15", text: "text-violet-200" },
    completedIcon: {
      background:
        "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500",
      text: "text-white",
    },
    completedText: "text-white/88",
    pendingIcon: "text-white/40",
    pendingText: "text-white/55",
    button: {
      background:
        "border border-white/45 bg-transparent",
      hover: "hover:border-white/70 hover:bg-white/[0.06]",
      text: "text-white",
    },
  },
};

const defaultStage1: StageItem[] = [
  {
    id: "form",
    text: "You fill out my project form (Google Form) with what you need, rough style, and pages.",
    completed: true,
    icon: <ClipboardList className="h-4 w-4" />,
  },
  {
    id: "v1",
    text: "I build the first version of the site from that: layout, design, and placeholder text where we don’t have final copy yet.",
    completed: true,
    icon: <LayoutTemplate className="h-4 w-4" />,
  },
  {
    id: "preview",
    text: "I send you a preview link so you can click through v1 in the browser and note what you want changed.",
    completed: true,
    icon: <Monitor className="h-4 w-4" />,
  },
];

const defaultStage2: StageItem[] = [
  {
    id: "content",
    text: "You send me the real stuff: about you, what you offer, photos, logos, anything that should go on the site.",
    completed: false,
    icon: <Send className="h-4 w-4" />,
  },
  {
    id: "implement",
    text: "I drop it all in, tidy the design, and send back an updated build.",
    completed: false,
    icon: <Check className="h-4 w-4" />,
  },
  {
    id: "revisions",
    text: "We go back and forth on revisions until you’re happy. How many rounds depends on the package you picked.",
    completed: false,
    icon: <RefreshCw className="h-4 w-4" />,
  },
  {
    id: "domain",
    text: "When you’re ready, we point your domain at the site and it’s live.",
    completed: false,
    icon: <Globe className="h-4 w-4" />,
  },
];

export interface OnboardingStagesProps {
  className?: string;
  enableAnimations?: boolean;
  onButtonClick?: () => void;
  title?: string;
  percentage?: number;
  buttonText?: string;
  theme?: OnboardingTheme;
  customColors?: ThemeColors;
  animationDuration?: number;
  staggerDelay?: number;
  variant?: "default" | "compact" | "expanded";
  showPercentage?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl";
  stage1Title?: string;
  stage2Title?: string;
  stage1Items?: StageItem[];
  stage2Items?: StageItem[];
  /** When `step`, items appear one at a time; use Next step until all are shown, then the main CTA. */
  revealMode?: "all" | "step";
  nextStepLabel?: string;
  /** Thin bar inside the card when `revealMode` is `step`. */
  stepProgressBar?: boolean;
  /** Centre header, progress, stage titles, and constrain step copy width. */
  contentAlign?: "start" | "center";
}

export function OnboardingStages({
  className,
  enableAnimations = true,
  onButtonClick,
  title = "YOUR PROJECT",
  percentage = 45,
  buttonText = "See the rest of my work",
  theme = "blue",
  customColors,
  animationDuration = 1500,
  staggerDelay = 0.12,
  variant = "default",
  showPercentage = true,
  rounded = "xl",
  stage1Title = "STAGE 1",
  stage2Title = "STAGE 2",
  stage1Items = defaultStage1,
  stage2Items = defaultStage2,
  revealMode = "all",
  nextStepLabel = "Next step",
  stepProgressBar = true,
  contentAlign = "start",
}: OnboardingStagesProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const isCenter = contentAlign === "center";
  const totalItems = stage1Items.length + stage2Items.length;
  const [revealed, setRevealed] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  const effectivePercentage =
    revealMode === "step" && totalItems > 0
      ? Math.round((revealed / totalItems) * 100)
      : percentage;

  const themeColors =
    customColors ||
    (theme === "custom" ? themes.dark : themes[theme]) ||
    themes.blue;

  const variantStyles = {
    compact: "p-0.5",
    default: "p-1",
    expanded: "p-1.5",
  };

  const roundedStyles = {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
  };

  useEffect(() => {
    if (revealMode === "step") {
      setDisplayPercentage(effectivePercentage);
      return;
    }
    if (!enableAnimations || shouldReduceMotion) {
      setDisplayPercentage(percentage);
      return;
    }

    const startTime = Date.now();
    const animateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2.5);
      setDisplayPercentage(Math.round(easeOut * percentage));
      if (progress < 1) requestAnimationFrame(animateCounter);
    };
    const timeout = setTimeout(animateCounter, 600);
    return () => clearTimeout(timeout);
  }, [
    revealMode,
    effectivePercentage,
    enableAnimations,
    shouldReduceMotion,
    percentage,
    animationDuration,
  ]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 32,
        staggerChildren: staggerDelay,
        delayChildren: 0.12,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 350, damping: 28 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -18, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 28 },
    },
  };

  const stageContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay * 0.75,
        delayChildren: 0.08,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -120, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 480, damping: 22 },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.5 },
    },
  };

  const percentageVariants: Variants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 22, delay: 0.35 },
    },
  };

  const s1Visible =
    revealMode === "step"
      ? Math.min(revealed, stage1Items.length)
      : stage1Items.length;
  const s2Visible =
    revealMode === "step"
      ? Math.max(0, revealed - stage1Items.length)
      : stage2Items.length;
  const showStage2Block =
    revealMode === "all" ||
    (revealMode === "step" && revealed > stage1Items.length);

  const stepItemEnter =
    revealMode === "step" && shouldAnimate
      ? { opacity: 0, y: 16, filter: "blur(4px)" }
      : undefined;

  return (
    <motion.div
      className={cn(
        "relative",
        isCenter && "mx-auto flex w-full flex-col items-center",
        className
      )}
      initial={shouldAnimate ? "hidden" : false}
      animate="visible"
      variants={shouldAnimate ? containerVariants : undefined}
    >
      <div
        className={cn(
          variantStyles[variant],
          "bg-gradient-to-br shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]",
          themeColors.outerGradient?.from,
          themeColors.outerGradient?.to,
          roundedStyles[rounded]
        )}
      >
        <motion.div
          className={cn(
            "flex items-center px-4 py-2.5",
            isCenter ? "justify-center gap-8" : "justify-between"
          )}
          variants={shouldAnimate ? headerVariants : undefined}
        >
          <h2
            className={cn(
              "text-sm font-semibold tracking-[0.2em]",
              themeColors.headerText,
              isCenter && "text-center"
            )}
          >
            {title}
          </h2>
          {showPercentage ? (
            <motion.span
              className={cn("text-sm font-bold", themeColors.percentageText)}
              variants={shouldAnimate ? percentageVariants : undefined}
            >
              {displayPercentage}%
            </motion.span>
          ) : null}
        </motion.div>

        <motion.div
          className={cn(
            themeColors.cardBackground,
            variant === "compact" ? "rounded-lg" : "rounded-2xl",
            "overflow-hidden"
          )}
          variants={shouldAnimate ? itemVariants : undefined}
        >
          <div
            className={cn(
              variant === "compact"
                ? "p-4 pt-3"
                : variant === "expanded"
                  ? "p-10 pt-8"
                  : "p-6 pt-5 sm:p-8 sm:pt-6"
            )}
          >
            {revealMode === "step" && stepProgressBar && totalItems > 0 ? (
              <div
                className={cn("mb-6 w-full", isCenter && "mx-auto max-w-md")}
              >
                <div
                  className={cn(
                    "mb-2 flex w-full items-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45",
                    isCenter ? "justify-center gap-4" : "justify-between"
                  )}
                >
                  <span>Progress</span>
                  <span className="tabular-nums">
                    {revealed} / {totalItems}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500"
                    initial={false}
                    animate={{
                      width: `${Math.min(100, (revealed / totalItems) * 100)}%`,
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 24 }}
                  />
                </div>
              </div>
            ) : null}

            <motion.div
              className="mb-8"
              variants={shouldAnimate ? stageContainerVariants : undefined}
            >
              <motion.div
                className={cn(
                  "mb-5 flex items-center gap-3",
                  isCenter ? "justify-center" : "justify-between"
                )}
                variants={shouldAnimate ? itemVariants : undefined}
              >
                <h3
                  className={cn(
                    "text-base font-semibold sm:text-lg",
                    themeColors.stageTitle,
                    isCenter && "text-center"
                  )}
                >
                  {stage1Title}
                </h3>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium sm:px-3",
                    themeColors.completedBadge?.background,
                    themeColors.completedBadge?.text
                  )}
                >
                  Done
                </span>
              </motion.div>

              <motion.div
                className="space-y-3.5 sm:space-y-4"
                variants={shouldAnimate ? stageContainerVariants : undefined}
              >
                {stage1Items.slice(0, s1Visible).map((item) => (
                  <motion.div
                    key={item.id}
                    className={cn(
                      "flex items-start gap-3",
                      isCenter && "mx-auto max-w-md"
                    )}
                    variants={
                      revealMode === "step" || !shouldAnimate
                        ? undefined
                        : itemVariants
                    }
                    {...(revealMode === "step" && shouldAnimate
                      ? {
                          initial: stepItemEnter,
                          animate: {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                          },
                          transition: {
                            type: "spring" as const,
                            stiffness: 420,
                            damping: 28,
                          },
                        }
                      : {})}
                  >
                    <motion.div
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                        themeColors.completedIcon?.background,
                        themeColors.completedIcon?.text
                      )}
                      variants={
                        revealMode === "step" || !shouldAnimate
                          ? undefined
                          : iconVariants
                      }
                      {...(revealMode === "step" && shouldAnimate
                        ? {
                            initial: { scale: 0 },
                            animate: { scale: 1 },
                            transition: {
                              type: "spring" as const,
                              stiffness: 500,
                              damping: 22,
                            },
                          }
                        : {})}
                      whileHover={
                        shouldAnimate
                          ? { scale: 1.08, transition: { duration: 0.2 } }
                          : undefined
                      }
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </motion.div>
                    <span
                      className={cn(
                        "text-left text-sm font-medium leading-snug sm:text-[15px]",
                        themeColors.completedText
                      )}
                    >
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {showStage2Block ? (
              <>
                <motion.div
                  className={cn("mb-8 h-px", themeColors.dividerColor)}
                  variants={shouldAnimate ? itemVariants : undefined}
                  {...(revealMode === "step" && shouldAnimate
                    ? {
                        initial: { scaleX: 0 },
                        animate: { scaleX: 1 },
                        transition: {
                          type: "spring" as const,
                          stiffness: 300,
                          damping: 28,
                        },
                        style: { transformOrigin: "left" },
                      }
                    : {})}
                />

                <motion.div
                  className="mb-8"
                  variants={shouldAnimate ? stageContainerVariants : undefined}
                >
                  <motion.div
                    className={cn(
                      "mb-5 flex items-center gap-3",
                      isCenter ? "justify-center" : "justify-between"
                    )}
                    variants={shouldAnimate ? itemVariants : undefined}
                    {...(revealMode === "step" && shouldAnimate
                      ? {
                          initial: { opacity: 0, y: 10 },
                          animate: { opacity: 1, y: 0 },
                          transition: {
                            type: "spring" as const,
                            stiffness: 380,
                            damping: 28,
                          },
                        }
                      : {})}
                  >
                    <h3
                      className={cn(
                        "text-base font-semibold sm:text-lg",
                        themeColors.stageTitle,
                        isCenter && "text-center"
                      )}
                    >
                      {stage2Title}
                    </h3>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium sm:px-3",
                        themeColors.todoBadge?.background,
                        themeColors.todoBadge?.text
                      )}
                    >
                      Next up
                    </span>
                  </motion.div>

                  <motion.div
                    className="space-y-3.5 sm:space-y-4"
                    variants={shouldAnimate ? stageContainerVariants : undefined}
                  >
                    {stage2Items.slice(0, s2Visible).map((item) => (
                      <motion.div
                        key={item.id}
                        className={cn(
                          "flex items-start gap-3",
                          isCenter && "mx-auto max-w-md"
                        )}
                        variants={
                          revealMode === "step" || !shouldAnimate
                            ? undefined
                            : itemVariants
                        }
                        {...(revealMode === "step" && shouldAnimate
                          ? {
                              initial: stepItemEnter,
                              animate: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                              },
                              transition: {
                                type: "spring" as const,
                                stiffness: 420,
                                damping: 28,
                              },
                            }
                          : {})}
                      >
                        <motion.div
                          className={cn(
                            "mt-0.5 flex shrink-0 text-current",
                            themeColors.pendingIcon
                          )}
                          variants={
                            revealMode === "step" || !shouldAnimate
                              ? undefined
                              : iconVariants
                          }
                          {...(revealMode === "step" && shouldAnimate
                            ? {
                                initial: { scale: 0, rotate: -90 },
                                animate: { scale: 1, rotate: 0 },
                                transition: {
                                  type: "spring" as const,
                                  stiffness: 480,
                                  damping: 22,
                                },
                              }
                            : {})}
                        >
                          {item.icon}
                        </motion.div>
                        <span
                          className={cn(
                            "text-left text-sm font-medium leading-snug sm:text-[15px]",
                            themeColors.pendingText
                          )}
                        >
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </>
            ) : null}

            {revealMode === "step" && totalItems > 0 ? (
              <motion.button
                type="button"
                className={cn(
                  "w-full rounded-full py-3.5 text-sm font-semibold transition-colors duration-200 sm:py-4",
                  isCenter && "max-w-md",
                  themeColors.button?.background,
                  themeColors.button?.hover,
                  themeColors.button?.text
                )}
                variants={shouldAnimate ? buttonVariants : undefined}
                whileHover={shouldAnimate ? { scale: 1.02, y: -2 } : undefined}
                whileTap={shouldAnimate ? { scale: 0.99 } : undefined}
                onClick={() => {
                  if (revealed < totalItems) {
                    setRevealed((r) => Math.min(totalItems, r + 1));
                  } else {
                    onButtonClick?.();
                  }
                }}
              >
                {revealed < totalItems ? nextStepLabel : buttonText}
              </motion.button>
            ) : (
              <motion.button
                type="button"
                className={cn(
                  "w-full rounded-full py-3.5 text-sm font-semibold transition-colors duration-200 sm:py-4",
                  isCenter && "max-w-md",
                  themeColors.button?.background,
                  themeColors.button?.hover,
                  themeColors.button?.text
                )}
                variants={shouldAnimate ? buttonVariants : undefined}
                whileHover={shouldAnimate ? { scale: 1.01, y: -1 } : undefined}
                whileTap={shouldAnimate ? { scale: 0.99 } : undefined}
                onClick={onButtonClick}
              >
                {buttonText}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
