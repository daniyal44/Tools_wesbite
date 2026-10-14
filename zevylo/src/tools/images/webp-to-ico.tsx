'use client';

import IcoConverter from './_shared/ico-converter';

export default function WebpToIco() {
  return <IcoConverter fromLabel="WebP" accept=".webp,image/webp" acceptExts={['webp']} />;
}
