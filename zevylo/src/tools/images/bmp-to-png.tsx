'use client';

import ImageConverter from './_shared/image-converter';

export default function BmpToPng() {
  return (
    <ImageConverter
      fromLabel="BMP"
      toLabel="PNG"
      accept=".bmp,image/bmp"
      acceptExts={['bmp']}
      outputMime="image/png"
      outputExt="png"
    />
  );
}
