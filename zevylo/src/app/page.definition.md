# Home Page (Root)

## Overview
The main landing page of the Zeviylo website. Serves as the entry point and typically showcases featured tools, recent articles, or a value proposition.

## Path
```
/
```

## Page Structure
```
────────────────────────────────────────────
│  Header (sticky or integrated)            │
│                                             │
│  │  Hero Section                            │
│  │  │  Primary headline                     │
│  │  │  Secondary tagline                    │
│  │  │  Primary CTA button (primary variant) │
│  │  │  Secondary CTA or features highlight  │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Featured Tools Showcase                 │
│  │  │  Grid of 3-4 featured tool thumbnails  │
│  │  │  Uses next/image with WebP/AVIF       │
│  │  │  Lazy-loaded, code-split tool access   │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Recent Articles / Blog Posts             │
│  │  │  List of 3-5 latest articles          │
│  │  │  Titles, excerpts, "Read more" links  │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Quick Navigation / Categories             │
│  │  │  Links to tools categories            │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  Footer                                     │
────────────────────────────────────────────
```

## Key Sections

### Hero Section
- **Headline**: Value proposition (e.g., "Free Video Tools for Everyone")
- **Tagline**: Supporting text explaining the purpose
- **Primary CTA**: "Explore Tools" → links to /tools
- **Secondary action**: "Read latest blog" → links to /blog

### Featured Tools Showcase
- Grid layout of popular tool thumbnails
- Each uses `<NextImage>` with `priority` for above-the-fold
- Hover effects or subtle animations
- On-click opens respective tool page (code-split lazy load)

### Recent Content
- Cards or list of recent blog/articles
- Shows title, date, brief excerpt
- "Read more" continues to full content page

## SEO Elements
- **Title tag**: "Zeviylo - Free Video Processing Tools"
- **Meta description**: Summary of what the site offers
- **Open Graph**: Site-level tags for social sharing
- **Twitter card**: Website card summary

## Performance Considerations
- **Above-the-fold optimization**: Hero image with `priority` prop
- **Critical CSS**: Inline above-the-fold styles
- **Image formats**: WebP/AVIF via next/image
- **Lazy loading**: Below-the-fold content loads on interaction
- **Core Web Vitals**: Monitor LCP (hero image), CLS (image dimensions)

## Data Fetching
- May use `generateStaticParams` if having dynamic route from root
- Fetches featured/tools data from database or static data
- Can use ISR (revalidate: 60) for dynamic content

## Example Static Data
```javascript
// Featured tools (might be hardcoded or fetched)
const featuredTools = [
  { name: "Video Trimmer", slug: "video-trimmer", icon: "scissors" },
  { name: "MP4 to MP3", slug: "mp4-to-mp3", icon: "music" },
  { name: "Video to GIF", slug: "video-to-gif", icon: "gif" },
]
```

## Usage
```tsx
// In app/page.tsx or default export
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedTools />
      <RecentContent />
    </main>
  )
}
```

## Related Files
- `src/app/tools/page.tsx` - Tools listing page
- `src/app/blog/page.tsx` - Blog listing page
- `src/components/ui/hero.tsx` (if separate hero component)
- `src/lib/tools/categories.ts` - Tools categories data