'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, FileImage, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import * as pdfjsLib from 'pdfjs-dist';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export default function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [scale, setScale] = useState<number>(2);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF file.');
      return;
    }

    setFile(selected);
    setError(null);
    setIsProcessing(true);
    setPageImages([]);

    try {
      const buffer = await selected.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;
      const extractedImages: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current || document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
          const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
          const renderedUrl = canvas.toDataURL(mimeType, 0.92);
          extractedImages.push(renderedUrl);
        }
      }

      setPageImages(extractedImages);
    } catch (err) {
      setError('Failed to extract images from this PDF file. Please ensure it is not password-protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace(/\.[^/.]+$/, '')}_page_${index + 1}.${format}`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
            <FileImage className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Convert PDF Pages to High-Res Pictures</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Rasterize PDF pages directly into PNG, JPG, or WebP.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-amber-500/20">
          <Upload className="w-4 h-4" />
          Select PDF Document
          <input type="file" accept="application/pdf,.pdf" onChange={handleFileChange} className="hidden" />
        </label>

        {file && (
          <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
            {file.name} ({formatBytes(file.size)})
          </div>
        )}
      </div>

      {/* Conversion Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Target Image Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as 'png' | 'jpeg' | 'webp')}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          >
            <option value="png">PNG (Lossless, High Quality)</option>
            <option value="jpeg">JPG / JPEG (Small File Size)</option>
            <option value="webp">WebP (Modern Web Format)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Resolution Scale
          </label>
          <select
            value={scale}
            onChange={(e) => setScale(parseInt(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          >
            <option value="1">1x (Standard 72 DPI)</option>
            <option value="2">2x (High Res 150 DPI)</option>
            <option value="3">3x (Ultra HD 300 DPI)</option>
          </select>
        </div>
      </div>

      {isProcessing && (
        <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-3">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Extracting and rendering PDF pages...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20 text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Rendered Images Grid */}
      {pageImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-500" />
              Extracted Pages ({pageImages.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pageImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3 group hover:border-amber-500/50 transition-all"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 relative flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl} alt={`Extracted item ${idx + 1}`} className="w-full h-full object-contain" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400">Page #{idx + 1}</span>
                  <button
                    onClick={() => downloadImage(imgUrl, idx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden helper canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
        <span>100% Private & Client-Side: Your PDF document is rendered directly in your browser. No files are ever sent to an external server.</span>
      </div>
    </div>
  );
}
