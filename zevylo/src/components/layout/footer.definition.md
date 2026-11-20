# Footer Component

## Overview
The website footer that appears at the bottom of pages. Contains copyright information, links, and social contacts.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Footer content/nested links |
| `showCopyright` | `boolean` | `true` | Whether to show copyright text |
| `year` | `number` | `new Date().getFullYear()` | Current year for copyright |
| `className` | `string` | `""` | Additional CSS classes |

## Typical Footer Structure
```
┌─────────────────────────────────────────────┐
│  •  Home  •  Tools  •  Articles  •  Blog   │
│                                             │
│  © 2024 Zeviylo. All rights reserved.      │
│  •  Privacy   •  Terms   •  Contact         │
│  •  GitHub    •  Twitter   •  LinkedIn      │
└─────────────────────────────────────────────┘
```

## Link Sections
- **Quick Links**: Home, Tools, Articles, Blog
- **Company**: About, Careers, Press
- **Legal**: Privacy Policy, Terms of Service
- **Social**: GitHub, Twitter, LinkedIn icons

## Technical Details
- **Location**: `src/components/layout/footer.tsx`
- **Dependencies**: 
  - `react`, `react-dom`
  - `tailwindcss` v4 for styling
  - `src/components/ui/link` (if custom link component)

## Responsive Behavior
- **Desktop**: Multi-column layout with link groups
- **Mobile**: Single column, stacked vertically
- **Compact**: Reduced padding and font sizes

## Usage Example
```tsx
<Footer>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div>
      <h4>Zeviylo</h4>
      <p>Video tools and media processing</p>
    </div>
    <div>
      <h4>Products</h4>
      <ul>
        <li><Link href="/tools">All Tools</Link></li>
        <li><Link href="/blog">Blog</Link></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul>
        <li><Link href="/privacy">Privacy</Link></li>
        <li><Link href="/terms">Terms</Link></li>
      </ul>
    </div>
  </div>
  <div className="mt-8 pt-8 border-t">
    <p>© {new Date().getFullYear()} Zeviylo. All rights reserved.</p>
  </div>
</Footer>
```

## Best Practices
- Keep footer height reasonable (not too tall)
- Ensure link text is readable (contrast)
- Include essential links only (don't duplicate full navigation)
- Copyright year should be dynamic
- Social links should open in new tab with rel="noopener"
- Test footer on mobile - ensure touch targets are adequate