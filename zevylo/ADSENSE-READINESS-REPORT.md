# AdSense Readiness Report — Zevylo

**Date:** 20 November 2026
**Scope:** Source repository audit and remediation of the public site (`https://zevylo.netlify.app`)
**Rollback point:** local branch `pre-adsense-remediation` (created before edits)

Google decides whether to approve a publisher account. Nothing in this report is a guarantee of approval, and the site was **not deployed** as part of this work.

---

## 1. Initial condition

The project is a Next.js 16 / React 19 site (`zevylo/`), deployed to Netlify, with:

- 213 registered browser tools across 18 categories (all `executionMode: 'client'`).
- 305 AI directory listings across 23 AI categories.
- A site-wide Google AdSense script (`ca-pub-5869892726772309`) and a verification meta tag.
- No `ads.txt`, no rendered ad units, and no analytics package.
- `netlify.toml` set `Cross-Origin-Embedder-Policy: require-corp` on every route.
- A contact page whose form simulated success with a 600 ms timer.
- 213 auto-generated tool "guides" and 305 auto-generated AI "reviews" produced from templates.
- A nine-post blog hub with invented benchmark claims, all linking to the generated review pages.

## 2. Critical problems found

| # | Problem | Impact |
|---|---|---|
| 1 | AI review generator computed "MMLU", "HumanEval", "SWE-bench" and "LMSYS Elo" scores from a star rating field (`Math.round(tool.rating * 18.5)`), and printed "verified rating" / "monthly active users" / "reviewCount" figures | Fabricated statistics presented as verified benchmarks — a direct policy and trust violation |
| 2 | AI directory stored and displayed invented traffic, ratings, review counts and a "Verified" badge, plus `AggregateRating` structured data | Fake ratings/reviews in both UI and structured data |
| 3 | 213 tool guides generated from one template, including "sub-millisecond", "zero file size limits", "100% client-side" for every tool and unrelated category examples | Thin, near-duplicate content; false technical claims |
| 4 | Contact form never sent anything but displayed "Message Received!" | Deceptive user experience; no working contact channel |
| 5 | Homepage claimed "Zero Ads", "Sub-Second Zero-Latency", "Completely free forever", "tested by thousands" while loading AdSense | Contradiction between marketing, privacy policy and implementation |
| 6 | `COEP: require-corp` site-wide | Blocks Google's cross-origin AdSense script and ad frames — ads could not load even if approved |
| 7 | AI humanizer marketed as "Bypass Rewriter" with "undetectable" keywords | Misleading capability claim |
| 8 | No `ads.txt`, no advertising section in the privacy policy, no cookie/third-party disclosure | Incomplete publisher disclosures |

## 3. Changes implemented

### 3.1 Removed fabricated content surfaces

- Deleted `src/lib/ai-articles/` (fabricated benchmark/review generator) and `src/app/ai-tools/article/` (305 review pages).
- Deleted `src/lib/articles/` and `src/app/articles/` (213 templated guides) and the article hub components.
- Deleted `src/app/blog/` (nine invented "we benchmarked" posts).
- Added permanent redirects:
  - `/articles` and `/articles/:slug` → `/tools`
  - `/ai-tools/article` → `/ai-tools`
  - `/ai-tools/article/:slug` → `/ai-tools/tool/:slug`
  - `/blog` → `/resources`
- Removed every internal link to the retired routes (header, footer, HTML sitemap, tool pages, IndexNow payload, QR template).

### 3.2 AI directory accuracy

- Removed `monthlyVisits`, `rating`, `reviewCount` and `verified` from the `AITool` type, all 305 records, the sort helper, the listing cards, the quick-view modal and the profile page.
- Removed `aggregateRating` from `SoftwareApplication` structured data.
- Removed "Monthly Traffic", "User Rating", "Verified" and "2,000+ Words • Verified 2026" UI.
- Removed the "Read Full Article" / technical-review CTAs.
- Added a per-profile disclosure that listing data is compiled from public information, is not independently benchmarked or ranked, and must be verified with the vendor.
- Removed "verified traffic" and "top-rated/verified" wording from directory category and index pages.

### 3.3 Tool documentation and claims

- The image compressor (the prompt's named example) no longer claims "without quality loss". Its description and FAQ now state that JPEG/WebP re-encoding is lossy, that results vary, and that PNG re-encoding is not automatically smaller.
- Tool pages no longer claim universal "unlimited" size, "zero bytes", "instant" processing or a universal multi-language interface. Limits are described as device/browser dependent.
- The competitor comparison table now uses "Typical cloud-upload tools / Varies by provider" instead of unsupported per-competitor claims.
- The "In-Depth Engineering Guide" section that linked to retired template guides was removed.
- The AI humanizer is now **AI Writing Clarity Editor** (same URL), with bypass/undetectable keywords and FAQ removed and an explicit statement that it does not defeat AI detectors.

### 3.4 Contact form

- Replaced the simulated timer with a real Netlify Forms POST (`form-name=contact`, URL-encoded body).
- Success is shown only after a successful HTTP response; failures show an error and a real email fallback.
- Added honeypot, label/input associations, `aria-pressed` topic buttons, min-length validation and email-format validation.

### 3.5 Privacy, terms and about

- Privacy policy rewritten against the implementation: local tool processing, the six actual `localStorage` keys, Netlify Forms processing, Netlify hosting logs, no separate analytics, and Google AdSense advertising cookies/identifiers/personalization.
- Included `adssettings.google.com`, `policies.google.com/technologies/partner-sites` and `aboutads.info/choices`, plus a clear statement that **no ad units are currently displayed** while the script is installed for review, and that a Google-certified consent message is required before personalized ads in consent regions.
- Terms expanded: acceptable use, per-tool limits, accuracy of calculations/generated content, intellectual property, third-party links, availability, advertising, liability and complaints.
- About rewritten with the real operator (Muhammad Daniyal, independent developer), how tools are built/tested, explicit "what we do not claim", and reporting routes. No invented company, registration or address.

### 3.6 Deployment and indexing

- Removed site-wide `Cross-Origin-Embedder-Policy` (no tool uses `SharedArrayBuffer`); kept COOP, nosniff, frame options and referrer policy.
- Added `public/ads.txt` with the publisher ID already present in the repository (`pub-5869892726772309`).
- Rewrote `sitemap.ts` to include only canonical pages: 570 URLs (11 static, 18 tool categories, 23 AI categories, 213 tool pages, 305 AI profiles). No retired guide/review URLs.
- Removed stale `public/robots.txt` / `public/robot.txt` duplicates; the dynamic `robots.ts` route is now authoritative and returns 200.
- Removed hardcoded/stale marketing counts in the footer, badges page and AI directory copy; counts now come from the registries.

## 4. Verification performed

| Check | Result |
|---|---|
| `npm run build` (clean `.next`) | **Pass** — TypeScript clean, 585 prerendered pages |
| Key routes (`/`, `/tools`, tool page, `/ai-tools`, AI profile, `/about`, `/contact`, `/privacy`, `/terms`, `/sitemap`, `/sitemap.xml`, `/robots.txt`, `/ads.txt`, `/manifest.webmanifest`, `/feed.xml`, `/api/health`) | **Pass** — all HTTP 200 |
| Every URL in `sitemap.xml` (570) | **Pass** — all HTTP 200 |
| Retired-route behaviour | **Pass** — 308 to `/tools`, `/ai-tools`, `/ai-tools/tool/:slug`, `/resources` |
| Fabricated markers (`Monthly Traffic`, `User Rating`, `aggregateRating`, `Verified`, `2,000+ Words`) | **Absent** from homepage and AI profile |
| False homepage claims (`Zero Ads`, `Sub-Second`, `bypass-ready`, `verified traffic`, `Completely free forever`) | **Absent** |
| Image compressor wording | `without quality loss` absent; lossy limitation present |
| Tool UI present in server HTML | **Pass** — tool controls render (no permanent loading placeholder) |
| Privacy disclosures | **Pass** — all three Google links, Netlify Forms, ad-unit status present |
| `ads.txt` served | **Pass** — single authorized Google line |
| Contact form markup | **Pass** — `data-netlify`, `form-name`, honeypot present |

## 5. Not tested / blocked

- **Individual tool functionality was not exercised in a browser.** Page rendering, server HTML and HTTP status were verified, but input/output correctness for 213 tools (canvas encoding, PDF parsing, video frame extraction, calculations, clipboard/download) was not run. No Playwright suite exists in the repository.
- **Contact delivery is not verified end-to-end.** Netlify Forms only processes a submission after deployment with form detection enabled. The code path, markup and failure handling were reviewed, but no live submission was made.
- **AdSense serving is not verified.** The script can now load without COEP interference, but ad units, account approval, a Google-certified CMP for EEA/UK/CH, and `ads.txt` validation by Google are account/deployment actions outside this repository.
- **AI directory factual accuracy is not fully verified.** Invented numeric metrics were removed, but per-product pricing, launch years and feature lists were not re-checked against every vendor site. Profiles now say so.
- **No deployment performed.** Netlify redirects/headers and form detection take effect only after deploy.

## 6. Remaining recommendations

1. Deploy to a preview, enable Netlify Form detection, submit the contact form, and confirm receipt before requesting review.
2. In AdSense, enable Google's consent management message for EEA/UK/CH and confirm `ads.txt` is fetched successfully.
3. Run a browser pass over the highest-traffic tools (image compressor, video-to-frames, PDF tools, JSON formatter, password generator) with real files and record results.
4. Spot-check AI directory pricing/URLs for the top 25 listings; remove or mark entries that cannot be verified.
5. Consider consolidating remaining "100% client-side"-style phrasing in individual tool definitions into "processed in your browser" for consistency with the privacy policy.
6. Add a small automated smoke test (HTTP status + presence of the tool control) to catch route regressions.

## 7. Files changed

- `ADSENSE-READINESS-REPORT.md` (new)
- `next.config.ts` — permanent redirects for retired routes
- `netlify.toml` — removed site-wide COEP; documented why
- `public/ads.txt` (new) — authorized Google seller record
- `public/robots.txt`, `public/robot.txt` — removed stale duplicates
- `src/app/layout.tsx` — removed absolute privacy claims from metadata
- `src/app/page.tsx` — corrected homepage claims, counts and AI positioning
- `src/app/about/page.tsx` — rewritten accuracy/ownership/reporting
- `src/app/privacy/page.tsx` — rewritten with advertising/local-storage/form disclosures
- `src/app/terms/page.tsx` — expanded terms and limitations
- `src/app/contact/contact-client.tsx` — real Netlify Forms submission, validation, error states
- `src/app/sitemap.ts` — canonical-only sitemap
- `src/app/sitemap/page.tsx` — removed retired guide link and stale category count
- `src/app/api/indexnow/route.ts` — removed retired URLs
- `src/app/ai-tools/tool/[slug]/page.tsx` — removed fabricated stats, schema rating and article CTAs
- `src/app/ai-tools/ai-tools-client.tsx` — removed traffic/rating sort, badges, article links
- `src/app/ai-tools/[category]/page.tsx` — removed verified/traffic/rating claims
- `src/app/ai-tools/categories/page.tsx` — removed "verified listings" claim
- `src/app/badges/badge-copy-section.tsx` — removed stale counts and absolute privacy badge title
- `src/app/manifest.ts` — removed absolute privacy claim
- `src/components/layout/header.tsx` — nav points to `/resources`; accurate image alt/title
- `src/components/layout/footer.tsx` — removed retired links and absolute claims
- `src/components/tools/tool-page.tsx` — accurate processing/limit statements, removed guide bridge and competitor claims
- `src/tools/image/image-compressor.definition.ts` — corrected lossy-compression and file-size claims
- `src/tools/ai/ai-humanizer.definition.ts` — repositioned as clarity editor
- `src/tools/ai/ai-humanizer.tsx` — updated UI copy
- `src/tools/generators/bulk-qr-generator.tsx` — retired URL replaced in template
- `src/lib/ai-directory/database.ts` — removed invented traffic/rating/review/verified fields and sort logic
- `src/lib/ai-directory/types.ts` — removed corresponding fields
- Deleted: `src/app/articles/`, `src/lib/articles/`, `src/components/articles/`, `src/app/ai-tools/article/`, `src/lib/ai-articles/`, `src/components/ai/ai-articles-client-hub.tsx`, `src/app/blog/`
