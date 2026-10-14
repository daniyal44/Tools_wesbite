export interface AIArticleBenchmark {
  benchmarkName: string;
  toolScore: string;
  competitorScore: string;
  competitorName: string;
  significance: string;
}

export interface AIArticleWorkflowStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
}

export interface AIArticleData {
  slug: string;
  toolSlug: string;
  toolName: string;
  tagline: string;
  category: string;
  categoryName: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  status: 'launched' | 'beta' | 'upcoming';
  roadmapInfo: string;
  readingTime: string;
  lastUpdated: string;
  officialUrl: string;
  pricing: string;
  startingPrice: string;
  monthlyVisits: string;
  rating: number;
  reviewCount: number;

  // Rich Long-Form Sections
  executiveSummary: string;
  originAndCreators: string;
  architecturalSpecs: {
    contextWindow: string;
    parameterScale: string;
    modalities: string[];
    hardwareOrCompute: string;
    licensing: string;
  };
  benchmarkMatrix: AIArticleBenchmark[];
  pricingAndEconomics: {
    freeTierDetails: string;
    commercialTiers: string;
    apiCostPerMillionTokens?: string;
  };
  stepByStepGuide: AIArticleWorkflowStep[];
  upcomingRoadmap: string[];
  pros: string[];
  cons: string[];
  competitorComparisons: Array<{
    name: string;
    slug: string;
    verdict: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}
