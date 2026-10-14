'use client';

import ImageConverter from './_shared/image-converter';

export default function WebpToJpg() {
  return (
    <ImageConverter
      fromLabel="WebP"
      toLabel="JPG"
      accept=".webp,image/webp"
      acceptExts={['webp']}
      outputMime="image/jpeg"
      outputExt="jpg"
      lossy
      flatten
    />
  );
}
