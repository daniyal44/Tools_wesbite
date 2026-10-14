# 📜 Changelog

All notable changes to the **Zevylo** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-10-14

### 🚀 Initial Public Release

#### ✨ Core Platform & Architecture
- **Next.js 16 App Router & React 19**: Modern full-stack architecture with static generation, zero runtime lag, and instant page transitions.
- **Tailwind CSS v4 Design System**: Responsive, accessible, high-contrast Dark & Light mode theme support.
- **Universal Route Engine (`/tool/[slug]`)**: Dynamic shell rendering metadata, breadcrumbs, JSON-LD schemas, and FAQ accordions for all tools.
- **Dynamic Lazy Loading**: Tools loaded on-demand via `next/dynamic` to ensure sub-100ms First Contentful Paint.
- **Live Codebase Graph CI**: Automated Mermaid architecture generation syncing repository stats on every commit.

#### 🧰 206+ Built-in In-Browser Tools
- **Image Suite (34 Tools)**: HEIC converter, WebP converter, bulk image processor, transparent background remover, resizer, cropper, filter studio, favicon generator, ASCII art maker, and meme generator.
- **Developer Suite (27 Tools)**: JSON validator, SQL formatter, RegEx tester, Base64 encoder, code diff comparison, JWT debugger, UUID/ULID generator, crontab calculator, and HTML entity decoder.
- **Calculators & Math (19 Tools)**: Financial calculators, mortgage estimator, percentage calculator, BMI & TDEE calculators, date difference calculator, and GPA calculator.
- **Text & Writing (19 Tools)**: Word counter, case converter, slug generator, markdown table generator, text diff, bionic reading converter, duplicate line remover, and lorem ipsum generator.
- **Video & GIF (17 Tools)**: FFmpeg WebAssembly video trimmer, MP4 to MP3 extractor, video to GIF, frame extractor, speed changer, video reverser, and screen recorder.
- **AI Utility Suite (17 Tools)**: AI presentation generator, prompt optimizer, bio generator, Excel formula builder, and FAQ schema generator.
- **Frontier AI Directory**: Curated A-to-Z directory cataloging 100+ top industry AI tools with dedicated profile pages.
- **SEO & Web Utilities (11 Tools)**: SERP previewer, OpenGraph generator, Twitter card creator, robots.txt builder, XML sitemap creator, and meta tag generator.
- **Converters (10 Tools)**: Unit converter, currency converter, color format converter, and number base encoder.
- **PDF Suite (9 Tools)**: PDF merger, PDF splitter, watermarker, rotator, page numberer, and metadata cleaner.
- **Audio Suite (8 Tools)**: Audio cutter, tone generator, BPM tap counter, pitch shifter, and sound recorder.
- **Productivity & Utilities**: Pomodoro timer, sprint retro board, digital signature pad, coin flipper, and bulk file renamer.

#### 🔒 Security & Privacy
- **100% Client-Side Privacy**: All file processing occurs inside browser WebAssembly and Canvas memory. Zero user files ever touch external cloud servers.
- **Multi-threaded WebAssembly**: COOP and COEP cross-origin isolation enabled for high-performance FFmpeg rendering.
