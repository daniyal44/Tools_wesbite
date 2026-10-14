import { jsonFormatterDefinition } from './json-formatter.definition';
import { base64Definition } from './base64.definition';
import { jwtDecoderDefinition } from './jwt-decoder.definition';
import { regexTesterDefinition } from './regex-tester.definition';
import { hashGeneratorDefinition } from './hash-generator.definition';
import { codeToImageDefinition } from './code-to-image.definition';
import { jsonToTypeScriptDefinition } from './json-to-typescript.definition';
import { cronGeneratorDefinition } from './cron-generator.definition';
import { urlEncoderDefinition } from './url-encoder.definition';
import { htmlEntityEncoderDefinition } from './html-entity-encoder.definition';
import { cssGradientGeneratorDefinition } from './css-gradient-generator.definition';
import { cssBoxShadowGeneratorDefinition } from './css-box-shadow-generator.definition';
import { cssGlassmorphismGeneratorDefinition } from './css-glassmorphism-generator.definition';
import { sqlFormatterDefinition } from './sql-formatter.definition';
import { yamlJsonConverterDefinition } from './yaml-json-converter.definition';
import { chmodCalculatorDefinition } from './chmod-calculator.definition';
import { keycodeInspectorDefinition } from './keycode-inspector.definition';
import { codeMinifierDefinition } from './code-minifier.definition';
import { promptEnhancerDefinition } from './prompt-enhancer.definition';
import { numberBaseConverterDefinition } from './number-base-converter.definition';
import { csvJsonConverterDefinition } from './csv-json-converter.definition';
import { cssClampGeneratorDefinition } from './css-clamp-generator.definition';
import { xmlFormatterDefinition } from './xml-formatter.definition';
import { subnetCalculatorDefinition } from './subnet-calculator.definition';
import { curlToFetchConverterDefinition } from './curl-to-fetch-converter.definition';
import { cssNeumorphismGeneratorDefinition } from './css-neumorphism-generator.definition';
import { cssBorderRadiusGeneratorDefinition } from './css-border-radius-generator.definition';
import { cssFlexboxPlaygroundDefinition } from './css-flexbox-playground.definition';
import { registerTools } from '@/lib/tools/registry';

export const developerTools = [
  jsonFormatterDefinition,
  base64Definition,
  jwtDecoderDefinition,
  regexTesterDefinition,
  hashGeneratorDefinition,
  codeToImageDefinition,
  jsonToTypeScriptDefinition,
  cronGeneratorDefinition,
  urlEncoderDefinition,
  htmlEntityEncoderDefinition,
  cssGradientGeneratorDefinition,
  cssBoxShadowGeneratorDefinition,
  cssGlassmorphismGeneratorDefinition,
  sqlFormatterDefinition,
  yamlJsonConverterDefinition,
  chmodCalculatorDefinition,
  keycodeInspectorDefinition,
  codeMinifierDefinition,
  promptEnhancerDefinition,
  numberBaseConverterDefinition,
  csvJsonConverterDefinition,
  cssClampGeneratorDefinition,
  xmlFormatterDefinition,
  subnetCalculatorDefinition,
  curlToFetchConverterDefinition,
  cssNeumorphismGeneratorDefinition,
  cssBorderRadiusGeneratorDefinition,
  cssFlexboxPlaygroundDefinition,
];

registerTools(developerTools);

export {
  jsonFormatterDefinition,
  base64Definition,
  jwtDecoderDefinition,
  regexTesterDefinition,
  hashGeneratorDefinition,
  codeToImageDefinition,
  jsonToTypeScriptDefinition,
  cronGeneratorDefinition,
  urlEncoderDefinition,
  htmlEntityEncoderDefinition,
  cssGradientGeneratorDefinition,
  cssBoxShadowGeneratorDefinition,
  cssGlassmorphismGeneratorDefinition,
  sqlFormatterDefinition,
  yamlJsonConverterDefinition,
  chmodCalculatorDefinition,
  keycodeInspectorDefinition,
  codeMinifierDefinition,
  promptEnhancerDefinition,
  numberBaseConverterDefinition,
  csvJsonConverterDefinition,
  cssClampGeneratorDefinition,
  xmlFormatterDefinition,
  subnetCalculatorDefinition,
  curlToFetchConverterDefinition,
  cssNeumorphismGeneratorDefinition,
  cssBorderRadiusGeneratorDefinition,
  cssFlexboxPlaygroundDefinition,
};

