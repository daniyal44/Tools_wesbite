'use client';

import ImageConverter from './_shared/image-converter';

export default function PngToJpg() {
  return (
    <ImageConverter
      fromLabel="PNG"
      toLabel="JPG"
      accept=".png,image/png"
      acceptExts={['png']}
      outputMime="image/jpeg"
      outputExt="jpg"
      lossy
      flatten
    />
  );
}
