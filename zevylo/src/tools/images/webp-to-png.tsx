'use client';

import ImageConverter from './_shared/image-converter';

export default function WebpToPng() {
  return (
    <ImageConverter
      fromLabel="WebP"
      toLabel="PNG"
      accept=".webp,image/webp"
      acceptExts={['webp']}
      outputMime="image/png"
      outputExt="png"
    />
  );
}
