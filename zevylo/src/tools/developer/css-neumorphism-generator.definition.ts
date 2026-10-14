import { ToolDefinition } from '@/lib/tools/types';

export const cssNeumorphismGeneratorDefinition: ToolDefinition = {
  id: 'css-neumorphism-generator',
  slug: 'css-neumorphism-generator',
  name: 'CSS Neumorphism (Soft UI) Generator',
  shortDescription: 'Design soft UI / neumorphic components with realistic dual-shadow highlights and CSS code export.',
  longDescription: 'Create beautiful neumorphic soft UI designs with customizable light angles, shadow distance, blur intensity, and surface elevations (flat, concave, convex, pressed). Generate clean CSS box-shadow and gradient code with 1-click clipboard copy.',
  category: 'developer',
  icon: 'layers',
  keywords: ['css neumorphism', 'soft ui generator', 'neumorphic box shadow', 'css shadow generator', 'ui design tool', 'frontend styling'],
  searchableText: 'css neumorphism soft ui box shadow generator dual shadow light angle concave convex pressed elevation border radius',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'CSS Neumorphism Generator — Soft UI Code Generator | Zevylo',
    description: 'Create modern neumorphic soft UI designs in your browser. Customize light source, distance, blur, and shape with live preview and copyable CSS.',
    keywords: ['css neumorphism generator', 'soft ui box shadow', 'neumorphic design generator', 'css soft ui online'],
  },
  faq: [
    {
      question: 'What is Neumorphism in UI design?',
      answer: 'Neumorphism (Soft UI) is a visual design trend that combines flat design with skeuomorphism, using subtle contrasting shadows to make UI elements appear extruded or debossed from the background.',
    },
    {
      question: 'Can I use this generated CSS in React, Vue, or HTML?',
      answer: 'Yes! The generated CSS box-shadow, border-radius, and background properties work across all modern browsers and CSS frameworks.',
    },
  ],
  relatedTools: ['css-box-shadow-generator', 'css-glassmorphism-generator', 'css-gradient-generator', 'css-clamp-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 26,
  component: 'css-neumorphism-generator',
};
