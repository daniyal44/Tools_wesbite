import { ToolDefinition } from '@/lib/tools/types';
import { registerTools } from '@/lib/tools/registry';
import { youtubeTagGeneratorDefinition } from './youtube-tag-generator.definition';
import { socialVideoDownloaderHelperDefinition } from './social-video-downloader-helper.definition';
import { bulkEmailGeneratorDefinition } from './bulk-email-generator.definition';

export const marketingTools: ToolDefinition[] = [
  youtubeTagGeneratorDefinition,
  socialVideoDownloaderHelperDefinition,
  bulkEmailGeneratorDefinition,
];

registerTools(marketingTools);

export {
  youtubeTagGeneratorDefinition,
  socialVideoDownloaderHelperDefinition,
  bulkEmailGeneratorDefinition,
};
