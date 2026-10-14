import { colorConverterDefinition } from './color-converter.definition';
import { colorPaletteExtractorDefinition } from './color-palette-extractor.definition';
import { colorGeneratorDefinition } from './color-generator.definition';
import { colorContrastCheckerDefinition } from './color-contrast-checker.definition';
import { colorPaletteGeneratorDefinition } from './color-palette-generator.definition';
import { registerTools } from '@/lib/tools/registry';

export const colorTools = [
  colorConverterDefinition,
  colorPaletteExtractorDefinition,
  colorGeneratorDefinition,
  colorContrastCheckerDefinition,
  colorPaletteGeneratorDefinition,
];

registerTools(colorTools);

export {
  colorConverterDefinition,
  colorPaletteExtractorDefinition,
  colorGeneratorDefinition,
  colorContrastCheckerDefinition,
  colorPaletteGeneratorDefinition,
};
