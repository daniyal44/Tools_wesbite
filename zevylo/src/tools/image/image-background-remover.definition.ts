import { ToolDefinition } from '@/lib/tools/types';

export const imageBackgroundRemoverDefinition: ToolDefinition = {
  id: 'image-background-remover',
  slug: 'image-background-remover',
  name: 'Free Image Background Remover & Transparent PNG Maker',
  shortDescription: 'Remove solid white, black, green screen backgrounds and create transparent PNG photos.',
  longDescription: 'Easily cut out backgrounds from photos, logos, and product shots. Features interactive color sampling eyedropper, adjustable color distance tolerance slider, alpha feather smoothing, and instant transparent PNG image downloads with zero server uploads.',
  category: 'image',
  icon: 'sparkles',
  keywords: ['image background remover', 'remove background free', 'transparent png maker', 'background eraser', 'white background remover', 'green screen keyer'],
  searchableText: 'image background remover transparent png maker cut out photo white background green screen chroma key feathering free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Image Background Remover — Free Transparent PNG Maker | Zevylo',
    description: 'Remove background from photos and create transparent PNG files online for free. 100% private client-side processing.',
    keywords: ['image background remover', 'remove background free', 'transparent background maker', 'online background eraser'],
  },
  faq: [
    {
      question: 'How do I pick which color to remove?',
      answer: 'Click the "Eyedropper" button and then click anywhere on your image to instantly select that exact background color to key out.',
    },
    {
      question: 'What is the feathering slider for?',
      answer: 'Feathering softens the transition along object edges, eliminating harsh jagged borders and blending hair and curves naturally.',
    },
  ],
  relatedTools: ['image-compressor', 'image-resizer', 'meme-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 25,
  component: 'image-background-remover',
};
