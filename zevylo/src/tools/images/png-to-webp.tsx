'use client';

import ImageConverter from './_shared/image-converter';

export default function PngToWebp() {
  return (
    <ImageConverter
      fromLabel="PNG"
      toLabel="WebP"
      accept=".png,image/png"
      acceptExts={['png']}
      outputMime="image/webp"
      outputExt="webp"
      lossy
    />
  );
}
