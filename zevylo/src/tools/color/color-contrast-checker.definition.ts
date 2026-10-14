import { ToolDefinition } from '@/lib/tools/types';

export const colorContrastCheckerDefinition: ToolDefinition = {
  id: 'color-contrast-checker',
  slug: 'color-contrast-checker',
  name: 'Color Contrast Checker',
  shortDescription: 'Check text/background color contrast against WCAG AA and AAA accessibility standards.',
  longDescription:
    'Check whether your text and background colors meet WCAG 2.1 accessibility contrast requirements. Enter any two hex colors (or pick them visually) to get the exact contrast ratio and instant pass/fail results for AA and AAA levels at both normal and large text sizes, with a live preview of the color pairing. Essential for accessible, readable web design — computed entirely in your browser.',
  category: 'color',
  icon: 'eye',
  keywords: ['color contrast checker', 'wcag contrast', 'accessibility contrast', 'contrast ratio', 'aa aaa contrast', 'a11y color', 'text contrast'],
  searchableText: 'color contrast checker wcag accessibility ratio aa aaa text background a11y readable',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Color Contrast Checker (WCAG AA / AAA) | Zevylo Tools',
    description: 'Free WCAG color contrast checker — enter text and background colors to get the contrast ratio and AA/AAA pass-fail for normal and large text. 100% client-side.',
  },
  faq: [
    { question: 'What contrast ratio do I need?', answer: 'WCAG AA requires at least 4.5:1 for normal text and 3:1 for large text; AAA requires 7:1 for normal text and 4.5:1 for large text.' },
    { question: 'What counts as "large text"?', answer: 'Text that is at least 24px regular weight, or at least 18.66px (14pt) bold.' },
    { question: 'How is the ratio calculated?', answer: 'It uses the official WCAG 2.1 formula: relative luminance of each color is computed, then the ratio is (lighter + 0.05) / (darker + 0.05).' },
  ],
  relatedTools: ['color-converter', 'color-generator', 'color-palette-extractor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'color-contrast-checker',
};
