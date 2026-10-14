'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Calculator, Sparkles } from 'lucide-react';

export default function PriceEstimator() {
  const [projectTitle, setProjectTitle] = useState<string>('Custom Website Redesign & SEO');
  const [hours, setHours] = useState<number>(35);
  const [hourlyRate, setHourlyRate] = useState<number>(65);
  const [fixedCosts, setFixedCosts] = useState<number>(250);
  const [contingencyPercent, setContingencyPercent] = useState<number>(15);
  const [marginPercent, setMarginPercent] = useState<number>(25);
  const [currency, setCurrency] = useState<string>('$');
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const rawLabor = Math.max(0, hours) * Math.max(0, hourlyRate);
    const directCosts = rawLabor + Math.max(0, fixedCosts);
    const contingency = directCosts * (Math.max(0, contingencyPercent) / 100);
    const totalCostBasis = directCosts + contingency;
    
    // Profit margin calculation: Total Price = Cost / (1 - margin/100) or Cost * (1 + margin/100)
    const marginMultiplier = 1 + Math.max(0, marginPercent) / 100;
    const recommendedPrice = totalCostBasis * marginMultiplier;

    const economyPrice = totalCostBasis * 1.05; // 5% margin
    const standardPrice = recommendedPrice;
    const premiumPrice = recommendedPrice * 1.45; // 45% premium markup

    return {
      rawLabor,
      directCosts,
      contingency,
      totalCostBasis,
      recommendedPrice,
      economyPrice,
      standardPrice,
      premiumPrice,
    };
  }, [hours, hourlyRate, fixedCosts, contingencyPercent, marginPercent]);

  const proposalText = useMemo(() => {
    return `PROJECT ESTIMATE & PRICING PROPOSAL
Project: ${projectTitle}

Summary of Cost Architecture:
• Estimated Work Scope: ${hours} hours @ ${currency}${hourlyRate}/hr = ${currency}${stats.rawLabor.toFixed(2)}
• Fixed Software/Overhead: ${currency}${fixedCosts.toFixed(2)}
• Risk Contingency Buffer (${contingencyPercent}%): ${currency}${stats.contingency.toFixed(2)}
• Total Project Cost Basis: ${currency}${stats.totalCostBasis.toFixed(2)}

Recommended Investment Packages:
1. Standard Package (Recommended): ${currency}${stats.standardPrice.toFixed(2)}
   Full project delivery with testing, documentation, and standard revision window.

2. Premium Tier (Priority Turnaround + 30 Days Support): ${currency}${stats.premiumPrice.toFixed(2)}
   Accelerated delivery timeline, dedicated Slack channel, and 30-day warranty.

3. Base / Economy Tier: ${currency}${stats.economyPrice.toFixed(2)}
   Core deliverables only with self-service maintenance.

Valid for 30 calendar days from issue date.`;
  }, [projectTitle, hours, currency, hourlyRate, stats, fixedCosts, contingencyPercent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(proposalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Input Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Project / Product Title
          </label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Estimated Effort (Hours)
          </label>
          <input
            type="number"
            min="0"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Hourly Labor Rate ({currency})
          </label>
          <input
            type="number"
            min="0"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Fixed Tooling/Overhead ({currency})
          </label>
          <input
            type="number"
            min="0"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Contingency Risk Buffer (%)
          </label>
          <input
            type="number"
            min="0"
            value={contingencyPercent}
            onChange={(e) => setContingencyPercent(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Target Profit Margin (%)
          </label>
          <input
            type="number"
            min="0"
            value={marginPercent}
            onChange={(e) => setMarginPercent(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Currency Symbol
          </label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>
      </div>

      {/* 3 Tier Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">Economy Floor</span>
          <div className="text-3xl font-extrabold text-zinc-200">
            {currency}{stats.economyPrice.toFixed(0)}
          </div>
          <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
            Bare-bones delivery covering direct costs + basic 5% contingency buffer.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Standard / Market Fit</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-black">RECOMMENDED</span>
          </div>
          <div className="text-3xl font-extrabold text-amber-400">
            {currency}{stats.standardPrice.toFixed(0)}
          </div>
          <p className="text-xs text-amber-200/80 leading-relaxed">
            Optimal balance of competitive pricing and a healthy {marginPercent}% gross margin.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Premium Tier</span>
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {currency}{stats.premiumPrice.toFixed(0)}
          </div>
          <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
            Includes accelerated timeline, priority revisions, and post-launch support.
          </p>
        </div>
      </div>

      {/* Client Proposal Generator */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Client Proposal & Price Quote Text</h3>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Proposal
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {proposalText}
        </pre>
      </div>
    </div>
  );
}
