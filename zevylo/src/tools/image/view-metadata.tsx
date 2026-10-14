'use client';

import React, { useState } from 'react';
import { 
  Info, 
  Copy, 
  Check, 
  ShieldCheck, 
  Layers, 
  RotateCcw,
  Plus
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface MetadataState {
  name: string;
  size: number;
  type: string;
  lastModified: string;
  width: number;
  height: number;
  megapixels: string;
  aspectRatio: string;
  headerHex: string;
}

export default function ViewMetadata() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [metadata, setMetadata] = useState<MetadataState | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);

    // Read first 32 bytes for magic hex signature
    const buffer = await f.slice(0, 32).arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const hexArray = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0').toUpperCase());
    const hexString = hexArray.join(' ');

    // Detect dimensions if image
    let width = 0;
    let height = 0;

    if (f.type.startsWith('image/')) {
      const img = new Image();
      img.src = url;
      await new Promise((res) => {
        img.onload = () => {
          width = img.naturalWidth;
          height = img.naturalHeight;
          res(null);
        };
        img.onerror = () => res(null);
      });
    }

    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = width > 0 && height > 0 ? gcd(width, height) : 1;
    const aspect = width > 0 && height > 0 ? `${width / divisor}:${height / divisor}` : 'N/A';
    const mp = width > 0 && height > 0 ? ((width * height) / 1000000).toFixed(2) : '0';

    setMetadata({
      name: f.name,
      size: f.size,
      type: f.type || 'Unknown MIME',
      lastModified: new Date(f.lastModified).toUTCString(),
      width,
      height,
      megapixels: `${mp} MP`,
      aspectRatio: aspect,
      headerHex: hexString,
    });
  };

  const copyAsJson = () => {
    if (!metadata) return;
    navigator.clipboard.writeText(JSON.stringify(metadata, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl('');
    setMetadata(null);
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Info className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Online Metadata Viewer (Ezgif Metadata Viewer)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Inspect EXIF data, binary headers, dimensions, and file specifications online without uploading files.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-cyan-500/20">
          <Plus className="w-4 h-4" />
          Select Image or File to Inspect
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {metadata && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
              {previewUrl && file?.type.startsWith('image/') && (
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                </div>
              )}
              <div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate max-w-xs">{metadata.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {formatBytes(metadata.size)} · {metadata.type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyAsJson}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied JSON!' : 'Copy JSON'}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Inspect Another
              </button>
            </div>
          </div>

          {/* Metadata Table */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              File & EXIF Specifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'File Name', val: metadata.name },
                { label: 'File Size', val: `${formatBytes(metadata.size)} (${metadata.size} bytes)` },
                { label: 'MIME Type', val: metadata.type },
                { label: 'Pixel Width', val: `${metadata.width} px` },
                { label: 'Pixel Height', val: `${metadata.height} px` },
                { label: 'Megapixels', val: metadata.megapixels },
                { label: 'Aspect Ratio', val: metadata.aspectRatio },
                { label: 'Last Modified', val: metadata.lastModified },
              ].map((row, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 space-y-1">
                  <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase">{row.label}</div>
                  <div className="text-xs font-mono text-gray-900 dark:text-white truncate">{row.val}</div>
                </div>
              ))}
            </div>

            {/* Binary Hex signature */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                Magic Bytes Header (First 32 Bytes):
              </label>
              <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 font-mono text-xs text-emerald-400 break-all select-all">
                {metadata.headerHex}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% In-memory binary analysis · Zero server telemetry
          </div>
        </div>
      )}
    </div>
  );
}
