'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Lock, 
  Plus 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface CleanedItem {
  id: string;
  name: string;
  originalSize: number;
  cleanedSize: number;
  cleanedUrl: string;
  width: number;
  height: number;
}

export default function ExifRemover() {
  const [items, setItems] = useState<CleanedItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const filesArray = Array.from(fileList);
    const validImages = filesArray.filter((f) => f.type.startsWith('image/'));
    if (validImages.length === 0) return;

    setIsProcessing(true);

    try {
      const newItems: CleanedItem[] = [];

      for (const file of validImages) {
        const originalUrl = URL.createObjectURL(file);

        const img = new Image();
        img.src = originalUrl;
        await new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to load image'));
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        ctx.drawImage(img, 0, 0);

        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const cleanedBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b || new Blob()), mime, 0.95);
        });

        const cleanedUrl = URL.createObjectURL(cleanedBlob);

        newItems.push({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          originalSize: file.size,
          cleanedSize: cleanedBlob.size,
          cleanedUrl,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }

      setItems((prev) => [...prev, ...newItems]);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Remove EXIF Metadata from Images (EXIF Cleaner)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Wipe GPS location coordinates, camera models, and timestamps from your photos before sharing.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-emerald-500/20">
          <Plus className="w-4 h-4" />
          Upload Photos to Clean
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {isProcessing && (
        <div className="p-8 text-center text-xs text-gray-500 dark:text-gray-400 font-mono">
          Scrubbing binary metadata and stripping GPS tags...
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              {items.length} {items.length === 1 ? 'Photo Cleaned & Secured' : 'Photos Cleaned & Secured'}
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-start gap-3"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                  <img
                    src={item.cleanedUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-gray-900 dark:text-white truncate">{item.name}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.width} × {item.height} px · {formatBytes(item.cleanedSize)}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 text-[10px] text-emerald-400 font-medium">
                    <Lock className="w-3 h-3" /> All GPS & camera data deleted
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 dark:text-gray-500 hover:text-red-400 p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={item.cleanedUrl}
                    download={`clean-${item.name}`}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3 h-3" /> Save
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
