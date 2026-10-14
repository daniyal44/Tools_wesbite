/**
 * Zero-dependency client-side ZIP archive builder (PKZIP Store method 0).
 * Creates valid .zip files in browser memory without external dependencies.
 */

function makeCrcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  return table;
}

const CRC_TABLE = makeCrcTable();

export function calculateCrc32(data: Uint8Array): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = CRC_TABLE[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

export interface ZipFileInput {
  name: string;
  data: Uint8Array;
}

/**
 * Packs multiple files into an uncompressed (Store) ZIP archive Blob.
 */
export function createZipArchive(files: ZipFileInput[]): Blob {
  const parts: Uint8Array[] = [];
  const cdHeaders: Uint8Array[] = [];
  let offset = 0;

  const textEncoder = new TextEncoder();

  for (const file of files) {
    const nameBytes = textEncoder.encode(file.name);
    const dataBytes = file.data;
    const crc = calculateCrc32(dataBytes);
    const size = dataBytes.length;

    // Local file header (30 bytes + name length)
    const local = new Uint8Array(30);
    const localView = new DataView(local.buffer);
    localView.setUint32(0, 0x04034b50, true);  // Local header signature
    localView.setUint16(4, 20, true);          // Version needed to extract (2.0)
    localView.setUint16(6, 0, true);           // General purpose bit flag
    localView.setUint16(8, 0, true);           // Compression method (0 = Store)
    localView.setUint16(10, 0, true);          // Last mod time
    localView.setUint16(12, 0, true);          // Last mod date
    localView.setUint32(14, crc, true);        // CRC-32
    localView.setUint32(18, size, true);       // Compressed size
    localView.setUint32(22, size, true);       // Uncompressed size
    localView.setUint16(26, nameBytes.length, true); // File name length
    localView.setUint16(28, 0, true);          // Extra field length

    parts.push(local, nameBytes, dataBytes);

    // Central directory header (46 bytes + name length)
    const cd = new Uint8Array(46);
    const cdView = new DataView(cd.buffer);
    cdView.setUint32(0, 0x02014b50, true);     // Central directory signature
    cdView.setUint16(4, 20, true);             // Version made by (2.0)
    cdView.setUint16(6, 20, true);             // Version needed to extract (2.0)
    cdView.setUint16(8, 0, true);              // General purpose bit flag
    cdView.setUint16(10, 0, true);             // Compression method (0 = Store)
    cdView.setUint16(12, 0, true);             // Last mod time
    cdView.setUint16(14, 0, true);             // Last mod date
    cdView.setUint32(16, crc, true);           // CRC-32
    cdView.setUint32(20, size, true);          // Compressed size
    cdView.setUint32(24, size, true);          // Uncompressed size
    cdView.setUint16(28, nameBytes.length, true); // File name length
    cdView.setUint16(30, 0, true);             // Extra field length
    cdView.setUint16(32, 0, true);             // File comment length
    cdView.setUint16(34, 0, true);             // Disk number start
    cdView.setUint16(36, 0, true);             // Internal file attributes
    cdView.setUint32(38, 0, true);             // External file attributes
    cdView.setUint32(42, offset, true);        // Relative offset of local header

    cdHeaders.push(cd, nameBytes);
    offset += 30 + nameBytes.length + size;
  }

  const cdOffset = offset;
  let cdSize = 0;
  for (const h of cdHeaders) {
    cdSize += h.length;
  }

  // End of central directory record (22 bytes)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true);     // EOCD signature
  eocdView.setUint16(4, 0, true);              // Number of this disk
  eocdView.setUint16(6, 0, true);              // Disk where central directory starts
  eocdView.setUint16(8, files.length, true);   // Total entries on this disk
  eocdView.setUint16(10, files.length, true);  // Total entries in central directory
  eocdView.setUint32(12, cdSize, true);        // Size of central directory
  eocdView.setUint32(16, cdOffset, true);      // Offset of central directory
  eocdView.setUint16(20, 0, true);             // ZIP file comment length

  // Create combined binary array
  const allParts = [...parts, ...cdHeaders, eocd];
  return new Blob(allParts as unknown as BlobPart[], { type: 'application/zip' });
}
