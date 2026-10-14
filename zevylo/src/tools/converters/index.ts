import { registerTools } from '@/lib/tools/registry';
import { unitConverterDefinition } from './unit-converter.definition';
import { timestampConverterDefinition } from './timestamp-converter.definition';
import { dataSizeConverterDefinition } from './data-size-converter.definition';
import { binaryTextConverterDefinition } from './binary-text-converter.definition';
import { rot13EncoderDefinition } from './rot13-encoder.definition';
import { srtToVttConverterDefinition } from './srt-to-vtt-converter.definition';
import { morseCodeTranslatorDefinition } from './morse-code-translator.definition';
import { currencyConverterDefinition } from './currency-converter.definition';
import { timezoneConverterDefinition } from './timezone-converter.definition';
import { romanNumeralConverterDefinition } from './roman-numeral-converter.definition';
import { numberToWordsDefinition } from './number-to-words.definition';
import { htmlToMarkdownDefinition } from './html-to-markdown.definition';

export const converterTools = [
  unitConverterDefinition,
  timestampConverterDefinition,
  dataSizeConverterDefinition,
  binaryTextConverterDefinition,
  rot13EncoderDefinition,
  srtToVttConverterDefinition,
  morseCodeTranslatorDefinition,
  currencyConverterDefinition,
  timezoneConverterDefinition,
  romanNumeralConverterDefinition,
  numberToWordsDefinition,
  htmlToMarkdownDefinition,
];

registerTools(converterTools);

export {
  unitConverterDefinition,
  timestampConverterDefinition,
  dataSizeConverterDefinition,
  binaryTextConverterDefinition,
  rot13EncoderDefinition,
  srtToVttConverterDefinition,
  morseCodeTranslatorDefinition,
  currencyConverterDefinition,
  timezoneConverterDefinition,
  romanNumeralConverterDefinition,
  numberToWordsDefinition,
  htmlToMarkdownDefinition,
};
