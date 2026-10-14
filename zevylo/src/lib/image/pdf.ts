// Zero-dependency PDF writer for turning raster images into a PDF document.
//
// Each image becomes one page. Images must be provided as baseline RGB JPEG
// bytes (3 components) — exactly what HTMLCanvasElement.toBlob('image/jpeg')
// produces — so they can be embedded directly with the /DCTDecode filter.

export interface PdfImage {
  jpeg: Uint8Array;
  width: number;
  height: number;
}

export type PdfPageSize = 'a4' | 'letter' | 'fit';
export type PdfOrientation = 'portrait' | 'landscape' | 'auto';

export interface ImagesToPdfOptions {
  pageSize?: PdfPageSize;
  orientation?: PdfOrientation;
  /** Page margin in points (1/72 inch). Ignored when pageSize is 'fit'. */
  margin?: number;
}

// Page dimensions in points, portrait orientation.
const PAGE_SIZES: Record<'a4' | 'letter', [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

function latin1(str: string): Uint8Array {
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) out[i] = str.charCodeAt(i) & 0xff;
  return out;
}

export function imagesToPdf(images: PdfImage[], options: ImagesToPdfOptions = {}): Blob {
  if (images.length === 0) {
    throw new Error('At least one image is required to build a PDF.');
  }

  const { pageSize = 'a4', orientation = 'auto', margin = 24 } = options;

  const chunks: Uint8Array[] = [];
  let length = 0;
  const offsets: number[] = [];

  const push = (bytes: Uint8Array) => {
    chunks.push(bytes);
    length += bytes.length;
  };
  const pushStr = (str: string) => push(latin1(str));

  pushStr('%PDF-1.3\n');
  // Binary comment so readers treat the file as binary.
  push(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]));

  // Object numbering: 1 = Catalog, 2 = Pages, then (page, image, content) per image.
  let objCounter = 3;
  const perImage = images.map(() => ({
    pageNum: objCounter++,
    imageNum: objCounter++,
    contentNum: objCounter++,
  }));
  const totalObjs = objCounter - 1;
  const pageRefs = perImage.map((p) => `${p.pageNum} 0 R`).join(' ');

  const startObj = (num: number) => {
    offsets[num] = length;
    pushStr(`${num} 0 obj\n`);
  };
  const endObj = () => pushStr('endobj\n');

  // Catalog
  startObj(1);
  pushStr('<< /Type /Catalog /Pages 2 0 R >>\n');
  endObj();

  // Pages tree
  startObj(2);
  pushStr(`<< /Type /Pages /Count ${images.length} /Kids [${pageRefs}] >>\n`);
  endObj();

  images.forEach((img, i) => {
    const { pageNum, imageNum, contentNum } = perImage[i];

    // Determine page dimensions.
    let pageW: number;
    let pageH: number;
    if (pageSize === 'fit') {
      pageW = img.width;
      pageH = img.height;
    } else {
      const [portraitW, portraitH] = PAGE_SIZES[pageSize];
      const landscape =
        orientation === 'landscape' ||
        (orientation === 'auto' && img.width > img.height);
      pageW = landscape ? portraitH : portraitW;
      pageH = landscape ? portraitW : portraitH;
    }

    // Fit the image inside the printable area.
    const effectiveMargin = pageSize === 'fit' ? 0 : margin;
    const availW = Math.max(1, pageW - effectiveMargin * 2);
    const availH = Math.max(1, pageH - effectiveMargin * 2);
    const scale = pageSize === 'fit' ? 1 : Math.min(availW / img.width, availH / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const x = (pageW - drawW) / 2;
    const y = (pageH - drawH) / 2;

    // Image XObject
    startObj(imageNum);
    pushStr(
      `<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.jpeg.length} >>\n` +
        'stream\n'
    );
    push(img.jpeg);
    pushStr('\nendstream\n');
    endObj();

    // Content stream
    const content = `q\n${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/Im0 Do\nQ\n`;
    const contentBytes = latin1(content);
    startObj(contentNum);
    pushStr(`<< /Length ${contentBytes.length} >>\nstream\n`);
    push(contentBytes);
    pushStr('endstream\n');
    endObj();

    // Page
    startObj(pageNum);
    pushStr(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW.toFixed(2)} ${pageH.toFixed(2)}] ` +
        `/Resources << /XObject << /Im0 ${imageNum} 0 R >> >> /Contents ${contentNum} 0 R >>\n`
    );
    endObj();
  });

  // Cross-reference table
  const xrefOffset = length;
  pushStr(`xref\n0 ${totalObjs + 1}\n`);
  pushStr('0000000000 65535 f \n');
  for (let i = 1; i <= totalObjs; i++) {
    const off = offsets[i] ?? 0;
    pushStr(`${off.toString().padStart(10, '0')} 00000 n \n`);
  }

  pushStr(
    `trailer\n<< /Size ${totalObjs + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
  );

  return new Blob(chunks as BlobPart[], { type: 'application/pdf' });
}
