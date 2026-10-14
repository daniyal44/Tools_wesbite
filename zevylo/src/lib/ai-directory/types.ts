export type AIPricing = 'free' | 'freemium' | 'paid' | 'free-trial' | 'open-source';

export interface AICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  toolCount?: number;
  popularSubcategories: string[];
}

export interface AITool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  categoryName: string;
  subcategory: string;
  url: string;
  pricing: AIPricing;
  startingPrice: string;
  monthlyVisits: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  trending: boolean;
  featured: boolean;
  new?: boolean;
  tags: string[];
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
  launchYear: number;
  logoUrl?: string;
}

export interface AISearchFilters {
  query?: string;
  category?: string;
  pricing?: AIPricing | 'all';
  sortBy?: 'traffic' | 'rating' | 'trending' | 'name' | 'newest';
}
