'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Wand2, Sliders, Layers } from 'lucide-react';

const STYLES = [
  { id: 'photorealistic', label: 'Photorealistic / 8K', modifier: 'hyper-realistic photography, 8k resolution, shot on 35mm lens, high fidelity skin textures, award-winning national geographic style' },
  { id: 'cinematic', label: 'Cinematic Movie Still', modifier: 'cinematic movie still, 35mm film anamorphic lens, shallow depth of field, dramatic atmospheric color grading, Panavision' },
  { id: 'anime', label: 'Anime / Studio Ghibli', modifier: 'Studio Ghibli aesthetic, vibrant anime art, hand-drawn detailing, Makoto Shinkai lighting, painterly background' },
  { id: 'cyberpunk', label: 'Cyberpunk Neon', modifier: 'neon-drenched cyberpunk aesthetic, volumetric fog, rainy neon reflections, high-tech dystopian city, octane render' },
  { id: '3d-render', label: 'Pixar 3D / Octane', modifier: '3D Pixar style character render, soft clay shading, subsurface scattering, Octane render 8k, playful cute lighting' },
  { id: 'oil-painting', label: 'Classic Oil Painting', modifier: 'fine art oil on canvas, textured impasto brushstrokes, Rembrandt chiaroscuro lighting, museum masterpiece' },
  { id: 'minimalist', label: 'Minimalist Vector Art', modifier: 'minimalist flat vector illustration, Bauhaus design, clean clean lines, bold geometric negative space' },
];

const LIGHTING = [
  { id: 'golden-hour', label: 'Golden Hour (Sunset)', modifier: 'warm golden hour sun, soft rim lighting, long cinematic shadows' },
  { id: 'volumetric', label: 'Volumetric God Rays', modifier: 'dramatic volumetric god rays cutting through misty haze, high contrast' },
  { id: 'studio', label: 'Studio Softbox', modifier: 'clean studio softbox multi-point lighting, neutral balanced shadows' },
  { id: 'neon', label: 'Cyberpunk Neon Dual-Tone', modifier: 'dual-tone magenta and cyan neon backlighting, high dynamic range' },
  { id: 'moody', label: 'Moody Chiaroscuro', modifier: 'dark moody lighting, deep dramatic shadows, Caravaggio chiaroscuro' },
];

const CAMERAS = [
  { id: 'wide-angle', label: 'Wide-Angle (24mm)', modifier: 'ultra wide-angle 24mm perspective, immersive expansive scale' },
  { id: 'portrait', label: 'Portrait Prime (85mm f/1.4)', modifier: '85mm f/1.4 lens, creamy smooth bokeh background blur, sharp subject focus' },
  { id: 'macro', label: 'Macro Close-Up', modifier: 'extreme macro photography, ultra fine intricate details, micro texture focus' },
  { id: 'drone', label: 'Aerial Drone View', modifier: 'high-altitude drone bird’s-eye perspective, expansive sweeping panorama' },
];

const ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:5', '21:9', '3:2'];

export default function AiPromptGenerator() {
  const [subject, setSubject] = useState('A futuristic astronaut exploring an ancient bioluminescent crystal forest on an alien exoplanet');
  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [selectedLighting, setSelectedLighting] = useState('golden-hour');
  const [selectedCamera, setSelectedCamera] = useState('portrait');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [stylize, setStylize] = useState(250);
  const [chaos, setChaos] = useState(10);
  const [copiedMidjourney, setCopiedMidjourney] = useState(false);
  const [copiedDalle, setCopiedDalle] = useState(false);

  const styleObj = STYLES.find((s) => s.id === selectedStyle);
  const lightObj = LIGHTING.find((l) => l.id === selectedLighting);
  const camObj = CAMERAS.find((c) => c.id === selectedCamera);

  const midjourneyPrompt = useMemo(() => {
    const parts = [
      subject.trim(),
      styleObj?.modifier,
      lightObj?.modifier,
      camObj?.modifier,
      `--ar ${aspectRatio}`,
      '--v 6.0',
      '--style raw',
      `--s ${stylize}`,
      chaos > 0 ? `--c ${chaos}` : '',
    ].filter(Boolean);

    return parts.join(', ');
  }, [subject, styleObj, lightObj, camObj, aspectRatio, stylize, chaos]);

  const dalleFluxPrompt = useMemo(() => {
    return `Create a high-resolution visual of ${subject.trim()}. Rendered in ${styleObj?.label} style featuring ${styleObj?.modifier}. The scene is illuminated by ${lightObj?.modifier}, captured from a ${camObj?.modifier}. Ensure impeccable textural realism and balanced color composition in a ${aspectRatio} aspect ratio format.`;
  }, [subject, styleObj, lightObj, camObj, aspectRatio]);

  const handleCopy = (text: string, type: 'mj' | 'dalle') => {
    navigator.clipboard.writeText(text);
    if (type === 'mj') {
      setCopiedMidjourney(true);
      setTimeout(() => setCopiedMidjourney(false), 2000);
    } else {
      setCopiedDalle(true);
      setTimeout(() => setCopiedDalle(false), 2000);
    }
  };

  const sampleSubjects = [
    'A cybernetic red fox perched on a rainy Tokyo neon rooftop at night',
    'A vintage 1970s Formula 1 racecar speeding through a sun-drenched coastal Monaco cliff road',
    'A mystical alchemist brewing glowing emerald potions inside a candlelit Gothic library',
    'An ancient Zen temple floating among pastel sunset clouds in the sky',
  ];

  return (
    <div className="space-y-8">
      {/* Subject Input */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Core Subject or Scene Idea
          </label>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Quick Samples:</span>
            {sampleSubjects.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSubject(s)}
                className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 text-[11px] transition-colors"
              >
                Idea {idx + 1}
              </button>
            ))}
          </div>
        </div>
        <textarea
          rows={3}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Describe your character, scene, object, or concept..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Style Selection */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-500" /> Artistic Style
          </h3>
          <div className="space-y-1.5">
            {STYLES.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStyle(st.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  selectedStyle === st.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span>{st.label}</span>
                {selectedStyle === st.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Lighting & Camera */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-amber-500" /> Lighting Model
            </h3>
            <select
              value={selectedLighting}
              onChange={(e) => setSelectedLighting(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LIGHTING.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-500" /> Camera Lens & Angle
            </h3>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CAMERAS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Aspect Ratio (--ar)
            </h3>
            <div className="grid grid-cols-3 gap-1.5">
              {ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar}
                  type="button"
                  onClick={() => setAspectRatio(ar)}
                  className={`py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                    aspectRatio === ar
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {ar}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Midjourney Sliders */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-500" /> Advanced Model Tuning
          </h3>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span>Stylize Weight (--s)</span>
              <span className="font-bold text-blue-600">{stylize}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={stylize}
              onChange={(e) => setStylize(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
              <span>0 (Literal)</span>
              <span>250 (Balanced)</span>
              <span>1000 (Creative)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span>Chaos / Variety (--c)</span>
              <span className="font-bold text-blue-600">{chaos}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={chaos}
              onChange={(e) => setChaos(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
              <span>0 (Predictable)</span>
              <span>50 (Diverse)</span>
              <span>100 (Wild)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Midjourney Output */}
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                Midjourney v6 &amp; Stable Diffusion
              </span>
              <button
                type="button"
                onClick={() => handleCopy(midjourneyPrompt, 'mj')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copiedMidjourney ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMidjourney ? 'Copied!' : 'Copy Prompt'}</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Optimized with technical parameter flags and comma-separated stylistic weights:
            </p>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-xs font-mono text-gray-800 dark:text-gray-200 leading-relaxed break-words select-all">
              {midjourneyPrompt}
            </div>
          </div>
          <div className="pt-2 text-[11px] text-gray-500 flex items-center justify-between">
            <span>Ready for /imagine prompt</span>
            <span>{midjourneyPrompt.length} characters</span>
          </div>
        </div>

        {/* DALL-E & Flux Output */}
        <div className="rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-600 text-white">
                Flux.1 &amp; DALL·E 3 (Descriptive)
              </span>
              <button
                type="button"
                onClick={() => handleCopy(dalleFluxPrompt, 'dalle')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
              >
                {copiedDalle ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDalle ? 'Copied!' : 'Copy Prompt'}</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Natural descriptive paragraph designed for modern semantic diffusion LLMs:
            </p>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-xs text-gray-800 dark:text-gray-200 leading-relaxed break-words select-all">
              {dalleFluxPrompt}
            </div>
          </div>
          <div className="pt-2 text-[11px] text-gray-500 flex items-center justify-between">
            <span>Semantic Natural Language</span>
            <span>{dalleFluxPrompt.length} characters</span>
          </div>
        </div>
      </div>
    </div>
  );
}
