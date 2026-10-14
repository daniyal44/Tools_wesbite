import { ToolDefinition } from '@/lib/tools/types';

export const averageCalculatorDefinition: ToolDefinition = {
  id: 'average-calculator',
  slug: 'average-calculator',
  name: 'Average Calculator',
  shortDescription: 'Calculate mean, median, mode, range, variance, and standard deviation from a list of numbers.',
  longDescription:
    'Paste or type a set of numbers and instantly get the full statistical summary: mean (average), median, mode, minimum, maximum, range, sum, count, population variance, and population standard deviation. Accepts numbers separated by commas, spaces, or new lines, and ignores anything that is not a valid number. All math runs locally in your browser with no rounding until display.',
  category: 'calculators',
  icon: 'calculator',
  keywords: ['average calculator', 'mean median mode', 'standard deviation calculator', 'variance calculator', 'statistics calculator', 'mean calculator', 'range calculator'],
  searchableText: 'average calculator mean median mode range variance standard deviation statistics sum count numbers list',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Average Calculator — Mean, Median, Mode & Standard Deviation | Zevylo Tools',
    description: 'Free average calculator. Get mean, median, mode, range, variance, and standard deviation from any list of numbers. 100% client-side, instant results.',
  },
  faq: [
    { question: 'What statistics does this calculate?', answer: 'Mean (average), median, mode, minimum, maximum, range, sum, count, population variance, and population standard deviation.' },
    { question: 'How should I enter the numbers?', answer: 'Separate them with commas, spaces, semicolons, tabs, or new lines. Anything that is not a valid number is ignored.' },
    { question: 'Is the standard deviation population or sample?', answer: 'This tool reports the population standard deviation and variance (dividing by N, not N−1).' },
  ],
  relatedTools: ['percentage-calculator', 'scientific-calculator', 'gpa-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 73,
  component: 'average-calculator',
};
