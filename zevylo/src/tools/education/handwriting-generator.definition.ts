import { ToolDefinition } from '@/lib/tools/types';

export const handwritingGeneratorDefinition: ToolDefinition = {
  id: 'handwriting-generator',
  slug: 'handwriting-generator',
  name: 'Realistic Handwriting & Notes Generator',
  shortDescription: 'Convert typed digital text into realistic handwritten notes on lined paper with custom ink and font styles.',
  longDescription: 'Turn typed text into authentic simulated handwritten letters and school notes. Choose from cursive, script, or student print styles, adjust ink colors (ballpoint blue, black gel, red ink), customize lined or legal pad paper, and export as PNG image or print to PDF.',
  category: 'education',
  icon: 'edit-3',
  keywords: ['handwriting generator', 'text to handwriting', 'handwritten notes maker', 'handwriting changer', 'lined paper note generator'],
  searchableText: 'handwriting generator text to handwriting notes cursive script lined paper pen ink print pdf homework assignment free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Realistic Handwriting Generator — Text to Handwritten Notes | Zevylo',
    description: 'Transform digital text into realistic handwritten notes on lined notebook paper. Download PNG or print to PDF for free.',
    keywords: ['handwriting generator', 'text to handwriting online free', 'handwritten notes maker', 'lined paper text generator'],
  },
  faq: [
    {
      question: 'Can I change the paper to lined notebook paper?',
      answer: 'Yes! You can choose between College-Ruled Blue Lined Paper, Yellow Legal Pad, or Plain Parchment.',
    },
    {
      question: 'How do I download my handwritten notes?',
      answer: 'Click "Download PNG" to export a high-resolution image, or click "Print to PDF" to generate a printable vector document.',
    },
  ],
  relatedTools: ['assignment-writing-helper', 'gpa-calculator', 'ai-article-writer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'handwriting-generator',
};
