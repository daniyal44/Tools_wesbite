import { ToolDefinition } from '@/lib/tools/types';

export const colorConverterDefinition: ToolDefinition = {
  id: 'color-converter',
  slug: 'color-converter',
  name: 'Color Converter & Shades Generator',
  shortDescription: 'Convert between HEX, RGB, HSL, HSV, and CMYK with WCAG contrast and tint/shade scales.',
  longDescription: 'High precision color converter for web developers and UI designers. Instantly translates color codes between HEX, RGB, HSL, HSV, and CMYK formats. Features a visual color picker, WCAG 2.1 contrast ratio calculations against light and dark backgrounds, accessible text rating (AAA / AA), and a 10-step monochromatic tint and shade palette generator.',
  category: 'color',
  icon: 'palette',
  keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hex to hsl', 'cmyk converter', 'color shades generator', 'wcag contrast checker'],
  searchableText: 'color converter hex rgb hsl hsv cmyk shades tints contrast wcag css palette designer picker',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Color Converter - HEX, RGB, HSL, HSV, CMYK & Shade Generator',
    description: 'Convert HEX, RGB, HSL, HSV, and CMYK color codes instantly. Check WCAG contrast ratios and generate full tints and shades scales.',
    keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl converter', 'color code converter'],
  },
  faq: [
    {
      question: 'Which color models are supported?',
      answer: 'HEX (hexadecimal), RGB (Red Green Blue), HSL (Hue Saturation Lightness), HSV (Hue Saturation Value), and CMYK (Cyan Magenta Yellow Key/Black).',
    },
    {
      question: 'What is the WCAG contrast score?',
      answer: 'It calculates the luminance contrast ratio between your color and white/black according to WCAG 2.1 standards, ensuring accessible UI text readability.',
    },
  ],
  relatedTools: ['color-palette-extractor', 'css-gradient-generator', 'css-glassmorphism-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'src/tools/color/color-converter',
};
