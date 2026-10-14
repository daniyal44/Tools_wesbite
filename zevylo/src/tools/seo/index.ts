import { registerTools } from '@/lib/tools/registry';
import { metaTagGeneratorDefinition } from './meta-tag-generator.definition';
import { serpPreviewDefinition } from './serp-preview.definition';
import { ogGeneratorDefinition } from './og-generator.definition';
import { robotsTxtGeneratorDefinition } from './robots-txt-generator.definition';
import { keywordDensityAnalyzerDefinition } from './keyword-density-analyzer.definition';
import { sitemapGeneratorDefinition } from './sitemap-generator.definition';
import { serpPixelCheckerDefinition } from './serp-pixel-checker.definition';
import { twitterCardPreviewDefinition } from './twitter-card-preview.definition';
import { urlCleanerDefinition } from './url-cleaner.definition';
import { hreflangGeneratorDefinition } from './hreflang-generator.definition';
import { hashtagGeneratorDefinition } from './hashtag-generator.definition';

export const seoTools = [
  metaTagGeneratorDefinition,
  serpPreviewDefinition,
  ogGeneratorDefinition,
  robotsTxtGeneratorDefinition,
  keywordDensityAnalyzerDefinition,
  sitemapGeneratorDefinition,
  serpPixelCheckerDefinition,
  twitterCardPreviewDefinition,
  urlCleanerDefinition,
  hreflangGeneratorDefinition,
  hashtagGeneratorDefinition,
];

registerTools(seoTools);

export {
  metaTagGeneratorDefinition,
  serpPreviewDefinition,
  ogGeneratorDefinition,
  robotsTxtGeneratorDefinition,
  keywordDensityAnalyzerDefinition,
  sitemapGeneratorDefinition,
  serpPixelCheckerDefinition,
  twitterCardPreviewDefinition,
  urlCleanerDefinition,
  hreflangGeneratorDefinition,
  hashtagGeneratorDefinition,
};
