import { ToolDefinition } from '@/lib/tools/types';

export const colorPaletteExtractorDefinition: ToolDefinition = {
  id: 'color-palette-extractor',
  slug: 'color-palette-extractor',
  name: 'Image Color Palette Extractor',
  shortDescription: 'Extract dominant color palettes and hex codes from any photo or graphic.',
  longDescription: 'Extract beautiful color palettes directly from your images using client-side Canvas pixel quantization. Identifies dominant, accent, and complementary shades with exact HEX, RGB, and percentage dominance. Copy single hex codes or export the entire palette as CSS variables, Tailwind tokens, or JSON. Private and secure: image files stay local in your browser.',
  category: 'color',
  icon: 'palette',
  keywords: ['color palette extractor', 'extract colors from image', 'image color picker', 'palette generator from photo', 'dominant color finder', 'photo to color palette'],
  searchableText: 'color palette extractor extract colors image photo dominant hex rgb css variables tailwind tokens swatch canvas',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Image Color Palette Extractor - Get Dominant HEX Colors from Photos',
    description: 'Extract dominant colors and HEX palettes from any uploaded picture. Export CSS variables, Tailwind colors, and copy swatches with zero server upload.',
    keywords: ['image color palette extractor', 'extract hex from image', 'palette from photo', 'color scheme generator from picture'],
  },
  faq: [
    {
      question: 'How does this tool extract colors from images?',
      answer: 'It samples pixels from the uploaded image onto an HTML5 Canvas, quantizes RGB values into color clusters, and identifies the most prominent color families by density.',
    },
    {
      question: 'Can I export the extracted palette into my code?',
      answer: 'Yes! You can export with one click to CSS Custom Properties (:root variables), Tailwind CSS configuration snippet, or structured JSON.',
    },
  ],
  relatedTools: ['color-converter', 'css-gradient-generator', 'image-filters'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'src/tools/color/color-palette-extractor',
};
