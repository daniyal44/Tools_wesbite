import { ToolDefinition } from '@/lib/tools/types';

export const svgToPngDefinition: ToolDefinition = {
  id: 'svg-to-png',
  slug: 'svg-to-png',
  name: 'SVG to PNG Converter',
  shortDescription: 'Convert SVG vector files or raw code into crisp high-resolution PNG images.',
  longDescription: 'Convert scalable vector graphics (SVG) into transparent or white-background PNG files. Upload an SVG file or paste raw <svg> markup directly, select resolution multiplier scaling (1x, 2x, 4x Retina, 8x Ultra HD), and download crisp raster PNGs in seconds.',
  category: 'image',
  icon: 'file-image',
  keywords: ['svg to png', 'convert svg to png', 'vector to png', 'svg rasterizer', 'high res png', 'squoosh alternative', 'tinywow alternative'],
  searchableText: 'svg to png converter vector graphics rasterize resolution scale retina transparent background',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'SVG to PNG Converter — Free Vector to High-Res PNG Tool | Zevylo',
    description: 'Convert SVG files and raw code into high-resolution PNG images. 1x, 2x, 4x, 8x Retina scale. 100% free and client-side.',
  },
  faq: [
    {
      question: 'How does high-resolution SVG scaling work?',
      answer: 'Because SVGs are mathematical vectors, scaling them up (2x, 4x, 8x) before rendering them to the HTML5 Canvas produces razor-sharp raster PNGs with zero pixelation.',
    },
    {
      question: 'Can I keep transparent backgrounds?',
      answer: 'Yes! Zevylo preserves transparent alpha channels by default, or allows you to fill the background with white or custom colors.',
    },
  ],
  relatedTools: ['image-compressor', 'favicon-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 40,
  component: 'svg-to-png',
};
