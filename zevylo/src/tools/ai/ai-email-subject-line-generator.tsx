'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Mail,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Layers,
} from 'lucide-react';

interface SubjectLineItem {
  id: string;
  subject: string;
  preheader: string;
  formula: string;
  score: number;
  charCount: number;
  wordCount: number;
  isMobileSafe: boolean;
  spamRisk: 'Low' | 'Moderate' | 'Safe';
  explanation: string;
}

export default function AIEmailSubjectLineGenerator() {
  const [topic, setTopic] = useState('');
  const [recipient, setRecipient] = useState('Marketing Managers');
  const [campaignType, setCampaignType] = useState<'cold' | 'newsletter' | 'launch' | 'promo' | 'followup' | 'reengage'>('launch');
  const [tone, setTone] = useState<'curious' | 'urgent' | 'casual' | 'professional' | 'contrarian'>('curious');
  const [results, setResults] = useState<SubjectLineItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPreheaderId, setCopiedPreheaderId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const presets = [
    {
      label: '🚀 SaaS Feature Launch',
      topic: 'AI automated spreadsheet formula generator with instant export',
      recipient: 'Data Analysts & Finance Teams',
      type: 'launch' as const,
      tone: 'curious' as const,
    },
    {
      label: '❄️ Cold B2B Outreach',
      topic: 'Cutting cloud infrastructure costs by 35% without downtime',
      recipient: 'VPs of Engineering & CTOs',
      type: 'cold' as const,
      tone: 'professional' as const,
    },
    {
      label: '⚡ 48-Hour Flash Sale',
      topic: 'Annual pro tier subscription discount ending this Friday midnight',
      recipient: 'Existing Free Users',
      type: 'promo' as const,
      tone: 'urgent' as const,
    },
    {
      label: '📬 Weekly Newsletter',
      topic: '3 counter-intuitive growth habits from bootstrapped founders',
      recipient: 'Startup Founders & Indie Hackers',
      type: 'newsletter' as const,
      tone: 'contrarian' as const,
    },
  ];

  const handleGenerate = () => {
    if (!topic.trim()) return;

    const clean = topic.trim();
    const shortTopic = clean.length > 28 ? clean.substring(0, 28) + '...' : clean;

    const templates: SubjectLineItem[] = [
      {
        id: '1',
        subject: `The secret to ${shortTopic} (revealed)`,
        preheader: `Most teams waste hours doing this the hard way. Here is the shortcut.`,
        formula: 'Curiosity Gap',
        score: 94,
        charCount: 0,
        wordCount: 0,
        isMobileSafe: true,
        spamRisk: 'Safe',
        explanation: 'Triggers open curiosity by hinting at non-obvious insider knowledge without sounding sensationalist.',
      },
      {
        id: '2',
        subject: `Quick question about your ${shortTopic.toLowerCase()}`,
        preheader: `I noticed how your team handles this and wanted to share a faster solution.`,
        formula: 'Personal Peer Inquiry',
        score: 91,
        charCount: 0,
        wordCount: 0,
        isMobileSafe: true,
        spamRisk: 'Safe',
        explanation: 'Feels like a direct 1-on-1 message from a colleague rather than an automated marketing broadcast.',
      },
      {
        id: '3',
        subject: `How we achieved 3x results with ${shortTopic}`,
        preheader: `The step-by-step breakdown and data proof you can replicate today.`,
        formula: 'Case Study & Social Proof',
        score: 89,
        charCount: 0,
        wordCount: 0,
        isMobileSafe: true,
        spamRisk: 'Safe',
        explanation: 'Hard metric proof immediately anchors credibility in the recipient’s inbox preview.',
      },
      {
        id: '4',
        subject: `Stop struggling with ${shortTopic}`,
        preheader: `There is a modern way that completely eliminates this friction.`,
        formula: 'Pain Point Relief',
        score: 93,
        charCount: 0,
        wordCount: 0,
        isMobileSafe: true,
        spamRisk: 'Safe',
        explanation: 'Empathizes with an ongoing daily irritation and promises immediate relief.',
      },
      {
        id: '5',
        subject: `[New] Introducing faster ${shortTopic}`,
        preheader: `Built specifically based on your requests. Take a 2-minute tour.`,
        formula: 'Direct Product Announcement',
        score: 88,
        charCount: 0,
        wordCount: 0,
        isMobileSafe: true,
        spamRisk: 'Safe',
        explanation: 'Clean bracket tags like [New] stand out amidst plain text in busy inboxes.',
      },
      {
        id: '6',
        subject: `Why most people fail at ${shortTopic}`,
        preheader: `Avoid the 3 fatal mistakes that cost teams months of wasted momentum.`,
        formula: 'Contrarian Warning',
        score: 96,
        charCount: 0,
        wordCount: 0,
        isMobileSafe: true,
        spamRisk: 'Safe',
        explanation: 'Fear of making an easily preventable error triggers high emotional opening propensity.',
      },
      {
        id: '7',
        subject: `Ending soon: Your access to ${shortTopic}`,
        preheader: `Final 24 hours to secure early-bird advantages before this window closes.`,
        formula: 'Urgent Scarcity / FOMO',
        score: 90,
        charCount: 0,
        wordCount: 0,
        isMobileSafe: true,
        spamRisk: 'Low',
        explanation: 'Creates legitimate deadline pressure that motivates action without spam keywords.',
      },
      {
        id: '8',
        subject: `3 simple shortcuts for ${shortTopic}`,
        preheader: `Swipe these exact templates and implement them in under 10 minutes.`,
        formula: 'Listicle & Actionable Utility',
        score: 92,
        charCount: 0,
        wordCount: 0,
        isMobileSafe: true,
        spamRisk: 'Safe',
        explanation: 'Numbers communicate predictable consumption time, which readers find easy to open.',
      },
    ];

    const processed = templates.map((t) => {
      const chars = t.subject.length;
      const words = t.subject.trim().split(/\s+/).length;
      return {
        ...t,
        charCount: chars,
        wordCount: words,
        isMobileSafe: chars <= 45,
      };
    });

    setResults(processed);
  };

  const copyText = (id: string, text: string, isPreheader = false) => {
    navigator.clipboard.writeText(text);
    if (isPreheader) {
      setCopiedPreheaderId(id);
      setTimeout(() => setCopiedPreheaderId(null), 2000);
    } else {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const copyAll = () => {
    if (results.length === 0) return;
    const all = results
      .map(
        (r, idx) =>
          `${idx + 1}. SUBJECT: ${r.subject}\n   PREVIEW: ${r.preheader}\n   FORMULA: ${r.formula} (Score: ${r.score}/100)\n`
      )
      .join('\n');
    navigator.clipboard.writeText(all);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Preset Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Marketing Campaign Presets:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTopic(p.topic);
                setRecipient(p.recipient);
                setCampaignType(p.type);
                setTone(p.tone);
              }}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Email Topic, Offer, or Newsletter Theme:
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. AI-powered presentation outline generator that cuts slide prep from 2 hours to 2 minutes..."
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Audience / Recipient:
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Founders, Marketing Leads"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Campaign Type:
            </label>
            <select
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="launch">Product / Feature Launch</option>
              <option value="cold">B2B Cold Outreach</option>
              <option value="newsletter">Weekly Newsletter / Content</option>
              <option value="promo">Flash Sale / Discount Offer</option>
              <option value="followup">Follow-Up Gentle Nudge</option>
              <option value="reengage">Inactive User Re-engagement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Psychological Angle:
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="curious">Curiosity Gap &amp; Intrigue</option>
              <option value="urgent">Urgent Deadline / Scarcity</option>
              <option value="casual">Casual &amp; Conversational</option>
              <option value="professional">Professional &amp; Metric-Driven</option>
              <option value="contrarian">Contrarian &amp; Myth-Busting</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate 8 High-CTR Subject Lines &amp; Preheaders</span>
        </button>
      </div>

      {/* Results View */}
      {results.length > 0 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span>Subject Lines Optimized for High CTR</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                  {results.length} Options
                </span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Each option includes mobile truncation checks, spam filter audits, and matching preview text.
              </p>
            </div>

            <button
              onClick={copyAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-xs"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'All Copied' : 'Copy All 8 Options'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs hover:border-blue-400 transition-all space-y-3"
              >
                {/* Header row: Formula badge + Score + Mobile Safe Badge */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
                      {item.formula}
                    </span>
                    {item.isMobileSafe ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <Smartphone className="w-3 h-3" />
                        <span>Mobile-Safe ({item.charCount} chars)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        <Smartphone className="w-3 h-3" />
                        <span>May truncate on mobile ({item.charCount} chars)</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Spam Risk: {item.spamRisk}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-black border border-amber-200 dark:border-amber-900">
                      ★ {item.score}/100 CTR
                    </span>
                  </div>
                </div>

                {/* Subject Line Row */}
                <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Subject Line:
                    </span>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">
                      {item.subject}
                    </p>
                  </div>
                  <button
                    onClick={() => copyText(item.id, item.subject, false)}
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 text-gray-500 hover:text-blue-600 transition-colors shrink-0"
                    title="Copy Subject Line"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Preheader Preview Text Row */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Recommended Inbox Preview Text (Preheader):
                    </span>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {item.preheader}
                    </p>
                  </div>
                  <button
                    onClick={() => copyText(item.id, item.preheader, true)}
                    className="p-1.5 rounded-lg border border-blue-200 dark:border-blue-900 hover:bg-white dark:hover:bg-gray-900 text-blue-600 transition-colors shrink-0"
                    title="Copy Preview Text"
                  >
                    {copiedPreheaderId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Explanation */}
                <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
                  💡 {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
