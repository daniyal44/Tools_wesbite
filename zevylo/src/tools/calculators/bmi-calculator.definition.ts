import { ToolDefinition } from '@/lib/tools/types';

export const bmiCalculatorDefinition: ToolDefinition = {
  id: 'bmi-calculator',
  slug: 'bmi-calculator',
  name: 'BMI & Body Mass Index Calculator',
  shortDescription: 'Calculate Body Mass Index (BMI), healthy weight range, and WHO weight status.',
  longDescription: 'Easily calculate your Body Mass Index (BMI) using metric (kg/cm) or imperial (lbs/inches) measurements. Discover whether you are in the underweight, normal, overweight, or obese category according to World Health Organization (WHO) standards.',
  category: 'calculators',
  icon: 'activity',
  keywords: ['bmi calculator', 'body mass index', 'ideal weight calculator', 'healthy weight range', 'calcprotool alternative'],
  searchableText: 'bmi calculator calculate body mass index healthy weight normal overweight underweight',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'BMI Calculator — Body Mass Index & Healthy Weight Range | Zevylo',
    description: 'Calculate your Body Mass Index (BMI) and find your ideal healthy weight range. Fast, free, and completely client-side in your browser.',
  },
  faq: [
    {
      question: 'What are the standard WHO BMI categories?',
      answer: 'Underweight: BMI under 18.5; Normal weight: 18.5 to 24.9; Overweight: 25.0 to 29.9; Obesity: 30.0 or higher.',
    },
    {
      question: 'What is the healthy weight range for my height?',
      answer: 'A healthy weight corresponds to a BMI between 18.5 and 24.9. Zevylo calculates your exact minimum and maximum healthy weight in both kg and lbs.',
    },
  ],
  relatedTools: ['tdee-calculator', 'unit-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 21,
  component: 'bmi-calculator',
};
