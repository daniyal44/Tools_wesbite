'use client';

import ImageConverter from './_shared/image-converter';

export default function JpgToPng() {
  return (
    <ImageConverter
      fromLabel="JPG"
      toLabel="PNG"
      accept=".jpg,.jpeg,image/jpeg"
      acceptExts={['jpg', 'jpeg']}
      outputMime="image/png"
      outputExt="png"
    />
  );
}
