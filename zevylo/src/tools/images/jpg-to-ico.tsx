'use client';

import IcoConverter from './_shared/ico-converter';

export default function JpgToIco() {
  return <IcoConverter fromLabel="JPG" accept=".jpg,.jpeg,image/jpeg" acceptExts={['jpg', 'jpeg']} />;
}
