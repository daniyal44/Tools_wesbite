# About Page

## Overview
The "About" page that provides information about the Zeviylo project, its mission, and the team behind it.

## Path
```
/about
```

## Page Structure
```
────────────────────────────────────────────
│  Header                                      │
│                                             │
│  │  Hero Section / Page Title               │
│  │  │  "About Zeviylo"                     │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Mission & Vision                       │
│  │  │  What the project is about           │
│  │  │  Core values and goals               │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  How It Works                         │
│  │  │  Brief explanation of video tools     │
│  │  │  FFmpeg-powered, client-side processing│
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Team / Credits                       │
│  │  │  Creator: Muhammad Daniyal          │
│  │  │  Contact: m.daniyalkhan490@gmail.com │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Quick Stats (optional)               │
│  │  │  • Number of tools: 30+             │
│  │  │  • Monthly users: [if available]    │
│  │  │  • Processing power: client-side     │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Technology Stack                     │
│  │  │  Next.js 16, React 19, Tailwind CSS 4│
│  │  │  FFmpeg, @ffmpeg/ffmpeg             │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Call to Action                       │
│  │  │  "Try a tool" → /tools              │
│  │  │  "Read blog" → /blog                │
│  │  └───────────────────────────────────────┘
│  └────────────────────────────────────────────
│  Footer                                      │
────────────────────────────────────────────
```

## Content Sections

### Mission & Vision
- **Mission**: "Provide free, accessible video processing tools for everyone"
- **Vision**: "Be the go-to platform for simple video manipulation without software installation"

### How It Works
- Client-side FFmpeg processing via `@ffmpeg/ffmpeg`
- No server-side video processing (privacy-friendly)
- Browser-based, works on most modern devices
- Files not uploaded to server (optional: explain data privacy)

### Technology Stack
- **Framework**: Next.js 16.3.8 with App Router
- **UI**: React 19, Tailwind CSS v4
- **Video Processing**: @ffmpeg/ffmpeg, @ffmpeg/util
- **Styling**: Custom Tailwind designs
- **Deployment**: Netlify (based on homepage URL)

### Team Section
- **Creator**: Muhammad Daniyal
- **Contact**: m.daniyalkhan490@gmail.com
- **GitHub**: @daniyal44 (mentioned in package.json)
- **Project Type**: Open source / personal project

### Technology Stack Visual
- Logos or badges for: Next.js, React, Tailwind, FFmpeg
- May use `src/components/ui/badge` component

### CTA (Call to Action)
- Primary: "Explore 30+ Video Tools" → links to /tools
- Secondary: "Read Our Blog" → links to /blog

## SEO Elements
- **Title tag**: "About Zeviylo - Free Video Processing Tools"
- **Meta description**: "Learn about Zeviylo, a platform for free video processing tools built with Next.js and FFmpeg"
- **H1**: "About Zeviylo"
- **Open Graph**: Project description, image if available
- **Twitter card**: About page summary

## Performance Considerations
- **Static page**: Can be fully static (generateStaticParams not needed)
- **Minimal JavaScript**: Mostly content; interactivity limited
- **Image optimization**: Any hero image uses next/image
- **Fast load**: Text-heavy page, quick to render

## Usage Example
```tsx
import { AboutPage } from '@/app/about/page'

export default function About() {
  return (
    <main>
      <h1>About Zeviylo</h1>
      {/* Content structured as described above */}
    </main>
  )
}
```

## Related Files
- `src/app/about/page.tsx` - Actual page implementation
- `src/components/ui/stat-card.tsx` (if stats displayed)
- `src/components/ui/badge.tsx` (for tech stack logos)
- `src/lib/ai-directory/database.ts` (if showing user stats)