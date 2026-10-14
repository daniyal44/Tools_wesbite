/**
 * Lightweight Client-Side GIF89a Encoder
 * Encodes an array of ImageData frames into an animated GIF Blob with palette quantization and LZW compression.
 */

export function encodeGif(
  frames: ImageData[],
  delayMs: number,
  width: number,
  height: number
): Blob {
  const bytes: number[] = [];

  const writeString = (str: string) => {
    for (let i = 0; i < str.length; i++) {
      bytes.push(str.charCodeAt(i));
    }
  };

  const writeWord = (val: number) => {
    bytes.push(val & 0xff);
    bytes.push((val >> 8) & 0xff);
  };

  // Header: GIF89a
  writeString('GIF89a');

  // Logical Screen Descriptor
  writeWord(width);
  writeWord(height);
  // Packed field: Global Color Table Flag = 1, Color Res = 7 (8 bits), Sort = 0, Size = 7 (256 colors)
  bytes.push(0xf7);
  bytes.push(0x00); // Background Color Index
  bytes.push(0x00); // Pixel Aspect Ratio

  // Build standard 256-color Global Palette (6x6x6 color cube + 40 grayscale levels)
  const palette: [number, number, number][] = [];
  for (let r = 0; r < 6; r++) {
    for (let g = 0; g < 6; g++) {
      for (let b = 0; b < 6; b++) {
        palette.push([Math.round(r * 51), Math.round(g * 51), Math.round(b * 51)]);
      }
    }
  }
  for (let i = 0; i < 40; i++) {
    const v = Math.round((i * 255) / 39);
    palette.push([v, v, v]);
  }

  // Write Global Color Table (256 * 3 = 768 bytes)
  for (const [r, g, b] of palette) {
    bytes.push(r, g, b);
  }

  // Application Extension: NETSCAPE 2.0 (for infinite looping)
  bytes.push(0x21, 0xff, 0x0b);
  writeString('NETSCAPE2.0');
  bytes.push(0x03, 0x01);
  writeWord(0); // 0 = Loop infinitely
  bytes.push(0x00); // Block terminator

  const delayInCentiseconds = Math.max(2, Math.round(delayMs / 10));

  // Find closest palette index for RGB color
  const colorMatch = (r: number, g: number, b: number): number => {
    // Quick formula for 6x6x6 cube
    const cr = Math.min(5, Math.floor((r + 25) / 51));
    const cg = Math.min(5, Math.floor((g + 25) / 51));
    const cb = Math.min(5, Math.floor((b + 25) / 51));
    return cr * 36 + cg * 6 + cb;
  };

  // Encode each frame
  for (const frame of frames) {
    // Graphic Control Extension
    bytes.push(0x21, 0xf9, 0x04);
    bytes.push(0x00); // Disposal = none, transparent flag = 0
    writeWord(delayInCentiseconds);
    bytes.push(0x00); // Transparent color index
    bytes.push(0x00); // Block terminator

    // Image Descriptor
    bytes.push(0x2c);
    writeWord(0); // Left
    writeWord(0); // Top
    writeWord(width);
    writeWord(height);
    bytes.push(0x00); // Local color table flag = 0

    // Quantize pixels to palette indices
    const data = frame.data;
    const indexedPixels = new Uint8Array(width * height);
    for (let i = 0, p = 0; i < data.length; i += 4, p++) {
      indexedPixels[p] = colorMatch(data[i], data[i + 1], data[i + 2]);
    }

    // Write LZW Compressed Image Data
    const lzwData = lzwCompress(indexedPixels, 8);
    bytes.push(8); // LZW minimum code size
    for (let offset = 0; offset < lzwData.length; offset += 254) {
      const chunk = lzwData.slice(offset, offset + 254);
      bytes.push(chunk.length);
      for (const b of chunk) bytes.push(b);
    }
    bytes.push(0x00); // Sub-block terminator
  }

  // GIF Trailer
  bytes.push(0x3b);

  return new Blob([new Uint8Array(bytes)], { type: 'image/gif' });
}

/**
 * Standard LZW compression for 8-bit GIF raster data
 */
function lzwCompress(pixels: Uint8Array, minCodeSize: number): number[] {
  const clearCode = 1 << minCodeSize;
  const eofCode = clearCode + 1;

  let codeSize = minCodeSize + 1;
  let nextCode = clearCode + 2;

  const dict = new Map<string, number>();

  const output: number[] = [];
  let bitBuffer = 0;
  let bitCount = 0;

  const writeBits = (code: number, size: number) => {
    bitBuffer |= code << bitCount;
    bitCount += size;
    while (bitCount >= 8) {
      output.push(bitBuffer & 0xff);
      bitBuffer >>= 8;
      bitCount -= 8;
    }
  };

  const resetDict = () => {
    dict.clear();
    for (let i = 0; i < clearCode; i++) {
      dict.set(String.fromCharCode(i), i);
    }
    codeSize = minCodeSize + 1;
    nextCode = clearCode + 2;
  };

  resetDict();
  writeBits(clearCode, codeSize);

  let currentSeq = '';

  for (let i = 0; i < pixels.length; i++) {
    const char = String.fromCharCode(pixels[i]);
    const candidate = currentSeq + char;

    if (dict.has(candidate)) {
      currentSeq = candidate;
    } else {
      writeBits(dict.get(currentSeq)!, codeSize);

      if (nextCode < 4096) {
        dict.set(candidate, nextCode++);
        if (nextCode > (1 << codeSize) && codeSize < 12) {
          codeSize++;
        }
      } else {
        writeBits(clearCode, codeSize);
        resetDict();
      }
      currentSeq = char;
    }
  }

  if (currentSeq) {
    writeBits(dict.get(currentSeq)!, codeSize);
  }

  writeBits(eofCode, codeSize);

  if (bitCount > 0) {
    output.push(bitBuffer & 0xff);
  }

  return output;
}
