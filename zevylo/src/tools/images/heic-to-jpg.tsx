'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Download, Sparkles, ShieldCheck } from 'lucide-react';
import heic2any from 'heic2any';
import { formatBytes } from '@/lib/utils';

export default function HeicToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrls, setOutputUrls] = useState<string[]>([]);
  const [outputSizes, setOutputSizes] = useState<number[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setOutputUrls([]);
    setOutputSizes([]);
  };

  const processConvert = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const converted = await heic2any({ 
        blob: file, 
        toType: 'image/jpeg', 
        quality: 0.9 
      });

      const blobs = Array.isArray(converted) ? converted : [converted];
      
      const urls = blobs.map(blob => URL.createObjectURL(blob));
      const sizes = blobs.map(blob => blob.size);

      setOutputUrls(urls);
      setOutputSizes(sizes);
      setIsProcessing(false);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  const handleDownload = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    const baseName = file?.name.replace(/\.[^/.]+$/, '') || 'image';
    a.download = outputUrls.length > 1 ? `${baseName}-${index + 1}.jpg` : `${baseName}.jpg`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <ImageIcon className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Convert HEIC to JPG</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Convert Apple HEIC photos to standard JPG format directly in your browser.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-blue-500/20">
          <ImageIcon className="w-4 h-4" />
          Select HEIC File
          <input type="file" accept=".heic,.heif,image/heic,image/heif" onChange={handleFileChange} className="hidden" />
        </label>

        {file && (
          <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
            {file.name} ({formatBytes(file.size)})
          </div>
        )}
      </div>

      {file && (
        <div className="space-y-6">
          {outputUrls.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {outputUrls.map((url, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center space-y-4">
                  <img src={url} alt={`Converted ${i + 1}`} className="max-h-48 rounded-lg object-contain" />
                  <button
                    onClick={() => handleDownload(url, i)}
                    className="w-full px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download JPG ({formatBytes(outputSizes[i])})
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% In-browser conversion · No upload required
            </div>

            {outputUrls.length === 0 && (
              <button
                type="button"
                onClick={processConvert}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? 'Converting...' : 'Convert to JPG'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
