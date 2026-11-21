<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BGG terms are the rulebook

Before changing any price, plan, number of changes, turnaround, deposit, refund, notice period, offer or testimonial, or before writing a client quote or deal, use the `bgg-terms` skill. Check the change against `/terms` (`src/app/terms/page.tsx`) and `src/data/pricing.ts`, say plainly if they conflict (for example 6 changes a month vs 5 in the terms), and regenerate `public/legal/*.pdf` whenever the terms or privacy pages change.
