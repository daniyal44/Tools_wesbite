'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Upload, Download, ShieldCheck, RefreshCw } from 'lucide-react';
import { fileToImage, imageToSquarePngBytes, baseName } from '@/lib/image/canvas';
import { encodeIco, DEFAULT_ICO_SIZES, IcoImage } from '@/lib/image/ico';
import { downloadBlob } from '@/lib/utils';

export interface IcoConverterProps {
  fromLabel: string;
  accept: string;
  acceptExts: string[];
}

export default function IcoConverter({ fromLabel, accept, acceptExts }: IcoConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [sizes, setSizes] = useState<number[]>([16, 32, 48, 256]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef('');

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const isValid = (f: File) => {
    const name = f.name.toLowerCase();
    return acceptExts.some((ext) => name.endsWith(`.${ext}`)) || f.type.startsWith('image/');
  };

  const handleFile = (f: File) => {
    if (!isValid(f)) {
      alert(`Please select a valid ${fromLabel} image.`);
      return;
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(f);
    urlRef.current = url;
    setFile(f);
    setPreviewUrl(url);
  };

  const toggleSize = (size: number) => {
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size].sort((a, b) => a - b)));
  };

  const handleDownload = async () => {
    if (!file || sizes.length === 0) return;
    setIsProcessing(true);
    try {
      const img = await fileToImage(file);
      const images: IcoImage[] = [];
      for (const size of sizes) {
        images.push({ size, png: await imageToSquarePngBytes(img, size) });
      }
      const blob = encodeIco(images);
      downloadBlob(blob, `${baseName(file.name)}.ico`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create ICO file.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
              : 'border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Convert {fromLabel} to ICO
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Create a multi-resolution Windows .ico favicon. Square images work best. Processed in your browser.
              </p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors">
              Select {fromLabel} File
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-800 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Source" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{file.name}</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 text-xs font-semibold text-blue-600 hover:underline"
              >
                Change image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFile(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
              Icon sizes to include (px)
            </label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_ICO_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    sizes.includes(size)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {size}×{size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isProcessing || sizes.length === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white shadow-sm transition-colors"
          >
            {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {isProcessing ? 'Building ICO…' : 'Download .ico'}
          </button>
        </div>
      )}

      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-sm text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% Private:</strong> The .ico file is generated locally in your browser. Your image never leaves your device.
        </span>
      </div>
    </div>
  );
}
