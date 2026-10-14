import { ToolDefinition } from '@/lib/tools/types';

export const fuelCostCalculatorDefinition: ToolDefinition = {
  id: 'fuel-cost-calculator',
  slug: 'fuel-cost-calculator',
  name: 'Fuel Cost & Trip Mileage Calculator',
  shortDescription: 'Calculate total gas cost, fuel volume needed, and passenger cost splits for road trips.',
  longDescription: 'Plan your road trips and daily commutes accurately. Compute required fuel volume and expense based on distance, vehicle fuel economy (MPG or L/100km), and gas price. Easily split the cost among multiple passengers.',
  category: 'calculators',
  icon: 'fuel',
  keywords: ['fuel cost calculator', 'gas calculator', 'trip cost calculator', 'mileage calculator', 'road trip gas split', 'calcprotool alternative'],
  searchableText: 'fuel cost calculator calculate trip gas mileage cost mpg fuel consumption split passengers',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Fuel Cost Calculator — Calculate Trip Gas Expense & Mileage | Zevylo',
    description: 'Calculate trip fuel costs, MPG efficiency, and split gas expenses per passenger. Fast, free, and completely client-side in your browser.',
  },
  faq: [
    {
      question: 'How do you calculate fuel cost for a road trip?',
      answer: 'Fuel Cost = (Distance / Fuel Economy MPG) × Fuel Price Per Gallon. For metric units: Fuel Cost = (Distance in km / 100) × (L/100km) × Price per Liter.',
    },
    {
      question: 'Can I calculate round trips and passenger splits?',
      answer: 'Yes! Toggle round trip on or off, and adjust the passenger slider to instantly see how much each traveler owes.',
    },
  ],
  relatedTools: ['unit-converter', 'tip-calculator', 'percentage-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 13,
  component: 'fuel-cost-calculator',
};
