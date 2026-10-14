import { ToolDefinition } from '@/lib/tools/types';

export const cssFlexboxPlaygroundDefinition: ToolDefinition = {
  id: 'css-flexbox-playground',
  slug: 'css-flexbox-playground',
  name: 'CSS Flexbox Playground & Generator',
  shortDescription: 'Interactive visual flexbox playground with real-time CSS and Tailwind code generation.',
  longDescription: 'Master and prototype CSS flexbox layouts visually. Configure flex-direction, justify-content, align-items, flex-wrap, gaps, and individual item flex-grow properties with interactive previews and export both Vanilla CSS and Tailwind classes.',
  category: 'developer',
  icon: 'columns',
  keywords: ['css flexbox', 'flexbox playground', 'flex generator', 'css layout tool', 'tailwind flexbox', 'justify-content', 'align-items'],
  searchableText: 'css flexbox playground generator visual flex direction justify content align items flex wrap gap tailwind classes',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'CSS Flexbox Playground & Code Generator | Zevylo',
    description: 'Visual CSS Flexbox playground to test alignment, distribution, flex wrap, and gaps. Generate copy-ready CSS for container and flex items.',
    keywords: ['css flexbox playground', 'flexbox visual generator', 'tailwind flex helper', 'interactive flexbox simulator'],
  },
  faq: [
    {
      question: 'Can I export both Vanilla CSS and Tailwind CSS classes?',
      answer: 'Yes! The playground provides both standard CSS container/item rules and Tailwind utility class strings ready to paste into React or HTML.',
    },
    {
      question: 'Can I test flex-grow on individual child items?',
      answer: 'Yes, click on any child item in the preview to inspect and adjust its individual flex-grow property.',
    },
  ],
  relatedTools: ['css-clamp-generator', 'css-box-shadow-generator', 'css-gradient-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 28,
  component: 'css-flexbox-playground',
};
