import { ToolDefinition } from '@/lib/tools/types';

export const gpaCalculatorDefinition: ToolDefinition = {
  id: 'gpa-calculator',
  slug: 'gpa-calculator',
  name: 'GPA & Grade Point Calculator',
  shortDescription: 'Calculate semester and cumulative Grade Point Average (GPA) on standard 4.0 scale.',
  longDescription: 'Easily calculate your semester or cumulative GPA across multiple courses. Assign letter grades and credit hours, view total quality points, and calculate the exact grades needed to boost your college or high school GPA.',
  category: 'education',
  icon: 'graduation-cap',
  keywords: ['gpa calculator', 'college gpa', 'high school gpa', 'grade point average', 'cumulative gpa', 'calcprotool alternative'],
  searchableText: 'gpa calculator calculate college high school grade point average credits 4.0 scale',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'GPA Calculator — Calculate Semester & Cumulative 4.0 GPA | Zevylo',
    description: 'Calculate your college or high school GPA on a 4.0 scale with credit weights. Fast, free, and completely client-side in your browser.',
  },
  faq: [
    {
      question: 'How is GPA calculated on a 4.0 scale?',
      answer: 'Each letter grade corresponds to a numeric point value (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0). Multiply points by course credits to get Quality Points. GPA = Total Quality Points / Total Credits.',
    },
    {
      question: 'Does this calculator support +/- grades?',
      answer: 'Yes! Zevylo supports the standard university scale including A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), D (1.0), and F (0.0).',
    },
  ],
  relatedTools: ['percentage-calculator', 'salary-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 12,
  component: 'gpa-calculator',
};
