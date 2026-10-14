import { ToolDefinition } from '@/lib/tools/types';

export const tdeeCalculatorDefinition: ToolDefinition = {
  id: 'tdee-calculator',
  slug: 'tdee-calculator',
  name: 'TDEE & Calorie Burn Calculator',
  shortDescription: 'Calculate Total Daily Energy Expenditure (TDEE), BMR, and cutting/bulking calories.',
  longDescription: 'Find your exact daily maintenance calories using the scientifically proven Mifflin-St Jeor equation. View target calories and macronutrient splits for weight loss, maintenance, or muscle building based on your activity level.',
  category: 'calculators',
  icon: 'flame',
  keywords: ['tdee calculator', 'bmr calculator', 'calorie calculator', 'daily calorie burn', 'cutting calories', 'calcprotool alternative'],
  searchableText: 'tdee calculator calculate total daily energy expenditure bmr calories cutting bulking maintenance',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'TDEE Calculator — Total Daily Energy Expenditure & BMR | Zevylo',
    description: 'Calculate your maintenance calories, BMR, cutting, and bulking targets instantly. Fast, free, and completely client-side in your browser.',
  },
  faq: [
    {
      question: 'What is the difference between BMR and TDEE?',
      answer: 'BMR (Basal Metabolic Rate) is the calories burned just staying alive at rest. TDEE (Total Daily Energy Expenditure) multiplies BMR by your physical activity multiplier.',
    },
    {
      question: 'How much of a calorie deficit is recommended for fat loss?',
      answer: 'A moderate deficit of 500 kcal per day below your TDEE leads to a safe, sustainable fat loss of approximately 1 lb (0.45 kg) per week.',
    },
  ],
  relatedTools: ['bmi-calculator', 'percentage-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 15,
  component: 'tdee-calculator',
};
