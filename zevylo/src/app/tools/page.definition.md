# Tools Page

## Overview
The main tools listing page that displays all available video processing tools. Users can browse and navigate to individual tool pages.

## Path
```
/tools
```

## Page Structure
```
────────────────────────────────────────────
│  Header                                      │
│                                             │
│  │  Page Header / Title                     │
│  │  │  "All Tools" or "Video Tools"         │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Tools Grid / List                       │
│  │  │  Grid layout of all tool cards        │
│  │  │  Each card:                          │
│  │  │  │  • Tool icon/thumbnail             │
│  │  │  │  • Tool name                       │
│  │  │  │  • Brief description (1-2 lines)   │
│  │  │  │  • "Try it" or "Learn more" button │
│  │  │  └───────────────────────────────────┘│
│  │  │  Grid columns: 2 on mobile, 3 on md, 4+ on lg │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Filter / Category Selection (optional)  │
│  │  │  Category tabs or dropdown           │
│  │  │  Filter by: trimming, conversion, etc │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Search bar (optional)                  │
│  │  │  Filter tools by name or functionality│
│  │  └───────────────────────────────────────┘
│  └────────────────────────────────────────────
│  Footer                                      │
────────────────────────────────────────────
```

## Tools Cards Structure
Each tool card typically contains:
- **Icon or thumbnail**: Represents the tool functionality
- **Tool name**: e.g., "Video Trimmer", "MP4 to MP3"
- **Description**: Brief what the tool does
- **CTA button**: "Try Now" or "Learn More"
- **On click**: Navigates to `/tools/[category]/[slug]` or opens tool modal

## Tool Categories (Typical)
Based on the video tools directory:
- **Trimming & Cutting**: video-trimmer, cut-video
- **Format Conversion**: video-to-mp4, gif-to-mp4, mp4-to-mp3
- **Editing & Effects**: reverse-video, rotate-video, mute-video
- **Enhancement**: video-speed-changer, video-quality-checker
- **Extraction**: video-to-frames, video-to-jpg, video-to-png
- **Recording**: screen-recorder

## Search and Filtering
- **Search**: Input field to search tools by name
- **Category tabs**: Toggle between tool categories
- **Sort options**: Alphabetical, newest, most popular

## SEO Elements
- **Title tag**: "Zeviylo - Free Online Video Tools"
- **Meta description**: "Collection of free video processing tools - trim, convert, compress, and more"
- **H1 heading**: "Video Processing Tools"
- **Filters/aspect**: Add filter state to URL if relevant

## Performance Considerations
- **Grid layout**: CSS grid or flexbox for optimal loading
- **Image optimization**: All tool thumbnails use `<NextImage>` with `formats: ['image/webp', 'image/avif']`
- **Lazy loading**: Below-the-fold tools load on scroll
- **Code splitting**: Individual tool pages code-split (dynamic imports)
- **Server-side**: If tools are many, consider ISR with revalidation

## Empty State
- If no tools available: Show message "No tools found" or "Coming soon"
- Provide link to contact page or join newsletter

## Pagination (if many tools)
- Load more button or infinite scroll
- Or limit to first 12-16 tools, show "View all"

## Usage Example
```tsx
import { ToolsPage } from '@/app/tools/page'

export default function ToolsPage() {
  return (
    <section className="pt-8">
      <ToolsGrid />
      {/* or */}
      <ToolsList />
    </section>
  )
}
```

## Related Files
- `src/app/tools/[category]/page.tsx` - Category-specific tools page
- `src/app/tools/[category]/[slug]/page.tsx` - Individual tool page
- `src/lib/tools/categories.ts` - Categories configuration
- `src/lib/tools/component-map.tsx` - Component registry/map
- `src/components/tools/` - Tool component definitions