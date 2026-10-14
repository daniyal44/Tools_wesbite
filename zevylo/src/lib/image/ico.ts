// Zero-dependency ICO encoder.
// Produces a valid Windows .ico file using PNG-compressed entries (supported
// by Windows Vista and later, and by all modern browsers/favicon pipelines).
//
// ICO layout:
//   ICONDIR      (6 bytes)   : reserved=0, type=1, imageCount
//   ICONDIRENTRY (16 bytes)  : one per image
//   image data   (PNG bytes) : concatenated, referenced by offset

export interface IcoImage {
  /** Pixel size of the square icon (e.g. 16, 32, 48, 256). 256 is stored as 0 per spec. */
  size: number;
  /** PNG-encoded bytes for this size. */
  png: Uint8Array;
}

export function encodeIco(images: IcoImage[]): Blob {
  if (images.length === 0) {
    throw new Error('At least one image is required to build an ICO file.');
  }

  const count = images.length;
  const header = new Uint8Array(6);
  const headerView = new DataView(header.buffer);
  headerView.setUint16(0, 0, true); // reserved
  headerView.setUint16(2, 1, true); // type: 1 = icon
  headerView.setUint16(4, count, true); // number of images

  const entries: Uint8Array[] = [];
  let dataOffset = 6 + count * 16;

  for (const { size, png } of images) {
    const entry = new Uint8Array(16);
    const view = new DataView(entry.buffer);
    // 256px is encoded as 0 in the single-byte width/height fields.
    entry[0] = size >= 256 ? 0 : size; // width
    entry[1] = size >= 256 ? 0 : size; // height
    entry[2] = 0; // palette color count (0 = no palette)
    entry[3] = 0; // reserved
    view.setUint16(4, 1, true); // color planes
    view.setUint16(6, 32, true); // bits per pixel
    view.setUint32(8, png.length, true); // size of image data
    view.setUint32(12, dataOffset, true); // offset of image data from file start
    entries.push(entry);
    dataOffset += png.length;
  }

  const totalLength = dataOffset;
  const out = new Uint8Array(totalLength);
  out.set(header, 0);
  let offset = 6;
  for (const entry of entries) {
    out.set(entry, offset);
    offset += 16;
  }
  for (const { png } of images) {
    out.set(png, offset);
    offset += png.length;
  }
  return new Blob([out.buffer as ArrayBuffer], { type: 'image/x-icon' });
}

/** Standard favicon sizes bundled into a single .ico. */
export const DEFAULT_ICO_SIZES = [16, 32, 48, 64, 128, 256];
