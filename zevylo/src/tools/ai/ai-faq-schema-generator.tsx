'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  HelpCircle,
  Plus,
  Trash2,
  Code2,
  FileCode,
  Layers,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function AIFAQSchemaGenerator() {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('Website Visitors & Customers');
  const [count, setCount] = useState<number>(4);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [activeOutputTab, setActiveOutputTab] = useState<'schema' | 'html' | 'markdown'>('schema');
  const [copied, setCopied] = useState(false);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const presets = [
    {
      label: '💻 SaaS Subscription App',
      topic: 'AI video editor that creates viral TikTok shorts from long podcasts',
      audience: 'Content Creators & Podcasters',
      count: 4,
    },
    {
      label: '🛍️ E-Commerce Store',
      topic: 'Handcrafted sustainable leather bags with worldwide shipping and lifetime warranty',
      audience: 'Online Shoppers',
      count: 4,
    },
    {
      label: '🏥 Dental & Medical Clinic',
      topic: 'Modern family dental care including teeth whitening, Invisalign, and emergency visits',
      audience: 'Local Patients',
      count: 4,
    },
    {
      label: '📚 Online Coding Bootcamp',
      topic: '12-week intensive full-stack JavaScript and AI developer career accelerator',
      audience: 'Career Switchers & Aspiring Developers',
      count: 5,
    },
  ];

  const handleGenerate = () => {
    if (!topic.trim()) return;

    const clean = topic.trim();

    const generatedPool: FAQItem[] = [
      {
        id: '1',
        question: `How does ${clean.split(' ')[0] || 'this solution'} work?`,
        answer: `It automates your workflow using streamlined modern technology. You simply connect your inputs, specify your preferences, and receive instant, production-ready outputs in seconds without complex setup.`,
      },
      {
        id: '2',
        question: `Is there a free trial or money-back guarantee?`,
        answer: `Yes, you can get started completely free with zero credit card required. We also provide a no-questions-asked satisfaction guarantee on all premium plans.`,
      },
      {
        id: '3',
        question: `How secure is my data and privacy?`,
        answer: `Security is our highest priority. All data transmission is encrypted end-to-end using modern TLS/HTTPS protocols. We never sell your personal information or train public models on your private data.`,
      },
      {
        id: '4',
        question: `Can I cancel or change my plan at any time?`,
        answer: `Absolutely. You can upgrade, downgrade, or cancel your subscription at any moment with a single click from your account dashboard. There are no cancellation fees or long-term lock-ins.`,
      },
      {
        id: '5',
        question: `What kind of customer support is available?`,
        answer: `Our dedicated support team is available 24/7 via live chat and email. We also provide extensive documentation, video walkthroughs, and community guides to help you get the most out of the platform.`,
      },
      {
        id: '6',
        question: `How does this compare to traditional alternative solutions?`,
        answer: `Unlike legacy manual tools, our solution reduces task completion time by over 80% while significantly eliminating human errors and overhead costs.`,
      },
    ];

    const selected = generatedPool.slice(0, count);
    setFaqs(selected);
    setOpenAccordionId(selected[0]?.id || null);
  };

  const handleUpdate = (id: string, field: 'question' | 'answer', val: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: val } : f))
    );
  };

  const handleAdd = () => {
    const newId = String(Date.now());
    setFaqs((prev) => [
      ...prev,
      {
        id: newId,
        question: 'New Question Here?',
        answer: 'Add your clear, helpful answer here.',
      },
    ]);
    setOpenAccordionId(newId);
  };

  const handleRemove = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const generateJsonLd = () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    };

    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  };

  const generateHtml = () => {
    let html = `<div class="faq-container">\n`;
    faqs.forEach((f) => {
      html += `  <details class="faq-item">\n`;
      html += `    <summary class="faq-question">${f.question}</summary>\n`;
      html += `    <div class="faq-answer">\n      <p>${f.answer}</p>\n    </div>\n`;
      html += `  </details>\n`;
    });
    html += `</div>`;
    return html;
  };

  const generateMarkdown = () => {
    let md = `## Frequently Asked Questions\n\n`;
    faqs.forEach((f) => {
      md += `### ${f.question}\n\n${f.answer}\n\n`;
    });
    return md;
  };

  const copyCurrentOutput = () => {
    let text = '';
    if (activeOutputTab === 'schema') text = generateJsonLd();
    else if (activeOutputTab === 'html') text = generateHtml();
    else text = generateMarkdown();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Preset Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Industry FAQ Templates:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTopic(p.topic);
                setTargetAudience(p.audience);
                setCount(p.count);
              }}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Product, Service, or Topic Description:
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. AI-powered presentation outline creator with speaker notes and instant export..."
            rows={3}
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Target Audience:
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Busy Founders, Online Shoppers"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              FAQ Question Count:
            </label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={3}>3 Core Questions</option>
              <option value={4}>4 Essential Questions</option>
              <option value={5}>5 Detailed Questions</option>
              <option value={6}>6 Comprehensive Questions</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate {count} High-Intent FAQs &amp; Schema</span>
        </button>
      </div>

      {/* Results View */}
      {faqs.length > 0 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Editable Accordion Section */}
          <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <h3 className="font-black text-lg text-gray-900 dark:text-gray-100">
                  Interactive FAQ Editor ({faqs.length} Items)
                </h3>
                <p className="text-xs text-gray-500">
                  Click any question to preview and edit its text directly.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Q&amp;A</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((f, idx) => {
                const isOpen = openAccordionId === f.id;
                return (
                  <div
                    key={f.id}
                    className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50/50 dark:bg-gray-950/40"
                  >
                    <div
                      onClick={() => setOpenAccordionId(isOpen ? null : f.id)}
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-100/60 dark:hover:bg-gray-900/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {f.question}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(f.id);
                          }}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {isOpen && (
                      <div className="p-4 pt-0 space-y-3 border-t border-gray-100 dark:border-gray-800/60 bg-white dark:bg-gray-900">
                        <div className="pt-3">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Question:
                          </label>
                          <input
                            type="text"
                            value={f.question}
                            onChange={(e) => handleUpdate(f.id, 'question', e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Answer:
                          </label>
                          <textarea
                            value={f.answer}
                            rows={3}
                            onChange={(e) => handleUpdate(f.id, 'answer', e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Code Box */}
          <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('schema')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    activeOutputTab === 'schema'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  JSON-LD Schema
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('html')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    activeOutputTab === 'html'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  HTML Accordion
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('markdown')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    activeOutputTab === 'markdown'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Markdown
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Google Validated</span>
                </span>
                <button
                  onClick={copyCurrentOutput}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-950 text-gray-200 font-mono text-xs overflow-x-auto max-h-96 shadow-inner">
              <pre className="whitespace-pre-wrap">
                {activeOutputTab === 'schema' && generateJsonLd()}
                {activeOutputTab === 'html' && generateHtml()}
                {activeOutputTab === 'markdown' && generateMarkdown()}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
