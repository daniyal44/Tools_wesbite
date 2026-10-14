import { ToolDefinition } from '@/lib/tools/types';

export const colorPaletteGeneratorDefinition: ToolDefinition = {
  id: 'color-palette-generator',
  slug: 'color-palette-generator',
  name: 'Color Palette Generator & Harmony Studio',
  shortDescription: 'Generate harmonic color schemes with HEX, RGB, HSL codes and contrast scores.',
  longDescription: 'Create cohesive, aesthetic color palettes based on classic color harmony theory (Analogous, Complementary, Triadic, Tetradic, Monochromatic, Split-Complementary). Export color schemes as CSS variables, Tailwind tokens, JSON, or SVG swatches with WCAG readability scores.',
  category: 'color',
  icon: 'palette',
  keywords: ['color palette generator', 'color harmony', 'complementary colors', 'triadic palette', 'css color palette'],
  searchableText: 'color palette generator color harmony analogous complementary triadic tetradic monochromatic hex rgb hsl css tailwind client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Color Palette Generator — Harmonic Color Schemes & CSS Export | Zevylo',
    description: 'Generate beautiful harmonic color palettes instantly. Explore analogous, complementary, and triadic schemes with CSS and Tailwind code exports. 100% free.',
    keywords: ['color palette generator free', 'color scheme creator', 'hex color harmony', 'tailwind palette generator'],
  },
  faq: [
    {
      question: 'What are color harmonies?',
      answer: 'Color harmonies are mathematical relationships on the color wheel (such as opposites for Complementary, or 120-degree intervals for Triadic) that guarantee visually pleasing contrast and unity in design.',
    },
    {
      question: 'Can I lock individual colors while randomizing others?',
      answer: 'Yes! Click the lock icon on any swatch to keep that color fixed while generating new harmonies for the remaining slots.',
    },
  ],
  relatedTools: ['color-converter', 'color-contrast-checker', 'color-palette-extractor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'color-palette-generator',
};
