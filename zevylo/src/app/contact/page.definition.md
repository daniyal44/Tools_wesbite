# Contact Page

## Overview
The contact page allows users to get in touch, provide feedback, or ask questions about Zeviylo and its video tools.

## Path
```
/contact
```

## Page Structure
```
────────────────────────────────────────────
│  Header                                      │
│                                             │
│  │  Hero Section / Page Title               │
│  │  │  "Get in Touch"                      │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Contact Form                           │
│  │  │  • Name field (required)             │
│  │  │  • Email field (required, validate)  │
│  │  │  • Subject dropdown or input         │
│  │  │  • Message textarea (required)       │
│  │  │  • Send button (primary variant)     │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Alternative Contact Methods           │
│  │  │  • Email address: m.daniyalkhan490@gmail.com │
│  │  │  • GitHub: @daniyal44                │
│  │  │  • Twitter/X (if applicable)         │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Quick Help / FAQ Links                │
│  │  │  • Common questions link             │
│  │  │  • Documentation link                │
│  │  └───────────────────────────────────────┘
│  │                                             │
│  │  Response Time Info                    │
│  │  │  • Typical response: 2-3 business days│
│  │  └───────────────────────────────────────┘
│  └────────────────────────────────────────────
│  Footer                                      │
────────────────────────────────────────────
```

## Form Fields

### Name
- **Type**: Text input
- **Required**: Yes
- **Placeholder**: "Your name"
- **Validation**: Minimum 2 characters

### Email
- **Type**: Email input
- **Required**: Yes
- **Placeholder**: "your.email@example.com"
- **Validation**: Valid email format

### Subject
- **Type**: Select or text input
- **Options**: 
  - "Tool Feedback"
  - "Feature Request"
  - "Bug Report"
  - "General Inquiry"
  - "Other"

### Message
- **Type**: Textarea
- **Required**: Yes
- **Placeholder**: "How can I help you? or describe your issue..."
- **Rows**: 4-5 rows minimum
- **Validation**: Minimum 10 characters

### Send Button
- **Variant**: Primary
- **Text**: "Send Message"
- **Loading state**: Show spinner when submitting
- **Success state**: "Message sent!" or similar

## Alternative Contact Methods

### Email
- Direct email: `m.daniyalkhan490@gmail.com`
- May use `mailto:` link

### GitHub
- Profile link: `@daniyal44`
- May include GitHub stats or repositories

### Social Media
- Twitter/X handle (if applicable)
- LinkedIn (if applicable)
- Icons with `target="_blank"` and `rel="noopener"`

## FAQ Links
- Link to common questions section
- May expand to accordion or link to `/blog` FAQ posts
- Topics: "How do I use the tools?", "Is my data safe?", "Are tools free?"

## Response Expectation
- "We typically respond within 2-3 business days"
- "Please include your email for a direct response"
- Optional: Show average response time statistic

## SEO Elements
- **Title tag**: "Contact Zeviylo | Get Support"
- **Meta description**: "Contact the Zeviylo team for support, feedback, or questions about our video tools"
- **H1**: "Contact Us"
- **Schema**: ContactPoint or ContactLocation if applicable

## Performance Considerations
- **Form**: May use simple HTML form or React Hook Form
- **No heavy JavaScript**: Form page should be lightweight
- **Error handling**: Client-side validation before submit
- **Accessibility**: Form fields properly labeled, error announcements

## Spam Protection
- **Honeypot field**: Invisible field to catch bots
- ** reCAPTCHA** (if needed, adds overhead)
- **Time-based validation**: Prevent instant submissions

## Usage Example
```tsx
import { ContactPage } from '@/app/contact/page'

export default function Contact() {
  return (
    <section className="pt-8">
      <ContactForm />
      <ContactInfo />
    </section>
  )
}
```

## Related Files
- `src/app/contact/page.tsx` - Actual page implementation
- `src/components/ui/form.tsx` or individual form components
- `src/components/ui/input.tsx` (for name, email, subject fields)
- `src/components/ui/textarea.tsx` (for message field)
- `src/components/ui/button.tsx` (for send button)