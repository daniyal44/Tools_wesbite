'use client';

import ImageConverter from './_shared/image-converter';

export default function AvifToJpg() {
  return (
    <ImageConverter
      fromLabel="AVIF"
      toLabel="JPG"
      accept=".avif,image/avif"
      acceptExts={['avif']}
      outputMime="image/jpeg"
      outputExt="jpg"
      lossy
      flatten
    />
  );
}
