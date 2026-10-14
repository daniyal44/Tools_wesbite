import { ToolCategory } from '@/lib/tools/types';

export interface WorkingStep {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
}

export interface WorkingMechanism {
  title: string;
  description: string;
  technologyStack: string[];
  privacyBenefit: string;
}

export interface ArticleFeature {
  title: string;
  description: string;
}

export interface ArticleUseCase {
  role: string;
  scenario: string;
  benefit: string;
}

export interface WebStandardRef {
  name: string;
  url: string;
  organization: string;
  description: string;
}

export interface RelatedArticleRef {
  title: string;
  toolName: string;
  slug: string;
  category: ToolCategory;
  categoryUrl: string;
  toolUrl: string;
  articleUrl: string;
}

export interface ArticleData {
  slug: string;
  toolSlug: string;
  toolName: string;
  toolCategory: ToolCategory;
  categoryName: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  readingTime: string;
  lastUpdated: string;
  executionMode: string;
  requiresUpload: boolean;
  supportsBatch: boolean;
  
  // Detailed Content Sections
  overview: string;
  workingSteps: WorkingStep[];
  workingMechanism: WorkingMechanism;
  features: ArticleFeature[];
  useCases: ArticleUseCase[];
  bestPractices: string[];
  tags: string[];
  
  // Internal & External Backlinks
  backlinks: {
    toolUrl: string;
    categoryUrl: string;
    articlesHubUrl: string;
    relatedArticles: RelatedArticleRef[];
    webStandards: WebStandardRef[];
  };
  
  // FAQs
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}
