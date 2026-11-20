# Header Component

## Overview
The main website header component that appears at the top of pages. Typically contains logo, navigation links, and user actions.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Header content/nested components |
| `logoSrc` | `string` | `/logo.svg` | Logo image source |
| `logoAlt` | `string` | `"Zeviylo"` | Logo alternative text |
| `showSearch` | `boolean` | `true` | Whether to show search toggle |
| `showUserMenu` | `boolean` | `true` | Whether to show user dropdown |
| `className` | `string` | `""` | Additional CSS classes |

## Typical Structure
```
[Logo] [Navigation Links] [Search] [User Menu]
```

## Navigation Links (Typical)
- Home
- Tools
- Articles
- Blog
- Contact

## Technical Details
- **Location**: `src/components/layout/header.tsx`
- **Dependencies**: 
  - `react`, `react-dom`
  - `next/navigation` (for Link/navigation)
  - `src/components/ui/button` (for action buttons)
  - `src/components/ui/input` (for search input)
  - `tailwindcss` v4

## Responsive Behavior
- **Desktop**: Full navigation bar with all links
- **Mobile**: Hamburger menu that expands to show navigation
- **Search**: Collapses into search icon on mobile
- **User menu**: Dropdown that slides in on mobile

## Usage Example
```tsx
<Header 
  logoSrc="/zeviylo-logo.svg"
  logoAlt="Zeviylo Logo"
  showSearch={true}
  showUserMenu={true}
/>
```

## Best Practices
- Keep height consistent across breakpoints
- Ensure navigation is accessible (keyboard focus)
- Mobile menu should close on link selection
- Logo should link back to home page
- Search focus should move to input when opened