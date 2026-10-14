'use client';

import ImageConverter from './_shared/image-converter';

export default function JpgToWebp() {
  return (
    <ImageConverter
      fromLabel="JPG"
      toLabel="WebP"
      accept=".jpg,.jpeg,image/jpeg"
      acceptExts={['jpg', 'jpeg']}
      outputMime="image/webp"
      outputExt="webp"
      lossy
    />
  );
}
