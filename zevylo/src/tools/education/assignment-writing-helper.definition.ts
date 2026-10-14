import { ToolDefinition } from '@/lib/tools/types';

export const assignmentWritingHelperDefinition: ToolDefinition = {
  id: 'assignment-writing-helper',
  slug: 'assignment-writing-helper',
  name: 'Academic Assignment & Essay Outline Planner',
  shortDescription: 'Plan structured essays, academic research papers, thesis statements, and word count allocations.',
  longDescription: 'Overcome academic writing roadblocks. Formulate strong thesis statements, organize PEEL body paragraphs (Point, Evidence, Explanation, Link), allocate target word counts across essay sections, and export complete markdown outlines.',
  category: 'education',
  icon: 'book-open',
  keywords: ['assignment writing tool', 'essay outline maker', 'thesis statement generator', 'academic paper planner', 'homework guidance tool'],
  searchableText: 'assignment writing essay outline thesis statement academic paper peel paragraphs word count homework research guidance free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Academic Assignment & Essay Outline Planner — Free Homework Studio | Zevylo',
    description: 'Structure academic essays and research papers. Generate thesis statements, PEEL arguments, and word count allocations instantly.',
    keywords: ['assignment writing helper', 'essay planner free', 'thesis generator online', 'academic essay structure'],
  },
  faq: [
    {
      question: 'What is the PEEL paragraph structure?',
      answer: 'PEEL stands for Point, Evidence, Explanation, and Link. It ensures each body paragraph in your assignment delivers a coherent, rigorously argued academic point.',
    },
    {
      question: 'How does word count allocation work?',
      answer: 'Standard academic best practices reserve 10% for the introduction, 80% for body arguments, and 10% for the conclusion and implications.',
    },
  ],
  relatedTools: ['gpa-calculator', 'ai-article-writer', 'handwriting-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'assignment-writing-helper',
};
