'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  User,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react';

const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface BioVariation {
  id: string;
  style: string;
  text: string;
  charCount: number;
  charLimit: number;
  highlight: string;
}

export default function AIBioGenerator() {
  const [name, setName] = useState('Alex Rivers');
  const [role, setRole] = useState('Senior Full-Stack Engineer');
  const [skills, setSkills] = useState('Next.js, TypeScript, AI Agents, Microservices');
  const [passion, setPassion] = useState('Open source, cycling, clean architecture');
  const [cta, setCta] = useState('Building next-gen developer tools');
  const [platform, setPlatform] = useState<'twitter' | 'linkedin' | 'github' | 'instagram'>('twitter');
  const [tone, setTone] = useState<'authority' | 'minimalist' | 'creative' | 'casual'>('authority');
  const [results, setResults] = useState<BioVariation[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const presets = [
    {
      label: '💻 Full-Stack Engineer',
      name: 'Elena Rostova',
      role: 'Full-Stack Software Engineer',
      skills: 'TypeScript, React, Python, PostgreSQL',
      passion: 'Clean code, mechanical keyboards, hiking',
      cta: 'Building fast web experiences',
    },
    {
      label: '🚀 Tech Founder / Indie',
      name: 'Marcus Vance',
      role: 'Founder & Product Architect',
      skills: 'B2B SaaS, Next.js, LLM Agents, Bootstrapping',
      passion: '0-to-1 building, cold coffee, espresso',
      cta: 'Sharing the raw startup journey',
    },
    {
      label: '📈 Growth & Marketing',
      name: 'Sarah Chen',
      role: 'Head of Growth Marketing',
      skills: 'SEO, Content Strategy, Conversion Rate, Analytics',
      passion: 'Data storytelling, podcasts, marathon running',
      cta: 'Scaling organic traffic to 1M+ visitors',
    },
    {
      label: '🎨 UI/UX Designer',
      name: 'Leo Thorne',
      role: 'Product Designer & Design Systems Lead',
      skills: 'Figma, Design Tokens, Micro-interactions, Accessibility',
      passion: 'Typography, brutalist architecture, street photography',
      cta: 'Crafting interfaces people love',
    },
  ];

  const platformLimits: Record<string, { label: string; limit: number; icon: React.ReactNode }> = {
    twitter: { label: 'Twitter / X', limit: 160, icon: <TwitterIcon /> },
    linkedin: { label: 'LinkedIn Headline', limit: 220, icon: <LinkedinIcon /> },
    github: { label: 'GitHub Bio', limit: 120, icon: <GithubIcon /> },
    instagram: { label: 'Instagram', limit: 150, icon: <InstagramIcon /> },
  };

  const handleGenerate = () => {
    if (!role.trim()) return;

    const limit = platformLimits[platform].limit;
    const cleanName = name.trim() || 'Alex';
    const cleanRole = role.trim();
    const cleanSkills = skills.trim();
    const cleanPassion = passion.trim();
    const cleanCta = cta.trim();

    let variations: BioVariation[] = [];

    if (platform === 'twitter') {
      variations = [
        {
          id: '1',
          style: 'Authority & Credibility',
          text: `${cleanRole} specializing in ${cleanSkills}. Obsessed with ${cleanPassion}. ${cleanCta}.`,
          charCount: 0,
          charLimit: 160,
          highlight: 'Establishes clear technical value and authority immediately in the timeline.',
        },
        {
          id: '2',
          style: 'Punchy Minimalist',
          text: `${cleanRole} • Building with ${cleanSkills.split(',')[0] || 'code'} • ${cleanPassion.split(',')[0] || 'coffee'} lover • ${cleanCta}`,
          charCount: 0,
          charLimit: 160,
          highlight: 'Bullet separators make scanning effortless on mobile Twitter feeds.',
        },
        {
          id: '3',
          style: 'Creator / Builder Hook',
          text: `Building the future of software. ${cleanRole} working on ${cleanSkills}. Outside of work: ${cleanPassion}. DMs open 📬`,
          charCount: 0,
          charLimit: 160,
          highlight: 'Action-oriented builder tone with an explicit open-inbox call to action.',
        },
        {
          id: '4',
          style: 'Conversational Storyteller',
          text: `Turning complex problems into clean solutions. ${cleanRole}. Passionate about ${cleanSkills} & ${cleanPassion}. Follow my build log 👇`,
          charCount: 0,
          charLimit: 160,
          highlight: 'Engages new profile visitors with a personal, approachable hook.',
        },
      ];
    } else if (platform === 'linkedin') {
      variations = [
        {
          id: '1',
          style: 'Executive & Impact Driven',
          text: `${cleanRole} | Helping teams scale through ${cleanSkills} | Passionate about ${cleanPassion} | ${cleanCta}`,
          charCount: 0,
          charLimit: 220,
          highlight: 'Optimized for LinkedIn search algorithms and corporate recruiters.',
        },
        {
          id: '2',
          style: 'Outcome & Metrics Oriented',
          text: `${cleanRole} specializing in ${cleanSkills} • Driving operational efficiency & high-leverage outcomes • Lifelong learner of ${cleanPassion}`,
          charCount: 0,
          charLimit: 220,
          highlight: 'Focuses on the tangible business results you deliver for organizations.',
        },
        {
          id: '3',
          style: 'Thought Leader / Innovator',
          text: `Innovating at the intersection of ${cleanSkills.split(',')[0] || 'Tech'} & System Architecture | ${cleanRole} | Mentor & Builder | ${cleanCta}`,
          charCount: 0,
          charLimit: 220,
          highlight: 'Positions you as a forward-thinking expert in your specific niche.',
        },
        {
          id: '4',
          style: 'Story-Driven Professional',
          text: `${cleanRole} with a mission to simplify complexity using ${cleanSkills}. When not shipping code: ${cleanPassion}. Let’s connect!`,
          charCount: 0,
          charLimit: 220,
          highlight: 'Approachable and professional, inviting collaborative inquiries.',
        },
      ];
    } else if (platform === 'github') {
      variations = [
        {
          id: '1',
          style: 'Clean Developer Summary',
          text: `${cleanRole} • Building with ${cleanSkills} • Love ${cleanPassion}`,
          charCount: 0,
          charLimit: 120,
          highlight: 'Compact layout optimized for the GitHub sidebar bio badge.',
        },
        {
          id: '2',
          style: 'Open Source Advocate',
          text: `${cleanRole} & open-source contributor | Focused on ${cleanSkills.split(',')[0] || 'web'} | ${cleanCta}`,
          charCount: 0,
          charLimit: 120,
          highlight: 'Emphasizes community contributions and developer tooling.',
        },
        {
          id: '3',
          style: 'Architect & Hacker',
          text: `Crafting scalable systems with ${cleanSkills}. ${cleanCta}.`,
          charCount: 0,
          charLimit: 120,
          highlight: 'High impact with zero wasted fluff words.',
        },
        {
          id: '4',
          style: 'Curious Problem Solver',
          text: `Ship fast, break nothing. ${cleanRole} passionate about ${cleanSkills}.`,
          charCount: 0,
          charLimit: 120,
          highlight: 'Memorable engineer motto that stands out to hiring managers.',
        },
      ];
    } else {
      // Instagram
      variations = [
        {
          id: '1',
          style: 'Aesthetic Line Breaks',
          text: `✨ ${cleanRole}\n💻 ${cleanSkills}\n🌱 ${cleanPassion}\n👇 Explore my projects`,
          charCount: 0,
          charLimit: 150,
          highlight: 'Clean vertical spacing with visual emoji anchors.',
        },
        {
          id: '2',
          style: 'Creative Showcase',
          text: `${cleanName} | ${cleanRole}\nTurning ideas into reality with ${cleanSkills.split(',')[0] || 'code'}\n⚡ ${cleanCta}\n🔗 Links below`,
          charCount: 0,
          charLimit: 150,
          highlight: 'Drives profile visitors down to your link in bio.',
        },
        {
          id: '3',
          style: 'Casual & Lifestyle',
          text: `Living & building in digital spaces 🚀\n${cleanRole}\nPassionate about ${cleanPassion} ☕\nCheck my work 👇`,
          charCount: 0,
          charLimit: 150,
          highlight: 'Blends professional identity with genuine lifestyle personality.',
        },
        {
          id: '4',
          style: 'Impact Minimalist',
          text: `${cleanRole} • ${cleanSkills}\n${cleanCta}\nGet in touch ✉️`,
          charCount: 0,
          charLimit: 150,
          highlight: 'Concise layout ensuring all lines stay above the fold.',
        },
      ];
    }

    // Process counts and trim if exceeding limit
    const processed = variations.map((v) => {
      let finalStr = v.text;
      if (finalStr.length > limit) {
        finalStr = finalStr.substring(0, limit - 3) + '...';
      }
      return {
        ...v,
        text: finalStr,
        charCount: finalStr.length,
      };
    });

    setResults(processed);
  };

  const copyBio = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Preset Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Professional Persona Presets:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setName(p.name);
                setRole(p.role);
                setSkills(p.skills);
                setPassion(p.passion);
                setCta(p.cta);
              }}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Selector Tabs */}
      <div className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-800/60 flex items-center gap-2 flex-wrap sm:flex-nowrap">
        {(Object.keys(platformLimits) as Array<'twitter' | 'linkedin' | 'github' | 'instagram'>).map((plat) => {
          const info = platformLimits[plat];
          const isSelected = platform === plat;
          return (
            <button
              key={plat}
              type="button"
              onClick={() => setPlatform(plat)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isSelected
                  ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {info.icon}
              <span>{info.label}</span>
              <span className="text-[10px] opacity-70">({info.limit} chars)</span>
            </button>
          );
        })}
      </div>

      {/* Input Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Name or Handle:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivers"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Professional Role or Specialty:
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Full-Stack Engineer"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Top Skills or Tech Stack:
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Next.js, TypeScript, AI, PostgreSQL"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Passions or Side Interests:
            </label>
            <input
              type="text"
              value={passion}
              onChange={(e) => setPassion(e.target.value)}
              placeholder="e.g. Open source, cycling, coffee"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Call to Action or Mission:
          </label>
          <input
            type="text"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            placeholder="e.g. Building tools for 10M+ creators"
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!role.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate 4 {platformLimits[platform].label} Bios</span>
        </button>
      </div>

      {/* Results View */}
      {results.length > 0 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span>Optimized {platformLimits[platform].label} Bios</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                Max {platformLimits[platform].limit} chars
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {results.map((item) => {
              const percentage = Math.min(100, Math.round((item.charCount / item.charLimit) * 100));
              const isOver = item.charCount > item.charLimit;

              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs hover:border-blue-400 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
                      {item.style}
                    </span>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className={isOver ? 'text-red-500 font-bold' : 'text-gray-500'}>
                        {item.charCount} / {item.charLimit} chars
                      </span>
                      <div className="w-16 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div
                          className={`h-full ${isOver ? 'bg-red-500' : 'bg-blue-600'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 flex items-start justify-between gap-4">
                    <pre className="text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-sans leading-relaxed">
                      {item.text}
                    </pre>

                    <button
                      onClick={() => copyBio(item.id, item.text)}
                      className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 text-gray-500 hover:text-blue-600 transition-colors shrink-0"
                      title="Copy Bio"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
                    💡 {item.highlight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
