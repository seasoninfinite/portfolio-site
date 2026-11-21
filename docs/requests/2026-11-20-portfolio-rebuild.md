# Plan: BGG Website Design portfolio rebuild (20 Nov 2026)

## Ben's words (verbatim)
> MY OWN SITE. Check it is actually my site then. I want to make it better, Marketting, SEO, to actually get clients from them searching up things. and make it easier to navigate and a lot nicer. use marketing strategies and all. research! what a site that gets lots of natural search clients has in terms of SEO, not paid advertisements. … GOT TO MAKE THIS GOOD THIS IS CLIENTS FIRST IMPRESSION. ADD MORE SITES LIKE ONES WE HAVENT SENT. EG THE ROCK DENTAL, AND THE OTHER ONE U MADE. ADD THEM BUT CHANGE IT SO ITS A DIFFERENT MADE UP BUSINESS AS MORE PROOFS. ADD GEMMAS NEW UPDATED SITE PREVIEW AND SAME WITH VARSHAS AND ADD LAURAS, MAKE ALL THE MOCKUPS BETTER. LIKE THE PHONE LAPTOP IPAD ONE, MAKE THEM LOOK REALLY MODERN AND SLICK. PROFESSIONAL.

> Also I want to make the most expensive one: advanced as like 500 … research what other businesses charge but also what they offer. make the pricing yourself … website care plan doesnt include domain name and then the other option the one im doing for laura the 25 a month website care plan … project steps maybe edit it. or actually idk i like that and the last bit

> remember marketting FOR EVERYTHING EVERY WORDING IS SO IMPORTANT. BOOST YOUR WEBSITE PEOPLE INTO CLIENTS OR WHATEVER TELL THEM THE BENEFITS EXAGGERATE IT. DO 499,99 INSTEAD OF 500 THINK ABOUT THIS STUFF DEEPLY.

## Outcome
bggwebsitedesign.com becomes a multi-page, search-friendly sales site that turns small-business owners who find it on Google into enquiries and paid deposits. The client work is shown in modern laptop, tablet and phone mockups.

## Done means
- [x] Confirmed it's Ben's site: live bggwebsitedesign.com, title "BGG Website Design", repo seasoninfinite/portfolio-site (this folder).
- [x] New design: light warm "paper" canvas, ink type, one signal-orange accent, Bricolage Grotesque + Geist. No purple gradients, aurora, glass, or fake loading splash.
- [x] Pages: Home, Work (index + a case study for every project), Pricing, Web design Solihull, Websites for dietitians, About, Contact, and a "How much does a website cost UK" guide. /expertise and /how-websites-work kept and restyled.
- [x] Portfolio: Gemma v2, Varsha v3, Laura v3, Claudia v3 and CJG (client work); Alder & Finch Dental (from Rock Dental) and Fernbrook Landscapes (from Outdoor Designs) as made-up concepts; plus the best concept builds.
- [x] Pure-CSS laptop/tablet/phone mockups built from fresh screenshots at 1440, 834 and 390 px.
- [x] Pricing reset from research: Starter £199.99, Growth £349.99, Premium £499.99; Essential Care £10/mo (domain not included), Priority Care £25/mo; add-ons.
- [x] Project steps and the contact/payment wizard ("the last bit") kept and restyled. Stripe checkout charges the new prices.
- [x] SEO: unique title and description on every page, canonicals, sitemap with every page, robots, JSON-LD (ProfessionalService, WebSite, Service/Offer, BreadcrumbList, Person), OG image, alt text, internal links. Concept demos noindexed.
- [x] `npm run build` and lint pass; tested at 390 and 1280; zero console errors; contact wizard and Stripe step checked (no live payment).
- [x] Nothing pushed or deployed without Ben's yes (work is on branch `redesign-2026`; "Revert" = deploy `main`).

## Research (sources and findings)
- **SEO** (agent report, 20 Nov): directories (Yell, Bark) plus a few local providers dominate "web designer Solihull". Local pages hide prices, so transparent pricing is an opening. Google docs: FAQ rich results were removed in May 2026 and HowTo is dead. Self-serving review stars are not eligible for LocalBusiness/Organization. Worth doing: ProfessionalService, WebSite, BreadcrumbList, a unique location page, a niche page, case studies, a cost guide, Google Business Profile (service-area business) and real Google reviews.
- **Pricing** (agent report, 20 Nov): UK fixed-package median about £520 (IQR £399–£898). Care plans: hosting-only £15–£30, plans with edits £45–£65, agencies £99+. 50% deposit is standard and full payment upfront is flagged as a red flag. Add-ons: extra page £100–£225, GBP setup £79, logo £99–£699, copywriting £50–£195 per page. No VAT under the £90k threshold.
- **Design benchmarks** (screenshots in scratchpad `bench/`): miguelrecio.es (an "Available for projects" pill, Book a call CTA, concepts labelled apart from client work, FAQ on price, timeline and ownership); melon.studio (client work as angled device renders on rich brand-colour tiles); basement.studio (few, strong case studies); locomotive.ca (a big editorial type scale). The pattern → adaptation table is below.

| Pattern | Adaptation |
|---|---|
| Outcome headline + audience | "Websites that turn visitors into paying clients" + who it's for |
| Status pill | "Taking new projects" in the hero and nav |
| Persistent CTA in nav | "Get a free quote" button, always visible |
| Device renders on brand-colour tiles | Every project tile uses the client's own colour behind a CSS laptop/tablet/phone set |
| Concepts labelled apart | "Client" vs "Concept" tag and filter |
| Few strong case studies | 6 featured on home, full list on /work |
| Transparent price + FAQ | Pricing page with prices as text, deposit terms, care plans, add-ons, FAQ |
| Free low-friction offer | "Free homepage mock-up / free 15-min call" in the CTA band |
| Named human | Ben's photo and story on Home and About |
| Big editorial type | Bricolage Grotesque display, clamp() scale up to 96px |

## Critique of the old site (before)
- First impression: dark, purple, aurora and a fake 0–100% splash: generic "AI template" look; the work is hidden below 4 sections.
- Navigation: one long page; "Services" points to #pricing; no indexable pages for services, work, pricing or location.
- SEO: one URL in the sitemap; everything is a client component; no local or niche pages; title is just "BGG Website Design".
- Trust: 27 testimonials, most for businesses that aren't real clients, and "25+ happy clients / 100% satisfaction" stats. Under the UK DMCC Act 2024 fake reviews are banned (CMA fines up to 10% of turnover), and Google treats them as spam. **Removed from the new site.** Only CJ's quote is kept (Ben to confirm it is real).
- Age: "I'm 14", but Ben (son) is 15 now.
- Work cards: flat screenshots, a "See more" reveal, no case studies.

## Standard for this build
- Palette: paper #F4F2EC, surface #FFFFFF, ink #121210, muted #67655F, line #E2DED4, accent #FF5A1F (used with ink text on top), night #121210 for the dark bands.
- Type: Bricolage Grotesque (display 600–800), Geist (body 16–18px), Geist Mono (labels and prices).
- Spacing scale 4/8/12/16/24/32/48/72/112. Radius 14/22/32. Shadows layered (contact + ambient).
- Copy: benefit-first, active, second person ("you"). Charm prices (£x.99). No invented stats, reviews or awards.
- Banned: purple gradients, glass cards, aurora, emoji icons, fake loader, three identical icon cards, "empowering your journey".

## Ben's later instructions (same session) and what was done
- Pricing: Advanced → **Premium £499.99**; Starter £199.99, Growth £349.99. Essential Care £10/mo (no domain), Priority Care £25/mo (Laura's plan). Builds take a 50% deposit by Stripe; prices live in `src/data/pricing.ts` and checkout reads them server-side (inline `price_data`, no Stripe Price IDs needed).
- Turnaround: Starter 3 days, Growth 5 days, Premium 10 days max. Each card shows "Agencies charge up to £1,500 / £3,000 / £5,000" (true per the research; no fake "was" prices).
- Copy pushed harder, benefit-first. Project steps and the contact/payment wizard kept (restyled).
- No "concept" or "client/concept" labels anywhere, and no "Trusted by" strip. The work page filters by industry. The demo sites live at `/showcase/…`, noindexed, with no "made-up" banner. Their data still says `kind: "concept"` internally so nobody adds fake reviews to them later.
- No dietitians page (removed). The home band now covers health & wellness generally.
- Free 1-page preview promoted: offer bar on every page, hero nudge, orange offer block (home, pricing, work, Solihull), first option in the contact form.
- "Ready for a website" band: orange glow drifts (CSS keyframes, off for reduced motion); ghost button fixed.
- Google listing: title "Web Designer Solihull | Websites Live in Days from £199.99" with a ✓-list description; PNG favicons added (icon.png, apple-icon.png).

## Mockups (how they're made)
- Pre-rendered boards at 2× so screens stay sharp: `public/work/mockups/<folder>/devices-{1200,2400}.webp` (monitor + laptop + iPad + iPhone, used at laptop width) and `phones-{900,1800}.webp` (3 iPhones, used on phones). Dietitian fan: `public/work/mockups/_fan/`.
- Source page: `tools/mockups/compose.html` (`?l=devices|phones|fan4&dir=<folder>/&tile=#hex&glow=&vign=&pb=&pd=&tb=&td=`). Settings per site: `tools/mockups/boards.json`.
- To add a site: capture 1440×900 @2× (p1 top, p2 one screen down), 820×1180 @2× (tab1), 390×844 @3× (ph1, ph2, ph3 at 0, 0.95 and 1.9 screens down) into `<folder>/`, then render compose.html at 1200×750 and 900×900 @2× and save as WebP. Never scale the boards with CSS transforms (it softens them).

## Changes nobody asked for (log)
- Fake testimonials and inflated stats removed (legal risk under the DMCC Act 2024). Only CJ's quote kept.
- Kim's Yoga, Nanobuds and Mindloop dropped from the showcase (weak, broken or duplicate). Ethereal Studio and the animations demo were checked and left out (broken / not a website).
- Contact form now sends to Netlify Forms (`public/__forms.html`), with an email fallback, instead of relying only on the visitor's mail app.
- Sticky phone bar (See prices / Free quote), skip link, AA contrast fixes, 404 page, OG share image, case-study page per project.
- Nav: Work · Pricing · Process · About · Contact.
- Fake loading splash and WebGL aurora removed (speed and LCP).
- Age updated 14 → 15.
- Checkout switched to inline Stripe prices (no new Price IDs needed). Builds are charged a 50% deposit (see open questions).

## Open questions for Ben
- Which Netlify account / Gmail hosts bggwebsitedesign.com, and does pushing `main` auto-deploy?
- Is CJ's testimonial real? Can you get one-line quotes plus Google reviews from Gemma, Varsha, Claudia and Laura?
- OK to show Laura's and Varsha's new designs publicly before they launch?
- Deposit model (50% now, 50% before launch): keep it, or charge in full?

## Terms & privacy (21 Nov 2026)
- New `/terms` (37 parts + model cancellation form + Art 28 data processing terms, about 7,500 words) and `/privacy` (14 parts, about 1,800 words), replacing the old OneDrive PDF link. Linked from the footer, the checkout tick-box and the sitemap.
- Checkout now needs two ticks for paid plans: agree to the terms and privacy policy, and ask for work to start within 14 days with the cancellation acknowledgement (Consumer Contracts Regs 2013 reg 36). Both are recorded in the Netlify Forms submission.
- Old terms carried over: the 14-day no-response rule (now pause, then close at 60 days with a refund for work not done), revisions, scope, ownership on full payment, portfolio use and care plan limits. Care plan notice changed from 7 to 30 days to match the site.
- MUST DO before going live: fill `SITE.legal.ownerName` and `SITE.legal.address` in `src/lib/site.ts` (an adult owner, not Ben (son)), and add an ICO registration number if one is needed (ICO fee from £52, self-assessment at ico.org.uk).
- Revisit by Jan 2027: the DMCC Act subscription-contract rules (reminders, easy exit) for consumer care-plan customers.
- Not legal advice. Have a solicitor or a legal template service check it.
