import { ToolDefinition } from '@/lib/tools/types';

export const colorGeneratorDefinition: ToolDefinition = {
  id: 'color-generator',
  slug: 'color-generator',
  name: 'Color Palette Generator (Harmonies & Schemes)',
  shortDescription: 'Generate harmonious 5-color aesthetic palettes with spacebar randomizer, lock swatches, and CSS/JSON export.',
  longDescription: 'Create stunning color schemes for web design, branding, and illustration. Supports Analogous, Monochromatic, Triadic, and Complementary harmony algorithms. Lock individual colors, test contrast accessibility, and export directly as CSS custom properties or JSON.',
  category: 'color',
  icon: 'palette',
  keywords: ['color palette generator', 'color generator', 'random color palette', 'color schemes', 'coolors alternative', 'hex color palette'],
  searchableText: 'color palette generator color generator random colors harmony analogous triadic complementary monochromatic css variables hex export',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Color Palette Generator — Create Harmonious Color Schemes | Zevylo',
    description: 'Generate beautiful aesthetic color palettes with one click or spacebar. Lock favorite colors and copy hex codes or CSS variables instantly.',
    keywords: ['color palette generator', 'color scheme maker', 'random palette generator', 'hex color picker'],
  },
  faq: [
    {
      question: 'How do I generate a new color palette?',
      answer: 'Simply press the Spacebar on your keyboard or click the "Generate" button. Any swatches you have locked will remain fixed while the others change.',
    },
    {
      question: 'Can I export the colors directly into my CSS project?',
      answer: 'Yes! Click "Copy CSS Vars" to copy formatted :root variables (--color-1, --color-2...) straight into your stylesheet.',
    },
  ],
  relatedTools: ['color-converter', 'color-palette-extractor', 'css-gradient-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'color-generator',
};
