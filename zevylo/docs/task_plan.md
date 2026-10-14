# Task Plan: Toolify.ai Full Integration & Search Engine Benchmark Completion

## Goal
Conduct an exhaustive A-to-Z scan of Toolify.ai and top search engine utility sites, identify all missing categories, directory features, and interactive tools, and integrate them into Zevylo with 100% client-side privacy, zero breaking changes, and zero errors ("galti sa be koi be galti nai hone chaye").

## Proposed Phases
- [x] Phase 1: Toolify.ai & Search Engine Audit (Completed - documented in `findings.md`)
- [x] Phase 2: Create Implementation Plan Artifact & Await User Sign-Off (Completed)
- [x] Phase 3: Toolify.ai Taxonomy & Directory Expansion
  - Add 5 missing AI categories in `src/lib/ai-directory/categories.ts` (Total 23 categories)
  - Add A-to-Z Alphabetical Quick-Jump Filter in `src/app/ai-tools/ai-tools-client.tsx`
  - Expand `src/lib/ai-directory/database.ts` with 63 frontier tools covering letters A through Z (Total 107 tools)
  - Implement dedicated category landing pages (`src/app/ai-tools/[category]/page.tsx`)
  - Implement dedicated tool profile pages (`src/app/ai-tools/tool/[slug]/page.tsx`)
- [x] Phase 4: Implement 5 New Interactive In-Browser AI Utility Tools
  - `ai-presentation-generator` (`.definition.ts`, `.tsx`)
  - `ai-email-subject-line-generator` (`.definition.ts`, `.tsx`)
  - `ai-bio-generator` (`.definition.ts`, `.tsx`)
  - `ai-excel-formula-generator` (`.definition.ts`, `.tsx`)
  - `ai-faq-schema-generator` (`.definition.ts`, `.tsx`)
  - Register in `src/tools/ai/index.ts`
- [x] Phase 5: Implement 3 Search Engine Missing Utility Tools
  - `color-palette-generator` in `src/tools/color/`
  - `html-to-markdown` in `src/tools/converters/`
  - `slug-to-title-converter` in `src/tools/text/`
  - Register in respective category index files
- [x] Phase 6: Global System Wiring & Icon Mapping
  - Dynamic imports in `src/lib/tools/component-map.tsx`
  - Icon definitions in `src/components/tools/tool-icon.tsx`
  - Update `sitemap.ts` with AI directory & profile routes
- [x] Phase 7: Verification & Testing
  - Run `npx tsc --noEmit` (0 compilation errors)
  - Run `node scripts/generate-tool-docs.mjs` (206 tools, 0 duplicate slugs)
  - Smoke test new routes via `Invoke-WebRequest` (all 200 OK)
  - Verify zero instances of "Ezgif" remain on video-to-jpg

## Decisions
| Decision | Rationale | Date |
|---|---|---|
| Expand AI Categories from 18 to 23 | Aligns 100% with Toolify.ai's comprehensive industry taxonomy | 2026-10-14 |
| Add A-to-Z alphabetical bar to `/ai-tools` | Directly satisfies user's request for complete A-to-Z Toolify discovery | 2026-10-14 |
| Dedicated `/ai-tools/[category]` and `/ai-tools/tool/[slug]` routes | Generates programmatic SEO pages matching Toolify.ai's organic search dominance | 2026-10-14 |
| 5-touchpoint recipe for 8 new interactive tools | Ensures zero runtime rendering or routing failures | 2026-10-14 |
