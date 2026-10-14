'use client';

import React, { useState, useMemo } from 'react';
import { Briefcase, Copy, Check, Sparkles, Globe, Target, Lightbulb } from 'lucide-react';

export default function AiBusinessNameGenerator() {
  const [industry, setIndustry] = useState('AI Automation & Workflow SaaS');
  const [keywords, setKeywords] = useState('fast, intelligent, workflow, autopilot, scale');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const brandIdeas = useMemo(() => {
    return [
      {
        name: 'Autoflow AI',
        style: 'Compound Tech',
        tagline: 'Workflows on Autopilot',
        domains: ['autoflow.ai', 'getautoflow.com', 'autoflow.io'],
        positioning: 'Designed for modern operations and high-growth engineering teams looking to eliminate manual busywork.',
      },
      {
        name: 'Veloce',
        style: 'Modern Evocative',
        tagline: 'Velocity Redefined for Modern Teams',
        domains: ['veloce.io', 'useveloce.com', 'velocehq.com'],
        positioning: 'A sleek, premium brand identity conveying instantaneous execution, elegance, and zero friction.',
      },
      {
        name: 'SynapseScale',
        style: 'Power SaaS',
        tagline: 'Intelligent Infrastructure at Scale',
        domains: ['synapsescale.com', 'synapse.ai', 'trysynapse.com'],
        positioning: 'Built for enterprise IT decision-makers seeking enterprise-grade security and interconnected data pipelines.',
      },
      {
        name: 'Loomik',
        style: 'Playful Brandable',
        tagline: 'Smart Work Made Effortless',
        domains: ['loomik.com', 'loomik.app', 'getloomik.com'],
        positioning: 'Friendly, accessible software identity targeting solo-founders, creators, and modern digital agencies.',
      },
      {
        name: 'Kinetix Ops',
        style: 'High Performance',
        tagline: 'Zero-Latency Workflow Engine',
        domains: ['kinetixops.com', 'kinetix.ai', 'kinetix.dev'],
        positioning: 'Technical, dynamic brand emphasizing rapid automation, real-time metrics, and precision.',
      },
      {
        name: 'Nexaflow',
        style: 'Futuristic Neo',
        tagline: 'The Next Generation of Business Intelligence',
        domains: ['nexaflow.ai', 'nexaflow.co', 'joinnexaflow.com'],
        positioning: 'A future-proof identity for automated pipelines, AI integrations, and next-gen developer tools.',
      },
    ];
  }, [industry, keywords]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedName(text);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-500" /> Business Category / Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. AI Workflow SaaS, Sustainable Fashion..."
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Core Descriptors &amp; Vibe Keywords
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. fast, clean, minimal, smart..."
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Generated Brand Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Curated Brand Names &amp; Domains ({brandIdeas.length} concepts)
          </h3>
          <span className="text-xs text-gray-500">Phonetically engineered for memorability</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandIdeas.map((brand, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    {brand.style}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(brand.name)}
                    className="text-xs text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    title="Copy Name"
                  >
                    {copiedName === brand.name ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div>
                  <h4 className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                    {brand.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    "{brand.tagline}"
                  </p>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {brand.positioning}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-500" /> Domain Concepts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {brand.domains.map((dom, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 font-mono text-[11px] text-gray-700 dark:text-gray-300"
                    >
                      {dom}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
