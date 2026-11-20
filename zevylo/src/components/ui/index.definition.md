# UI Components Index

## Overview
Centralized index of all UI components used throughout the Zeviylo website. Importable from `src/components/ui/index`.

## Export Map
All UI components are re-exported from this barrel file for convenient importing.

## Available Components

### Atom Components (Basic Styles)
| Component | Export Path | Description |
|-----------|-------------|-------------|
| `Button` | `./button` | Interactive button component |
| `Input` | `./input` | Text input field |
| `Textarea` | `./textarea` | Multi-line text input |
| `Select` | `./select` | Dropdown selector |
| `Badge` | `./badge` | Small status label |

### Layout Components
| Component | Export Path | Description |
|-----------|-------------|-------------|
| `Header` | `./header` | Main website header |
| `Footer` | `./footer` | Website footer |
| `Navbar` | `./navbar` | Navigation bar |
| `Sidebar` | `./sidebar` | Page sidebar |

### Form Components
| Component | Export Path | Description |
|-----------|-------------|-------------|
| `Input` | `./input` | Styled input field |
| `Textarea` | `./textarea` | Styled textarea |
| `Select` | `./select` | Styled dropdown |
| `Form` | `./form` (if exists) | Form container |

### Utility Components
| Component | Export Path | Description |
|-----------|-------------|-------------|
| `Toast` | `./toast` | Notification toast |
| `Dialog` | `./dialog` | Modal dialog |
| `Skeleton` | `./skeleton` | Loading placeholder |
| `Card` | `./card` | Content card container |

### Page-Specific Components
| Component | Export Path | Description |
|-----------|-------------|-------------|
| `Hero` | (hero variations) | Hero section variations |
| `StatCard` | (if used) | Statistics display card |

## Import Examples

### Named Import
```tsx
import { Button, Input, Header, Footer } from '@/components/ui'
```

### Individual Import
```tsx
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Input } from '@/components/ui/input'
```

### Default Import (if configured)
```tsx
import Button from '@/components/ui/button'
```

## Recommended Import Pattern
```tsx
// At the top of component files
import {
  Button,
  Input,
  Header,
  Footer,
  Card,
  Skeleton,
} from '@/components/ui'
```

## Component Dependencies

### Tailwind CSS v4
All components rely on Tailwind CSS v4 for styling. Ensure:
- `tailwind.config.mjs` includes all component content paths
- `className` props are used for custom styling
- Responsive variants work correctly

### React Context (if applicable)
- `ThemeProvider` from `src/components/ui/theme-provider` for dark mode
- Some components may consume theme context

## Development Guidelines

### Adding New Components
1. Create component file in `src/components/ui/`
2. Add export to `src/components/ui/index.ts` (or `.md` if using documentation pattern)
3. Update `tailwind.config.mjs` `content:` array to include new component paths
4. Test on mobile and desktop breakpoints

### Styling Conventions
- Use `className` prop for styling (Tailwind v4 pattern)
- Follow existing component patterns (variant, size props)
- Ensure accessibility (aria-labels, keyboard navigation)
- Test color contrast for all variants

## Usage Across Pages

### Home Page
- `Button` (hero CTA, featured tools)
- `Header` (sticky header)
- `Footer` (always present)
- `Skeleton` (loading placeholders)

### Tools Page
- `Button` (tool cards CTA)
- `Sidebar` (categories filter)
- `Card` (tool card containers)
- `Header`, `Footer`

### Article/Blog Pages
- `Header`, `Footer`
- `Sidebar` (related posts, tags)
- `Toast` (success messages, errors)

### Contact Page
- `Input` (name, email, subject)
- `Textarea` (message)
- `Button` (send form)
- `Toast` (form success/error)

## Performance Notes
- All components are client-side only (no server dependencies)
- No external CSS dependencies beyond Tailwind
- Import only what's needed (tree-shaking friendly)
- Consider dynamic imports for pages with many components

## Related Documentation
- `button.definition.md` - Button component details
- `header.definition.md` - Header component details
- `footer.definition.md` - Footer component details
- `navbar.definition.md` - Navbar details
- `sidebar.definition.md` - Sidebar details