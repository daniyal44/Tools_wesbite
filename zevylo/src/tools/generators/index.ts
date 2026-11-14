import { registerTools } from '@/lib/tools/registry';
import { passwordGeneratorDefinition } from './password-generator.definition';
import { qrCodeGeneratorDefinition } from './qr-code-generator.definition';
import { uuidGeneratorDefinition } from './uuid-generator.definition';
import { utmBuilderDefinition } from './utm-builder.definition';
import { barcodeGeneratorDefinition } from './barcode-generator.definition';
import { randomNumberGeneratorDefinition } from './random-number-generator.definition';
import { bulkQrGeneratorDefinition } from './bulk-qr-generator.definition';

export const generatorsTools = [
  passwordGeneratorDefinition,
  qrCodeGeneratorDefinition,
  uuidGeneratorDefinition,
  utmBuilderDefinition,
  barcodeGeneratorDefinition,
  randomNumberGeneratorDefinition,
  bulkQrGeneratorDefinition,
];

registerTools(generatorsTools);

export {
  passwordGeneratorDefinition,
  qrCodeGeneratorDefinition,
  uuidGeneratorDefinition,
  utmBuilderDefinition,
  barcodeGeneratorDefinition,
  randomNumberGeneratorDefinition,
  bulkQrGeneratorDefinition,
};
