import { ToolDefinition } from '@/lib/tools/types';

export const stepsToDistanceDefinition: ToolDefinition = {
  id: 'steps-to-distance',
  slug: 'steps-to-distance',
  name: 'Steps to Miles & Kilometers Calculator',
  shortDescription: 'Convert walking steps to miles, kilometers, calories burned, and estimated walking time.',
  longDescription: 'Accurately convert your step count into distance (miles, km, feet, meters) and estimate active calories burned based on gender, height-adjusted stride length, and walking pace.',
  category: 'calculators',
  icon: 'calculator',
  keywords: ['steps to miles', 'steps to km', 'how many miles is 10000 steps', 'steps to calories', 'walking distance calculator'],
  searchableText: 'steps to miles steps to km steps to distance calories burned 10000 steps stride length walking pace pedometer fitness',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Steps to Miles & Distance Calculator (Steps to Km) | Zevylo',
    description: 'Convert walking steps into miles, kilometers, and calories burned with custom height, stride length, and walking pace settings.',
    keywords: ['steps to miles calculator', 'steps to km', '10000 steps in miles', 'walking steps to calories'],
  },
  faq: [
    {
      question: 'How many miles is 10,000 steps?',
      answer: 'For an average adult with a stride length of 2.1 to 2.5 feet, 10,000 steps equals roughly 4.5 to 5.0 miles (7.2 to 8.0 kilometers).',
    },
    {
      question: 'How are calories calculated from steps?',
      answer: 'Calories are calculated using standard Metabolic Equivalent of Task (MET) values combined with your body weight and walking pace.',
    },
  ],
  relatedTools: ['bmi-calculator', 'tdee-calculator', 'unit-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 18,
  component: 'steps-to-distance',
};
