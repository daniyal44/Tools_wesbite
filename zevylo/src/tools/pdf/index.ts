import { pdfMergeSplitDefinition } from './pdf-merge-split.definition';
import { pdfRotatorDefinition } from './pdf-rotator.definition';
import { pdfToTextDefinition } from './pdf-to-text.definition';
import { pdfWatermarkDefinition } from './pdf-watermark.definition';
import { pdfToImageDefinition } from './pdf-to-image.definition';
import { cropPdfDefinition } from './crop-pdf.definition';
import { pdfPageNumbererDefinition } from './pdf-page-numberer.definition';
import { protectPdfDefinition } from './protect-pdf.definition';
import { pdfMetadataEditorDefinition } from './pdf-metadata-editor.definition';
import { registerTools } from '@/lib/tools/registry';

export const pdfTools = [
  pdfMergeSplitDefinition,
  pdfRotatorDefinition,
  pdfToTextDefinition,
  pdfWatermarkDefinition,
  pdfToImageDefinition,
  cropPdfDefinition,
  pdfPageNumbererDefinition,
  protectPdfDefinition,
  pdfMetadataEditorDefinition,
];

registerTools(pdfTools);

export {
  pdfMergeSplitDefinition,
  pdfRotatorDefinition,
  pdfToTextDefinition,
  pdfWatermarkDefinition,
  pdfToImageDefinition,
  cropPdfDefinition,
  pdfPageNumbererDefinition,
  protectPdfDefinition,
  pdfMetadataEditorDefinition,
};
