# Sidebar Component

## Overview
Sidebar component typically used on inner pages (tools, articles) for navigation, categories, or additional links. May be hidden on mobile devices.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Sidebar content |
| `title` | `string` | `""` | Sidebar section title |
| `collapsible` | `boolean` | `false` | Whether sidebar can be collapsed |
| `mobileHidden` | `boolean` | `false` | Hide on mobile devices |
| `className` | `string` | `""` | Additional CSS classes |
| `onToggle` | `(open: boolean) => void` | - | Callback when collapse/expand |

## Typical Sidebar Structure
```
────────────────────────────────────────────
│  [Title]                                     │
│  │                                           │
│  │  • Nav Item 1                             │
│  │  │  • Nav Item 2                           │
│  │  │  • Nav Item 3                           │
│  │  │  • ...                                  │
│  │  └───────────────────────────────────────┘
│  │                                           │
│  │  [Optional: CTA or Search]               │
│  └────────────────────────────────────────────
────────────────────────────────────────────
```

## Common Uses

### Tools Page Sidebar
- Category filters for tools
- Popular tags
- Featured/premium tools section

### Articles/Blog Sidebar
- Related articles
- Tags/categories
- Newsletter signup

### General Sidebar
- Navigation links
- Social profiles
- Quick links

## Collapsible Behavior
- **Desktop**: Can be collapsed/expanded via toggle button
- **Mobile**: Usually hidden; accessible via main menu
- **Toggle button**: Typically shown on desktop, hidden on mobile

## Technical Details
- **Location**: `src/components/layout/sidebar.tsx` (or similar)
- **Dependencies**: 
  - `react`, `react-dom`
  - `tailwindcss` v4 for responsive layout
  - `src/components/ui/button` (for toggle button)
  - `lucide-react` for icons (menu, close, arrows)

## Responsive Behavior
- **Desktop (lg+)**: Visible sidebar on left or right side
- **Tablet (md)**: Collapsible - show/hide toggle
- **Mobile (sm)**: Hidden by default; accessible via hamburger menu

## Usage Example
```tsx
<Sidebar title="Tools Categories" collapsible>
  <NavItem asChild>
    <Button variant="outline" size="sm">All Tools</Button>
  </NavItem>
  <NavItem href="/tools/video-trimming">Video Trimming</NavItem>
  <NavItem href="/tools/format-conversion">Format Conversion</NavItem>
</Sidebar>
```

## Best Practices
- Don't make sidebar too wide (limit max width)
- Ensure touch targets are adequate for mobile
- Collapse button should be accessible (aria-expanded)
- Keep sidebar content scrolled independently if needed
- On mobile, consider full-screen modal instead of sidebar