import { ToolDefinition } from '@/lib/tools/types';
import { registerTools } from '@/lib/tools/registry';
import { aiArticleWriterDefinition } from './ai-article-writer.definition';
import { geoAeoOptimizerDefinition } from './geo-aeo-optimizer.definition';
import { youtubeSummarizerDefinition } from './youtube-summarizer.definition';
import { aiPromptGeneratorDefinition } from './ai-prompt-generator.definition';
import { aiHumanizerDefinition } from './ai-humanizer.definition';
import { aiContentDetectorDefinition } from './ai-content-detector.definition';
import { aiCodeAssistantDefinition } from './ai-code-assistant.definition';
import { aiSqlRegexGeneratorDefinition } from './ai-sql-regex-generator.definition';
import { aiSocialHookGeneratorDefinition } from './ai-social-hook-generator.definition';
import { aiStoryGeneratorDefinition } from './ai-story-generator.definition';
import { aiBusinessNameGeneratorDefinition } from './ai-business-name-generator.definition';
import { aiPresentationGeneratorDefinition } from './ai-presentation-generator.definition';
import { aiEmailSubjectLineGeneratorDefinition } from './ai-email-subject-line-generator.definition';
import { aiBioGeneratorDefinition } from './ai-bio-generator.definition';
import { aiExcelFormulaGeneratorDefinition } from './ai-excel-formula-generator.definition';
import { aiFaqSchemaGeneratorDefinition } from './ai-faq-schema-generator.definition';

export const aiTools: ToolDefinition[] = [
  aiPromptGeneratorDefinition,
  aiHumanizerDefinition,
  aiContentDetectorDefinition,
  aiCodeAssistantDefinition,
  aiSqlRegexGeneratorDefinition,
  aiSocialHookGeneratorDefinition,
  aiStoryGeneratorDefinition,
  aiBusinessNameGeneratorDefinition,
  aiArticleWriterDefinition,
  geoAeoOptimizerDefinition,
  youtubeSummarizerDefinition,
  aiPresentationGeneratorDefinition,
  aiEmailSubjectLineGeneratorDefinition,
  aiBioGeneratorDefinition,
  aiExcelFormulaGeneratorDefinition,
  aiFaqSchemaGeneratorDefinition,
];

registerTools(aiTools);

export {
  aiPromptGeneratorDefinition,
  aiHumanizerDefinition,
  aiContentDetectorDefinition,
  aiCodeAssistantDefinition,
  aiSqlRegexGeneratorDefinition,
  aiSocialHookGeneratorDefinition,
  aiStoryGeneratorDefinition,
  aiBusinessNameGeneratorDefinition,
  aiArticleWriterDefinition,
  geoAeoOptimizerDefinition,
  youtubeSummarizerDefinition,
  aiPresentationGeneratorDefinition,
  aiEmailSubjectLineGeneratorDefinition,
  aiBioGeneratorDefinition,
  aiExcelFormulaGeneratorDefinition,
  aiFaqSchemaGeneratorDefinition,
};
