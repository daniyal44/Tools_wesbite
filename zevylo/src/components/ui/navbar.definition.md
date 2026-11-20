# Navbar Component

## Overview
The navigation bar component that provides site navigation. Can be standalone or part of the header.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Navigation links |
| `variant` | `"default" | "sticky" | "floating"` | `"default"` | Navbar style/variant |
| `logo` | `ReactNode` | - | Logo element or JSX |
| `onSearchToggle` | `() => void` | - | Callback for search toggle |
| `className` | `string` | `""` | Additional CSS classes |

## Navigation Items (Typical Structure)
```tsx
<Navbar>
  <NavItem href="/">Home</NavItem>
  <NavItem href="/tools">Tools</NavItem>
  <NavItem href="/articles">Articles</NavItem>
  <NavItem href="/blog">Blog</NavItem>
  <NavItem href="/contact">Contact</NavItem>
</Navbar>
```

## Variants
- **default**: Standard navbar with links
- **sticky**: Stays visible on scroll
- **floating**: Floating action-style navbar

## Technical Details
- **Location**: `src/components/layout/navbar.tsx` or integrated within header
- **Dependencies**: 
  - `react`, `react-dom`
  - `next/navigation` for Link components
  - `tailwindcss` v4 for styling
  - `src/components/ui/button` for action buttons

## Responsive Behavior
- **Desktop**: Horizontal layout with all links visible
- **Mobile**: Hamburger menu that toggles navigation
- **Search integration**: May include search form or toggle button

## Usage Example
```tsx
<Navbar>
  <NavItem asChild>
    <Button variant="outline" size="sm">Search</Button>
  </NavItem>
  <NavItem href="/tools">Tools</NavItem>
</Navbar>
```

## Best Practices
- Keep link text concise
- Active link should have clear visual indication
- Dropdown items should be grouped logically
- Accessible focus management for keyboard navigation