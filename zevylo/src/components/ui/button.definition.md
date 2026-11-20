# Button Component

## Overview
A stylized button component built with Tailwind CSS v4. Used throughout the website for actions, forms, and navigation.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content |
| `variant` | `"default" | "primary" | "secondary"` | `"default"` | Button style variant |
| `size` | `"sm" | "md" | "lg"` | `"md"` | Button size |
| `asChild` | `boolean` | `false` | Render as child element |
| `disabled` | `boolean` | `false` | Disable button |
| `onClick` | `(e: React.MouseEvent) => void` | - | Click handler |
| `className` | `string` | `""` | Additional CSS classes |

## Variants
- **default**: Standard button with base styles
- **primary**: Primary action button (colored background)
- **secondary**: Secondary action (outlined or subtle)

## Sizes
- **sm**: Small button for compact interfaces
- **md**: Medium button (default)
- **lg**: Large button for emphasis

## Usage Examples
```tsx
// Default button
<Button>Click me</Button>

// Primary variant
<Button variant="primary">Submit</Button>

// Secondary variant
<Button variant="secondary">Cancel</Button>

// Large size
<Button size="lg">Save Changes</Button>

// Disabled
<Button disabled>Disabled</Button>

// With asChild
<Badge asChild>...</Badge>
```

## Technical Details
- **Location**: `src/components/ui/button.tsx`
- **Dependencies**: 
  - `react`, `react-dom`
  - `tailwindcss` v4 (uses `className` prop styling)
- **Exports**: `Button` component

## Best Practices
- Use `variant="primary"` for main call-to-action buttons
- Use `variant="secondary"` for cancel or secondary actions
- Reserve `size="lg"` for important actions
- Always provide accessible text (aria-label or meaningful children)