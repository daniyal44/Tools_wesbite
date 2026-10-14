import { ToolDefinition } from '@/lib/tools/types';

export const asciiArtGeneratorDefinition: ToolDefinition = {
  id: 'ascii-art-generator',
  slug: 'ascii-art-generator',
  name: 'ASCII Art & Text Banner Generator',
  shortDescription: 'Convert plain text headlines or images into retro ASCII character art and banners.',
  longDescription: 'Create retro ASCII art for code comments, README markdown files, terminal headers, and social posts. Generate ASCII banner text with multiple font styles, or convert uploaded photos into detailed character-density ASCII art with customizable width and invert settings.',
  category: 'image',
  icon: 'terminal',
  keywords: ['ascii art generator', 'text to ascii', 'image to ascii', 'ascii banner', 'retro terminal art', 'it-tools alternative'],
  searchableText: 'ascii art generator convert text image to ascii art banner terminal characters mono',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'ASCII Art Generator — Convert Text & Images to ASCII Art | Zevylo',
    description: 'Generate retro ASCII text banners and convert images to ASCII art online. Copy monospace text for GitHub READMEs. Free and client-side.',
  },
  faq: [
    {
      question: 'How does image-to-ASCII art generation work?',
      answer: 'The image is resized onto an HTML5 Canvas and each pixel’s luminance (brightness) is mapped to an ASCII character based on character optical density (e.g., @ for dark pixels, . for light pixels).',
    },
    {
      question: 'Can I copy the ASCII output directly into code or markdown?',
      answer: 'Yes! The output is formatted in clean monospace text, ready to paste into Markdown code fences (```) or program source files.',
    },
  ],
  relatedTools: ['code-to-image', 'markdown-preview', 'text-diff'],
  status: 'active',
  visibility: 'public',
  sortOrder: 44,
  component: 'ascii-art-generator',
};
