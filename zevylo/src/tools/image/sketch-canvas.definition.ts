import { ToolDefinition } from '@/lib/tools/types';

export const sketchCanvasDefinition: ToolDefinition = {
  id: 'sketch-canvas',
  slug: 'sketch-canvas',
  name: 'Canvas Sketch & Signature Pad',
  shortDescription: 'Freehand sketching canvas and digital signature pad with transparent PNG export.',
  longDescription: 'Draw diagrams, sketch quick concepts, or create transparent digital signatures directly in your browser. Features responsive brush sizing, color palettes, undo/redo history, and high-res PNG export. The lightweight Excalidraw alternative.',
  category: 'image',
  icon: 'pen-tool',
  keywords: ['sketch canvas', 'signature pad', 'draw online', 'excalidraw alternative', 'digital signature', 'transparent signature png'],
  searchableText: 'sketch canvas drawing signature pad excalidraw digital signature draw online png transparent',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Canvas Sketch & Signature Pad — Draw Online Free | Zevylo',
    description: 'Freehand sketch canvas and digital signature pad with transparent PNG export. Free, private, and instant.',
  },
  faq: [
    {
      question: 'Can I export signatures with a transparent background?',
      answer: 'Yes! Simply check the "Transparent Canvas" option to export clear digital signatures for PDFs and contracts.',
    },
    {
      question: 'Does this tool work on mobile and touchscreen devices?',
      answer: 'Yes! The canvas has full multi-touch support for drawing with a stylus, Apple Pencil, or your finger on mobile and tablet screens.',
    },
  ],
  relatedTools: ['image-compressor', 'code-to-image', 'qr-code-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'sketch-canvas',
};
