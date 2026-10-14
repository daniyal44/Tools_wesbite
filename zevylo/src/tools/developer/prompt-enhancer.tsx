'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Copy, Check, Sliders, ExternalLink } from 'lucide-react';

type TargetEngine = 'chatgpt' | 'claude' | 'midjourney' | 'dalle';

const PERSONAS = [
  'Senior Principal Software Architect',
  'World-Class Direct-Response Copywriter & Growth Marketer',
  'Master Teacher & Pedagogy Expert (explain like I am 5 to 25)',
  'Award-Winning Sci-Fi & Creative Fiction Author',
  'Executive Management Consultant (McKinsey / BCG style)',
  'Cybersecurity Red Team Penetration Tester',
];

const OUTPUT_STYLES = [
  'Markdown tables with comprehensive comparison rows',
  'Step-by-step numbered checklist with validation gates',
  'Clean, type-safe production code with no placeholders',
  'Concise executive brief under 250 words',
  'Strict JSON schema with no explanatory preamble',
];

const IMAGE_MODIFIERS = [
  'Photorealistic, 8K UHD resolution',
  'Cinematic lighting, volumetric fog',
  'Shot on 35mm film, f/1.4 shallow depth of field',
  'Octane render, ray-traced reflections',
  'Studio lighting, clean neutral minimalist background',
  'Dramatic rim light, golden hour atmospheric glow',
];

export default function PromptEnhancer() {
  const [basePrompt, setBasePrompt] = useState<string>(
    'Write a landing page headline and feature breakdown for an AI productivity app'
  );
  const [engine, setEngine] = useState<TargetEngine>('chatgpt');
  const [persona, setPersona] = useState<string>(PERSONAS[1]);
  const [outputStyle, setOutputStyle] = useState<string>(OUTPUT_STYLES[0]);
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([
    IMAGE_MODIFIERS[0],
    IMAGE_MODIFIERS[1],
  ]);
  const [includeChainOfThought, setIncludeChainOfThought] = useState<boolean>(true);
  const [negativeConstraints, setNegativeConstraints] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const isImageEngine = engine === 'midjourney' || engine === 'dalle';

  const enhancedPrompt = useMemo(() => {
    if (!basePrompt.trim()) return '';

    if (isImageEngine) {
      if (engine === 'midjourney') {
        return `/imagine prompt: ${basePrompt.trim()}, ${selectedModifiers.join(', ')} --v 6.0 --ar 16:9 --style raw`;
      } else {
        return `A high-end commercial digital photograph depicting: ${basePrompt.trim()}. Visual aesthetics: ${selectedModifiers.join(', ')}. Clean composition, centered subject, highly detailed textures.`;
      }
    }

    // Text / LLM Engine (ChatGPT / Claude)
    const sections: string[] = [];

    // 1. Role
    sections.push(`### Role & Persona\nYou are an elite ${persona}. Deliver high-impact, expert-grade solutions.`);

    // 2. Objective
    sections.push(`### Primary Objective\n${basePrompt.trim()}`);

    // 3. Execution Framework
    const instructions: string[] = [];
    if (includeChainOfThought) {
      instructions.push('Think methodically step-by-step: analyze user intent, draft structure, and refine before outputting final answer.');
    }
    instructions.push(`Format the final output strictly according to this guideline: ${outputStyle}.`);
    if (negativeConstraints) {
      instructions.push('Do NOT provide generic filler, corporate jargon, or apologies. Be direct, authoritative, and actionable.');
    }
    sections.push(`### Instructions & Constraints\n${instructions.map((ins, i) => `${i + 1}. ${ins}`).join('\n')}`);

    return sections.join('\n\n');
  }, [
    basePrompt,
    engine,
    persona,
    outputStyle,
    selectedModifiers,
    includeChainOfThought,
    negativeConstraints,
    isImageEngine,
  ]);

  const toggleModifier = (mod: string) => {
    if (selectedModifiers.includes(mod)) {
      setSelectedModifiers(selectedModifiers.filter((m) => m !== mod));
    } else {
      setSelectedModifiers([...selectedModifiers, mod]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Target Model Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'chatgpt', label: 'ChatGPT / GPT-4o' },
          { id: 'claude', label: 'Claude 3.5 Sonnet' },
          { id: 'midjourney', label: 'Midjourney v6' },
          { id: 'dalle', label: 'DALL-E 3' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setEngine(item.id as TargetEngine)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              engine === item.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-blue-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input Prompt & Configurations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Base Prompt & Modifiers */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
          <div>
            <label htmlFor="core-prompt-input" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Your Core Idea / Raw Prompt
            </label>
            <textarea
              id="core-prompt-input"
              rows={4}
              value={basePrompt}
              onChange={(e) => setBasePrompt(e.target.value)}
              placeholder="e.g. Write a python script to parse CSV or Generate a futuristic cyberpunk city skyline..."
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {!isImageEngine ? (
            <>
              <div>
                <label htmlFor="expert-persona-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Expert Persona / Tone
                </label>
                <select
                  id="expert-persona-select"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  {PERSONAS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="output-formatting-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Output Formatting Strategy
                </label>
                <select
                  id="output-formatting-select"
                  value={outputStyle}
                  onChange={(e) => setOutputStyle(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  {OUTPUT_STYLES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={includeChainOfThought}
                    onChange={(e) => setIncludeChainOfThought(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Inject Step-by-Step Chain-of-Thought (CoT) reasoning
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={negativeConstraints}
                    onChange={(e) => setNegativeConstraints(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Enforce anti-fluff negative constraints (No preamble, no apologies)
                </label>
              </div>
            </>
          ) : (
            <div>
              <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5" /> Visual Style Modifiers:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {IMAGE_MODIFIERS.map((mod) => {
                  const isSelected = selectedModifiers.includes(mod);
                  return (
                    <button
                      key={mod}
                      onClick={() => toggleModifier(mod)}
                      className={`rounded-lg px-2.5 py-1 text-xs transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold'
                          : 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {mod}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Optimized Engineered Prompt */}
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-950/20 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-blue-600" /> Optimized Engineered Prompt
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </div>

            <div className="h-80 overflow-y-auto rounded-xl border border-blue-100 dark:border-blue-900/40 bg-white dark:bg-gray-900 p-4 font-mono text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap select-all shadow-inner">
              {enhancedPrompt}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/40 flex items-center justify-between text-xs text-blue-900 dark:text-blue-300">
            <span>Ready to paste directly into {engine.toUpperCase()}</span>
            <a
              href={engine === 'claude' ? 'https://claude.ai' : 'https://chat.openai.com'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
            >
              Open AI Chat <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
