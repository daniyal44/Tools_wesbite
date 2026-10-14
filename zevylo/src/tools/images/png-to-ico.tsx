'use client';

import IcoConverter from './_shared/ico-converter';

export default function PngToIco() {
  return <IcoConverter fromLabel="PNG" accept=".png,image/png" acceptExts={['png']} />;
}
