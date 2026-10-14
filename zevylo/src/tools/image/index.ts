import { imageCompressorDefinition } from './image-compressor.definition';
import { sketchCanvasDefinition } from './sketch-canvas.definition';
import { aspectRatioCalculatorDefinition } from './aspect-ratio-calculator.definition';
import { imageCropperDefinition } from './image-cropper.definition';
import { svgToPngDefinition } from './svg-to-png.definition';
import { faviconGeneratorDefinition } from './favicon-generator.definition';
import { memeGeneratorDefinition } from './meme-generator.definition';
import { imageFiltersDefinition } from './image-filters.definition';
import { asciiArtGeneratorDefinition } from './ascii-art-generator.definition';
// Wave 1 — image & file converters
import { pngToJpgDefinition } from './png-to-jpg.definition';
import { pngToWebpDefinition } from './png-to-webp.definition';
import { jpgToPngDefinition } from './jpg-to-png.definition';
import { jpgToWebpDefinition } from './jpg-to-webp.definition';
import { webpToPngDefinition } from './webp-to-png.definition';
import { webpToJpgDefinition } from './webp-to-jpg.definition';
import { pngToIcoDefinition } from './png-to-ico.definition';
import { jpgToIcoDefinition } from './jpg-to-ico.definition';
import { webpToIcoDefinition } from './webp-to-ico.definition';
import { imageToPdfDefinition } from './image-to-pdf.definition';
import { imageResizerDefinition } from './image-resizer.definition';
import { imageSizeCheckerDefinition } from './image-size-checker.definition';
import { imageCombinerDefinition } from './image-combiner.definition';
import { imageComparatorDefinition } from './image-comparator.definition';
import { imageBackgroundRemoverDefinition } from './image-background-remover.definition';
// Ezgif additions
import { gifMakerDefinition } from './gif-maker.definition';
import { exifRemoverDefinition } from './exif-remover.definition';
import { imageToDataUriDefinition } from './image-to-datauri.definition';
import { jpgToPdfDefinition } from './jpg-to-pdf.definition';
import { avifToJpgDefinition } from './avif-to-jpg.definition';
import { heicToJpgDefinition } from './heic-to-jpg.definition';
import { bmpToPngDefinition } from './bmp-to-png.definition';
import { bulkImageConverterDefinition } from './bulk-image-converter.definition';
import { viewMetadataDefinition } from './view-metadata.definition';
import { lottieToGifDefinition } from './lottie-to-gif.definition';
import { registerTools } from '@/lib/tools/registry';

export const imageTools = [
  imageCompressorDefinition,
  sketchCanvasDefinition,
  aspectRatioCalculatorDefinition,
  imageCropperDefinition,
  svgToPngDefinition,
  faviconGeneratorDefinition,
  memeGeneratorDefinition,
  imageFiltersDefinition,
  asciiArtGeneratorDefinition,
  pngToJpgDefinition,
  pngToWebpDefinition,
  jpgToPngDefinition,
  jpgToWebpDefinition,
  webpToPngDefinition,
  webpToJpgDefinition,
  pngToIcoDefinition,
  jpgToIcoDefinition,
  webpToIcoDefinition,
  imageToPdfDefinition,
  imageResizerDefinition,
  imageSizeCheckerDefinition,
  imageCombinerDefinition,
  imageComparatorDefinition,
  imageBackgroundRemoverDefinition,
  gifMakerDefinition,
  exifRemoverDefinition,
  imageToDataUriDefinition,
  jpgToPdfDefinition,
  avifToJpgDefinition,
  heicToJpgDefinition,
  bmpToPngDefinition,
  bulkImageConverterDefinition,
  viewMetadataDefinition,
  lottieToGifDefinition,
];

registerTools(imageTools);

export {
  imageCompressorDefinition,
  sketchCanvasDefinition,
  aspectRatioCalculatorDefinition,
  imageCropperDefinition,
  svgToPngDefinition,
  faviconGeneratorDefinition,
  memeGeneratorDefinition,
  imageFiltersDefinition,
  asciiArtGeneratorDefinition,
  pngToJpgDefinition,
  pngToWebpDefinition,
  jpgToPngDefinition,
  jpgToWebpDefinition,
  webpToPngDefinition,
  webpToJpgDefinition,
  pngToIcoDefinition,
  jpgToIcoDefinition,
  webpToIcoDefinition,
  imageToPdfDefinition,
  imageResizerDefinition,
  imageSizeCheckerDefinition,
  imageCombinerDefinition,
  imageComparatorDefinition,
  imageBackgroundRemoverDefinition,
  gifMakerDefinition,
  exifRemoverDefinition,
  imageToDataUriDefinition,
  jpgToPdfDefinition,
  avifToJpgDefinition,
  heicToJpgDefinition,
  bmpToPngDefinition,
  bulkImageConverterDefinition,
  viewMetadataDefinition,
  lottieToGifDefinition,
};
