'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, X, Ruler } from 'lucide-react';
import { loadImage, aspectRatioString } from '@/lib/image/canvas';
import { formatBytes, formatNumber } from '@/lib/utils';

interface Analyzed {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
}

export default function ImageSizeChecker() {
  const [items, setItems] = useState<Analyzed[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<Analyzed[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      for (const it of itemsRef.current) URL.revokeObjectURL(it.url);
    };
  }, []);

  const addFiles = async (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (incoming.length === 0) {
      alert('Please select image files.');
      return;
    }
    for (const file of incoming) {
      const url = URL.createObjectURL(file);
      try {
        const img = await loadImage(url);
        setItems((prev) => [
          ...prev,
          { id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, file, url, width: img.naturalWidth, height: img.naturalHeight },
        ]);
      } catch {
        URL.revokeObjectURL(url);
      }
    }
  };

  const remove = (id: string) => {
    setItems((prev) => {
      const t = prev.find((i) => i.id === id);
      if (t) URL.revokeObjectURL(t.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const printSize = (px: number, dpi: number) => (px / dpi).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
            : 'border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
          }}
        />
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Ruler className="w-7 h-7" />
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Check image size & dimensions</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Drop images to see resolution, total pixels, megapixels, aspect ratio, file size and print dimensions.
          </p>
        </div>
      </div>

      {items.map((item) => {
        const totalPixels = item.width * item.height;
        const mp = totalPixels / 1_000_000;
        return (
          <div key={item.id} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-800 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.file.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-gray-900 dark:text-gray-100 truncate" title={item.file.name}>
                    {item.file.name}
                  </p>
                  <button onClick={() => remove(item.id)} className="p-1 rounded-lg text-gray-400 hover:text-red-600 shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                  <Stat label="Dimensions" value={`${item.width} × ${item.height}`} />
                  <Stat label="Total pixels" value={formatNumber(totalPixels)} />
                  <Stat label="Megapixels" value={`${mp.toFixed(2)} MP`} />
                  <Stat label="Aspect ratio" value={aspectRatioString(item.width, item.height)} />
                  <Stat label="File size" value={formatBytes(item.file.size)} />
                  <Stat label="Format" value={item.file.type.replace('image/', '').toUpperCase() || '—'} />
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 grid grid-cols-3 gap-4 text-xs">
                  <Stat label="Print @ 72 DPI" value={`${printSize(item.width, 72)}" × ${printSize(item.height, 72)}"`} />
                  <Stat label="Print @ 150 DPI" value={`${printSize(item.width, 150)}" × ${printSize(item.height, 150)}"`} />
                  <Stat label="Print @ 300 DPI" value={`${printSize(item.width, 300)}" × ${printSize(item.height, 300)}"`} />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-sm text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% Private:</strong> Images are read locally in your browser only to measure them. Nothing is uploaded.
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-gray-400">{label}</p>
      <p className="font-mono font-semibold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  );
}
