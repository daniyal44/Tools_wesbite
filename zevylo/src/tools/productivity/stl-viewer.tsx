'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, RotateCcw, Box, Download, Info } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Triangle {
  normal: Point3D;
  v1: Point3D;
  v2: Point3D;
  v3: Point3D;
}

interface ModelStats {
  triangles: number;
  width: number;
  height: number;
  depth: number;
  format: 'Binary STL' | 'ASCII STL';
  fileName: string;
}

export default function StlViewer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [triangles, setTriangles] = useState<Triangle[]>([]);
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'both'>('solid');
  const [modelColor, setModelColor] = useState<string>('#3b82f6');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Camera & Interaction state
  const rotXRef = useRef<number>(25);
  const rotYRef = useRef<number>(-35);
  const zoomRef = useRef<number>(1.0);
  const panRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const centerOffsetRef = useRef<Point3D>({ x: 0, y: 0, z: 0 });
  const modelRadiusRef = useRef<number>(1);

  const computeModelBounds = useCallback((tris: Triangle[], format: 'Binary STL' | 'ASCII STL', fileName: string) => {
    if (tris.length === 0) return;
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    for (const t of tris) {
      for (const v of [t.v1, t.v2, t.v3]) {
        if (v.x < minX) minX = v.x;
        if (v.x > maxX) maxX = v.x;
        if (v.y < minY) minY = v.y;
        if (v.y > maxY) maxY = v.y;
        if (v.z < minZ) minZ = v.z;
        if (v.z > maxZ) maxZ = v.z;
      }
    }

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const cz = (minZ + maxZ) / 2;
    centerOffsetRef.current = { x: cx, y: cy, z: cz };

    const dx = maxX - minX;
    const dy = maxY - minY;
    const dz = maxZ - minZ;
    const maxDim = Math.max(dx, dy, dz, 0.001);
    modelRadiusRef.current = maxDim / 2;
    zoomRef.current = 1.0;
    panRef.current = { x: 0, y: 0 };

    setStats({
      triangles: tris.length,
      width: Math.round(dx * 100) / 100,
      height: Math.round(dy * 100) / 100,
      depth: Math.round(dz * 100) / 100,
      format,
      fileName,
    });
    setTriangles(tris);
  }, []);

  // Helper to create a cube sample
  const loadSampleCube = useCallback(() => {
    const s = 20; // 20mm cube
    const rawVerts = [
      // front
      [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
      // back
      [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
    ];
    const triIndices = [
      [0, 1, 2], [0, 2, 3], // front
      [5, 4, 7], [5, 7, 6], // back
      [4, 0, 3], [4, 3, 7], // left
      [1, 5, 6], [1, 6, 2], // right
      [3, 2, 6], [3, 6, 7], // top
      [4, 5, 1], [4, 1, 0], // bottom
    ];

    const parsed: Triangle[] = triIndices.map(t => {
      const v1 = { x: rawVerts[t[0]][0], y: rawVerts[t[0]][1], z: rawVerts[t[0]][2] };
      const v2 = { x: rawVerts[t[1]][0], y: rawVerts[t[1]][1], z: rawVerts[t[1]][2] };
      const v3 = { x: rawVerts[t[2]][0], y: rawVerts[t[2]][1], z: rawVerts[t[2]][2] };
      return {
        normal: { x: 0, y: 0, z: 1 },
        v1, v2, v3,
      };
    });

    computeModelBounds(parsed, 'ASCII STL', 'Sample_20mm_Cube.stl');
  }, [computeModelBounds]);

  const parseBinarySTL = (buffer: ArrayBuffer, fileName: string): boolean => {
    const view = new DataView(buffer);
    if (buffer.byteLength < 84) return false;
    const triangleCount = view.getUint32(80, true);
    const expectedSize = 84 + triangleCount * 50;

    if (buffer.byteLength < expectedSize - 2 || triangleCount <= 0 || triangleCount > 500000) {
      return false;
    }

    const parsed: Triangle[] = [];
    let offset = 84;
    for (let i = 0; i < triangleCount; i++) {
      if (offset + 50 > buffer.byteLength) break;
      const nx = view.getFloat32(offset, true);
      const ny = view.getFloat32(offset + 4, true);
      const nz = view.getFloat32(offset + 8, true);

      const x1 = view.getFloat32(offset + 12, true);
      const y1 = view.getFloat32(offset + 16, true);
      const z1 = view.getFloat32(offset + 20, true);

      const x2 = view.getFloat32(offset + 24, true);
      const y2 = view.getFloat32(offset + 28, true);
      const z2 = view.getFloat32(offset + 32, true);

      const x3 = view.getFloat32(offset + 36, true);
      const y3 = view.getFloat32(offset + 40, true);
      const z3 = view.getFloat32(offset + 44, true);

      parsed.push({
        normal: { x: nx, y: ny, z: nz },
        v1: { x: x1, y: y1, z: z1 },
        v2: { x: x2, y: y2, z: z2 },
        v3: { x: x3, y: y3, z: z3 },
      });
      offset += 50;
    }

    computeModelBounds(parsed, 'Binary STL', fileName);
    return true;
  };

  const parseAsciiSTL = (text: string, fileName: string): boolean => {
    const lines = text.split('\n');
    const parsed: Triangle[] = [];
    let currNormal: Point3D = { x: 0, y: 0, z: 0 };
    let currVerts: Point3D[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('facet normal')) {
        const parts = line.split(/\s+/);
        currNormal = {
          x: parseFloat(parts[2]) || 0,
          y: parseFloat(parts[3]) || 0,
          z: parseFloat(parts[4]) || 0,
        };
        currVerts = [];
      } else if (line.startsWith('vertex')) {
        const parts = line.split(/\s+/);
        currVerts.push({
          x: parseFloat(parts[1]) || 0,
          y: parseFloat(parts[2]) || 0,
          z: parseFloat(parts[3]) || 0,
        });
      } else if (line.startsWith('endfacet') && currVerts.length >= 3) {
        parsed.push({
          normal: currNormal,
          v1: currVerts[0],
          v2: currVerts[1],
          v3: currVerts[2],
        });
      }
    }

    if (parsed.length === 0) return false;
    computeModelBounds(parsed, 'ASCII STL', fileName);
    return true;
  };

  const handleFileUpload = (file: File) => {
    setIsLoading(true);
    setError(null);
    const reader = new FileReader();

    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      // Try binary parsing first
      const isBinarySuccess = parseBinarySTL(buffer, file.name);
      if (!isBinarySuccess) {
        // Fall back to ASCII
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(buffer);
        const isAsciiSuccess = parseAsciiSTL(text, file.name);
        if (!isAsciiSuccess) {
          setError('Could not parse STL file. Please check file format.');
        }
      }
      setIsLoading(false);
    };

    reader.onerror = () => {
      setError('Error reading file.');
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  // Render loop
  const renderScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Draw coordinate grid / platform
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    const gridStep = 40;
    for (let x = 0; x <= w; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (triangles.length === 0) return;

    const radX = (rotXRef.current * Math.PI) / 180;
    const radY = (rotYRef.current * Math.PI) / 180;
    const cosX = Math.cos(radX), sinX = Math.sin(radX);
    const cosY = Math.cos(radY), sinY = Math.sin(radY);

    const scale = (Math.min(w, h) * 0.45 * zoomRef.current) / modelRadiusRef.current;
    const centerX = w / 2 + panRef.current.x;
    const centerY = h / 2 + panRef.current.y;
    const co = centerOffsetRef.current;

    // Light source vector (normalized from top right)
    const lx = 0.577, ly = -0.577, lz = 0.577;

    // Transform triangles and compute depth for Painter's Algorithm
    const transformed = triangles.map(t => {
      const transformPoint = (p: Point3D) => {
        // Center
        const px = p.x - co.x;
        const py = p.y - co.y;
        const pz = p.z - co.z;

        // Rotate Y
        const x1 = px * cosY + pz * sinY;
        const y1 = py;
        const z1 = -px * sinY + pz * cosY;

        // Rotate X
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        return {
          sx: centerX + x2 * scale,
          sy: centerY - y2 * scale, // invert Y for canvas
          depth: z2,
        };
      };

      const v1 = transformPoint(t.v1);
      const v2 = transformPoint(t.v2);
      const v3 = transformPoint(t.v3);
      const avgDepth = (v1.depth + v2.depth + v3.depth) / 3;

      // Calculate face normal in screen space to compute lighting & backface culling
      const d1x = v2.sx - v1.sx, d1y = v2.sy - v1.sy;
      const d2x = v3.sx - v1.sx, d2y = v3.sy - v1.sy;
      const crossZ = d1x * d2y - d1y * d2x;

      return { v1, v2, v3, avgDepth, crossZ };
    });

    // Sort by depth (Painter's Algorithm)
    transformed.sort((a, b) => a.avgDepth - b.avgDepth);

    // Parse base model color
    let r = 59, g = 130, b = 246; // default blue
    if (modelColor.startsWith('#') && modelColor.length === 7) {
      r = parseInt(modelColor.slice(1, 3), 16);
      g = parseInt(modelColor.slice(3, 5), 16);
      b = parseInt(modelColor.slice(5, 7), 16);
    }

    for (const item of transformed) {
      // Optional backface cull if solid
      if (renderMode === 'solid' && item.crossZ <= 0) continue;

      ctx.beginPath();
      ctx.moveTo(item.v1.sx, item.v1.sy);
      ctx.lineTo(item.v2.sx, item.v2.sy);
      ctx.lineTo(item.v3.sx, item.v3.sy);
      ctx.closePath();

      if (renderMode === 'solid' || renderMode === 'both') {
        // Simple directional lighting
        const normZ = item.crossZ > 0 ? 0.8 : 0.3;
        const lightIntensity = Math.min(1.0, Math.max(0.2, (normZ + (item.avgDepth * 0.001) + 0.3) * lx + ly * 0.2 + lz * 0.5));
        const cr = Math.floor(r * lightIntensity);
        const cg = Math.floor(g * lightIntensity);
        const cb = Math.floor(b * lightIntensity);

        ctx.fillStyle = `rgb(${cr}, ${cg}, ${cb})`;
        ctx.fill();
      }

      if (renderMode === 'wireframe' || renderMode === 'both') {
        ctx.strokeStyle = renderMode === 'both' ? 'rgba(255, 255, 255, 0.25)' : modelColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }, [triangles, renderMode, modelColor]);

  useEffect(() => {
    renderScene();
  }, [renderScene]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSampleCube();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadSampleCube]);

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    if (e.shiftKey) {
      // Pan
      panRef.current.x += dx;
      panRef.current.y += dy;
    } else {
      // Rotate
      rotYRef.current += dx * 0.8;
      rotXRef.current += dy * 0.8;
    }
    renderScene();
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    zoomRef.current = Math.min(5.0, Math.max(0.1, zoomRef.current * zoomFactor));
    renderScene();
  };

  const resetView = () => {
    rotXRef.current = 25;
    rotYRef.current = -35;
    zoomRef.current = 1.0;
    panRef.current = { x: 0, y: 0 };
    renderScene();
  };

  const exportSnapshot = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `${stats?.fileName || '3d_model'}_snapshot.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* 3D Canvas Viewport */}
      <div className="relative rounded-2xl border border-gray-800 bg-slate-950 shadow-2xl overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={900}
          height={550}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-[500px] cursor-grab active:cursor-grabbing block"
        />

        {/* Viewport Overlay Controls */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60 text-xs">
          <button
            onClick={() => { setRenderMode('solid'); renderScene(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              renderMode === 'solid' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Solid
          </button>
          <button
            onClick={() => { setRenderMode('wireframe'); renderScene(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              renderMode === 'wireframe' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Wireframe
          </button>
          <button
            onClick={() => { setRenderMode('both'); renderScene(); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              renderMode === 'both' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Solid + Edges
          </button>
          <div className="w-[1px] h-5 bg-slate-700 mx-1" />
          <input
            type="color"
            value={modelColor}
            onChange={(e) => { setModelColor(e.target.value); renderScene(); }}
            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
            title="Model Color"
          />
        </div>

        {/* Top Right Action Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={resetView}
            className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
            title="Reset Camera"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={exportSnapshot}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            title="Save PNG Image"
          >
            <Download className="h-4 w-4" /> Snapshot
          </button>
        </div>

        {/* Viewport Hints */}
        <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 select-none">
          Drag: Rotate | Shift+Drag: Pan | Scroll: Zoom
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto" />
              <p className="text-xs text-slate-300">Parsing 3D Mesh Triangles...</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-xl">
          {error}
        </div>
      )}

      {/* Upload and Sample Models Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Dropzone */}
        <div className="md:col-span-2 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center hover:border-blue-500 transition-colors">
          <Upload className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">
            Upload Your STL 3D Model
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">
            Supports both Binary STL & ASCII STL files (up to 500k triangles). Rendered completely client-side in browser.
          </p>
          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-sm transition-all active:scale-95">
            <Upload className="h-4 w-4" /> Select .stl File
            <input
              type="file"
              accept=".stl"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(f);
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* Model Stats Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-1.5">
            <Info className="h-4 w-4 text-blue-500" /> Model Inspector
          </h4>
          {stats ? (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">File Name:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[140px]" title={stats.fileName}>
                  {stats.fileName}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Triangle Count:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                  {stats.triangles.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Bounding Box:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200 tabular-nums">
                  {stats.width} × {stats.height} × {stats.depth} mm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Format:</span>
                <span className="font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {stats.format}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400 text-center py-4">
              Load a model to view mesh dimensions and triangle counts.
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={loadSampleCube}
              className="w-full py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-1.5"
            >
              <Box className="h-3.5 w-3.5" /> Load Sample Cube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
