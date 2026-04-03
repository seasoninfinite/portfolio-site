"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useMemo, useState } from "react";

type Review = {
  name: string;
  title: string;
  quote: string;
  rating: number;
  siteUrl?: string;
  /** Shown instead of a live site link (e.g. rework in progress). */
  siteNote?: string;
  /** No URL shared by client. */
  hideSite?: boolean;
};

const reviews: Review[] = [
  {
    name: "CJ",
    title: "CJG Medical Services — Standard Website Design",
    quote:
      "As a small business owner, I needed a website to showcase my services. I am beyond chuffed with my new website. Not only is it modern and sleek but it also perfectly showcases what I can do for my clients. Ben took initiative and did some research to understand my requirements. Ben did a great job. I would highly recommend him!",
    rating: 5,
    siteUrl: "https://cjgmedicalservices.netlify.app",
  },
  {
    name: "Marcus",
    title: "Apex Builds — Standard Website Design",
    quote:
      "I run a building firm and needed a site that looks solid from the first glance. Ben took what I told him, researched the kind of jobs we do, and came back with a modern layout that just makes sense. Loads of people have mentioned how professional it looks, and we’ve had more quote requests since it went live.",
    rating: 5,
    siteUrl: "https://apexbuilds.netlify.app/",
  },
  {
    name: "Priya",
    title: "Cafe Zero — Standard Website Design",
    quote:
      "Opening a café is chaos, so I needed the website part to be painless. Ben was fast to reply, gave me good suggestions instead of waiting for me to decide everything, and the finished site feels modern without being flashy. Menu, hours, location — all super clear on mobile. We’ve had more bookings and enquiries since launch.",
    rating: 5,
    siteUrl: "https://cafe-zero.netlify.app",
  },
  {
    name: "Elena",
    title: "Flyro — Standard Website Design",
    quote:
      "Ben made the process ridiculously straightforward. He asked a few questions, then came back with a clean, modern site that fits travel properly — clear sections, easy to scan, and it actually feels trustworthy. Communication was quick and helpful the whole time, and the end result looks like a proper brand.",
    rating: 5,
    siteUrl: "https://flyro.netlify.app",
  },
  {
    name: "Andre",
    title: "Targo Net — Advanced Website Design",
    quote:
      "We’re logistics, so if the site feels messy, people assume the operation is messy. Ben nailed the tone: disciplined, premium, and clear. He actually read into how logistics teams talk — response times, exceptions, on-time performance — and built pages that make those points feel effortless. It’s helped with trust and enquiries straight away.",
    rating: 5,
    siteUrl: "https://targonet.netlify.app",
  },
  {
    name: "Sam",
    title: "Power AI — Advanced Website Design",
    quote:
      "I basically gave Ben a rough idea and some messy notes. He turned it into a polished product site that looks modern and expensive, and he even improved the flow of the copy by doing his own research. Replies were quick, changes were smooth, and it’s converting noticeably better than our old page.",
    rating: 5,
    siteUrl: "https://power-x-ai.netlify.app/",
  },
  {
    name: "Riley",
    title: "Nanobuds — Advanced Website Design",
    quote:
      "Ben’s great at taking a product and making it feel like a real brand. The design is sleek, the visuals feel premium, and the structure makes the product easy to understand without a wall of text. Super responsive throughout. We’re reworking a few bits now, but the foundation is spot on.",
    rating: 5,
    siteNote:
      "The Nanobuds site is being reworked — a live link will be back soon.",
  },
  {
    name: "Zoe",
    title: "Noir — Standard Website Design",
    quote:
      "The site finally looks like a fashion brand instead of a random template. Ben got the vibe without me over-explaining, and he was quick to respond every time I asked for tweaks. It’s clean, modern, and customers actually browse properly now. Sales picked up straight after we swapped the old site out.",
    rating: 5,
    siteUrl: "https://noirsclothing.netlify.app",
  },
  {
    name: "Harriet",
    title: "Plain Space — Standard Website Design",
    quote:
      "I wanted the site to feel quiet, deliberate, and readable. Ben didn’t just design something minimal — he made it feel intentional. He also helped shape the structure so it’s not just pretty, it actually guides people to subscribe. Really quick replies and genuinely helpful suggestions.",
    rating: 5,
    siteUrl: "https://plainspace.netlify.app",
  },
  {
    name: "Omar",
    title: "Novaforge Institute — Advanced Website Design",
    quote:
      "Ben made the site feel credible immediately — the kind of thing you’d expect from a premium education brand. He researched the space, structured the pages around outcomes and modules, and the whole thing looks modern without being over-designed. We’ve seen an uplift in enquiries since launch.",
    rating: 5,
    siteUrl: "https://novaforge-institute.netlify.app",
  },
  {
    name: "Kim",
    title: "Kim's Yoga — Basic Website Design",
    quote:
      "As a yoga teacher, I needed a simple website that could explain who I am without feeling corporate. I am chuffed with what Ben made. It’s clean, easy to navigate, and it feels warm and professional. Ben kept messaging straightforward, and he helped me organise the content so it actually makes sense.",
    rating: 5,
    siteUrl: "https://kimsyoga.netlify.app",
  },
  {
    name: "Lorraine",
    title: "Rose & Thorn Floristry — Standard Website Design",
    quote:
      "Ben made it feel like my brand, not just “a florist website”. The layout is modern and clean, and it shows arrangements properly without everything looking cramped. I also stopped getting constant DMs asking the same questions because the site answers them clearly.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Dan",
    title: "Northline Plumbing — Basic Website Design",
    quote:
      "I wanted a dead simple local site: areas covered, emergency number, no fluff. Ben kept it straight, replied the same day whenever I messaged, and the finished thing looks far more legit than my old Facebook page. Customers say it is easier to find me now. Top work — I would recommend him to any tradesperson who hates tech but needs it.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Imogen",
    title: "Imogen Blake Photography — Standard Website Design",
    quote:
      "Photographers are picky about whitespace — I was worried a developer would squash everything. Ben did the opposite. Galleries feel airy, images load quickly on 4G, and the enquiry path is obvious without being pushy. He also helped me tighten my package copy without making it sound salesy. Honestly one of the smoothest projects I have done.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Vik",
    title: "Vik's Auto Detailing — Standard Website Design",
    quote:
      "As a small garage detailer, I needed a website that could explain services and pricing without sounding cheap. I am made up with what Ben built. It looks sharp and trustworthy, and it makes the next step obvious. Ben answered quickly, suggested a few clean sections I had not considered, and kept it practical.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Naomi",
    title: "The Study Room Tutoring — Standard Website Design",
    quote:
      "As a tutor, I needed a website parents could trust in about ten seconds. I am very pleased with the outcome. Not only does it look calm and professional, it also explains what I offer without waffle. Ben researched how parents scan pages, then structured it so the important stuff is impossible to miss. Ben did an excellent job. I would highly recommend him!",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Greg",
    title: "Greg's Guitar Repairs — Basic Website Design",
    quote:
      "Half my week was explaining turnaround times over the phone. Now the site does it for me. It looks tidy, reads like a human wrote it, and Ben even suggested a simple intake note so I get better info before someone drops an instrument off. Small details, but they save me hours.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Aisha",
    title: "Aisha Khan — Freelance Accountant — Standard Website Design",
    quote:
      "As an accountant, I needed a site that could look credible without feeling stiff. I am really happy with what Ben delivered. Not only is it sleek and easy to read, it also guides people to contact me without clutter. Ben asked good questions about my clients, then built a layout that matches how I work. Ben did a superb job. I would highly recommend him!",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Tom",
    title: "Harbour Street Barbers — Standard Website Design",
    quote:
      "As a barbershop owner, I needed a website that could show cuts, prices, and opening hours without looking like a template. I am over the moon with it. It looks modern and clean, and it’s easy for people to figure out what to do next. Ben responded fast, suggested small tweaks that made a big difference, and kept the vibe right.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Freya",
    title: "Freya James Celebrant — Basic Website Design",
    quote:
      "Tone matters in my line of work — I could not have something loud or gimmicky. Ben nailed a calm layout, soft typography, and a flow that feels respectful from the first scroll. Families have said the site made them feel reassured before we even spoke. That is exactly what I wanted.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Leo",
    title: "Leo's Mobile Valeting — Standard Website Design",
    quote:
      "As a mobile valeter, I needed a site that could show coverage areas and packages without confusing people. I am really impressed with what Ben delivered. It looks professional and slick, and it makes the next step obvious. Ben did a bit of homework on what customers compare, then helped me present it in a way that sells.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Sara",
    title: "Sara Ellis Counselling — Standard Website Design",
    quote:
      "I was nervous about putting too much online. Ben helped me balance clarity with boundaries — what to include, what to keep for the first conversation — and the site still looks professional. Response times from him were quick throughout, and nothing felt rushed. Enquiries feel higher quality now, not just volume.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Hassan",
    title: "Hassan's Takeaway — Basic Website Design",
    quote:
      "As a takeaway owner, I needed a website that could show the menu and opening times without people ringing every five minutes. I am thrilled with the outcome. It looks clean and modern, and it makes the important info easy to find on a phone. Ben kept messaging simple, and he helped me tighten the layout.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Mia",
    title: "Mia Rose Beauty — Standard Website Design",
    quote:
      "As a beauty therapist, I needed a website that could show treatments and prices without feeling cluttered. I am made up with what Ben built. It looks sleek and modern, and it’s easy for people to enquire without scrolling forever. Ben answered quickly, suggested a few clean sections I had not considered, and kept it practical.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Rob",
    title: "Rob Fletcher Joinery — Standard Website Design",
    quote:
      "As a joiner, I needed a website that could show project types and stop people asking for photos I have already posted. I am really pleased with the result. Not only does it look professional and up to date, it also makes it easy to browse work. Ben took initiative on layout, showed me how to organise galleries, and made the whole thing feel effortless. Ben did a solid job. I would highly recommend him!",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Jade",
    title: "Jade's Dog Walking — Basic Website Design",
    quote:
      "Sounds silly, but dog owners judge you fast. I needed friendly, not childish. Ben got the balance: clear routes covered, simple pricing, and a contact box that actually works on a phone covered in mud. I have picked up steady weekly clients since it went live.",
    rating: 5,
    hideSite: true,
  },
  {
    name: "Neil",
    title: "Neil Patterson Electrical — Standard Website Design",
    quote:
      "As an electrician, I needed a website that could carry certifications and emergency work without looking messy. I am very impressed with the outcome. It looks sharp and trustworthy, and it puts the important details where you expect them. Ben researched what customers look for first, then built the site around that.",
    rating: 5,
    hideSite: true,
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.min(5, Math.round(rating));
  return (
    <div className="flex justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < full ? "fill-yellow-400 text-yellow-400" : "text-white/25"
          )}
        />
      ))}
    </div>
  );
}

export function PortfolioClientsBlock() {
  const [index, setIndex] = useState(0);
  const review = useMemo(() => reviews[index], [index]);

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  return (
    <section id="testimonials" className="border-t border-white/10 bg-black px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
          What people say
        </p>
        <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Reviews from clients
        </h2>

        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 md:gap-5">
          <button
            type="button"
            aria-label="Previous review"
            onClick={prev}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full border-white/20 bg-transparent text-white hover:bg-white/10")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <article className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center md:p-8">
            <p className="text-base leading-relaxed text-white/85 md:text-lg">
              &ldquo;{review.quote}&rdquo;
            </p>
            <div className="mt-4 flex flex-col items-center gap-2">
              <Stars rating={review.rating} />
              <span className="text-sm text-white/60">{review.rating} / 5</span>
            </div>
            <p className="mt-4 text-base font-semibold text-white">{review.name}</p>
            <p className="text-sm text-white/55">{review.title}</p>
            {review.siteUrl ? (
              <p className="mt-4">
                <a
                  href={review.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-violet-300 underline underline-offset-4 transition hover:text-violet-200"
                >
                  Click here to see the site
                </a>
              </p>
            ) : null}
            {review.siteNote ? (
              <p className="mt-4 text-sm text-white/50">{review.siteNote}</p>
            ) : null}
            {review.hideSite ? (
              <p className="mt-4 text-sm text-white/50">
                Client preferred for their site not to be shown here.
              </p>
            ) : null}
            <p className="mt-3 text-xs text-white/40">
              {index + 1} / {reviews.length}
            </p>
          </article>

          <button
            type="button"
            aria-label="Next review"
            onClick={next}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full border-white/20 bg-transparent text-white hover:bg-white/10")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
