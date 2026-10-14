import { wordCounterDefinition } from './word-counter.definition';
import { caseConverterDefinition } from './case-converter.definition';
import { textDiffDefinition } from './text-diff.definition';
import { loremIpsumGeneratorDefinition } from './lorem-ipsum-generator.definition';
import { slugGeneratorDefinition } from './slug-generator.definition';
import { readabilityCalculatorDefinition } from './readability-calculator.definition';
import { markdownTableGeneratorDefinition } from './markdown-table-generator.definition';
import { stylishTextGeneratorDefinition } from './stylish-text-generator.definition';
import { textExtractorDefinition } from './text-extractor.definition';
import { removeDuplicateLinesDefinition } from './remove-duplicate-lines.definition';
import { findReplaceDefinition } from './find-replace.definition';
import { textSorterDefinition } from './text-sorter.definition';
import { whitespaceCleanerDefinition } from './whitespace-cleaner.definition';
import { textRepeaterDefinition } from './text-repeater.definition';
import { markdownPreviewerDefinition } from './markdown-previewer.definition';
import { bionicReadingConverterDefinition } from './bionic-reading-converter.definition';
import { upsideDownTextGeneratorDefinition } from './upside-down-text-generator.definition';
import { zalgoGlitchTextGeneratorDefinition } from './zalgo-glitch-text-generator.definition';
import { slugToTitleConverterDefinition } from './slug-to-title-converter.definition';
import { registerTools } from '@/lib/tools/registry';

export const textTools = [
  wordCounterDefinition,
  caseConverterDefinition,
  textDiffDefinition,
  loremIpsumGeneratorDefinition,
  slugGeneratorDefinition,
  readabilityCalculatorDefinition,
  markdownTableGeneratorDefinition,
  stylishTextGeneratorDefinition,
  textExtractorDefinition,
  removeDuplicateLinesDefinition,
  findReplaceDefinition,
  textSorterDefinition,
  whitespaceCleanerDefinition,
  textRepeaterDefinition,
  markdownPreviewerDefinition,
  bionicReadingConverterDefinition,
  upsideDownTextGeneratorDefinition,
  zalgoGlitchTextGeneratorDefinition,
  slugToTitleConverterDefinition,
];

registerTools(textTools);

export {
  wordCounterDefinition,
  caseConverterDefinition,
  textDiffDefinition,
  loremIpsumGeneratorDefinition,
  slugGeneratorDefinition,
  readabilityCalculatorDefinition,
  markdownTableGeneratorDefinition,
  stylishTextGeneratorDefinition,
  textExtractorDefinition,
  removeDuplicateLinesDefinition,
  findReplaceDefinition,
  textSorterDefinition,
  whitespaceCleanerDefinition,
  textRepeaterDefinition,
  markdownPreviewerDefinition,
  bionicReadingConverterDefinition,
  upsideDownTextGeneratorDefinition,
  zalgoGlitchTextGeneratorDefinition,
  slugToTitleConverterDefinition,
};

