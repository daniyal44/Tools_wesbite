// Shared browser-side image/canvas helpers used across image tools.
// All functions are client-only (they touch document / Image / canvas).

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image. The file may be corrupt or in an unsupported format.'));
    img.src = src;
  });
}

/**
 * Decode a File into an HTMLImageElement. The temporary object URL is revoked
 * once the bitmap is decoded (it stays drawable afterwards).
 */
export async function fileToImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    return await loadImage(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the image.'))),
      type,
      quality
    );
  });
}

/** Draw an image into a square canvas (contain-fit, centered) and return PNG bytes. */
export async function imageToSquarePngBytes(
  img: HTMLImageElement,
  size: number
): Promise<Uint8Array> {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not supported in this browser.');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const scale = Math.min(size / img.naturalWidth, size / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);

  const blob = await canvasToBlob(canvas, 'image/png');
  return new Uint8Array(await blob.arrayBuffer());
}

/** Reduce a width:height ratio to its simplest integer form, e.g. 1920x1080 -> "16:9". */
export function aspectRatioString(width: number, height: number): string {
  if (!width || !height) return '—';
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

export function fileExtension(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : '';
}

export function baseName(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(0, dot) : name;
}
