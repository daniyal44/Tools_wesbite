'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Layers,
  ChevronRight,
  RefreshCw,
  Lightbulb,
  FileText,
  Volume2,
} from 'lucide-react';

interface Slide {
  number: number;
  title: string;
  category: string;
  bullets: string[];
  visualSuggestion: string;
  speakerNotes: string;
}

interface DeckResult {
  deckTitle: string;
  subtitle: string;
  theme: string;
  colorPalette: string;
  slides: Slide[];
}

export default function AIPresentationGenerator() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('Investors & Stakeholders');
  const [deckType, setDeckType] = useState<'pitch' | 'product' | 'executive' | 'education' | 'sales'>('pitch');
  const [slideCount, setSlideCount] = useState<number>(6);
  const [tone, setTone] = useState<'executive' | 'persuasive' | 'inspiring' | 'technical'>('persuasive');
  const [result, setResult] = useState<DeckResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedNotes, setCopiedNotes] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const presets = [
    {
      label: '🚀 Seed Pitch Deck',
      topic: 'AI-powered workflow automation platform for remote teams',
      audience: 'Angel Investors & VCs',
      type: 'pitch' as const,
      slides: 6,
    },
    {
      label: '📈 Q3 Growth Review',
      topic: 'Product metrics, customer retention cohorts, and Q4 revenue targets',
      audience: 'Executive Board & Leadership',
      type: 'executive' as const,
      slides: 6,
    },
    {
      label: '⚡ Next-Gen SaaS Launch',
      topic: 'Modern developer API for real-time document search and vector indexing',
      audience: 'CTOs & Engineering Leads',
      type: 'product' as const,
      slides: 8,
    },
  ];

  const handleGenerate = () => {
    if (!topic.trim()) return;

    const cleanTopic = topic.trim();

    // Narrative generation engine based on deck type
    const deckTemplates: Record<string, { title: string; subtitle: string; theme: string; colors: string; outline: Array<{ title: string; cat: string; bullets: string[]; visual: string; notes: string }> }> = {
      pitch: {
        title: `${cleanTopic}: Reimagined`,
        subtitle: `Disrupting traditional constraints with next-generation scale`,
        theme: 'High-Impact Modern Minimalist',
        colors: 'Deep Slate Navy (#0F172A), Electric Indigo (#6366F1), Crisp White',
        outline: [
          {
            title: 'The Unmet Market Dilemma',
            cat: 'Problem Validation',
            bullets: [
              `Legacy systems in ${cleanTopic} cost enterprises millions in lost throughput and human latency.`,
              'Over 68% of surveyed teams report fatigue with disconnected, fragmented software stacks.',
              'Current point-solutions treat symptoms rather than root architectural friction.',
            ],
            visual: 'Split comparison graph showing escalating operational friction vs time',
            notes: 'Hook the room in the first 30 seconds. Emphasize that this is an urgent, budget-draining problem that legacy vendors have completely neglected.',
          },
          {
            title: 'Our Breakthrough Solution',
            cat: 'Value Proposition',
            bullets: [
              `A unified autonomous engine specifically tailored for ${cleanTopic}.`,
              'Reduces deployment and setup cycles from 14 weeks down to under 15 minutes.',
              'Instant payback ROI demonstrated across early enterprise beta testers.',
            ],
            visual: 'Hero UI screenshot with callout badges highlighting key friction removal points',
            notes: 'Pause here after showing the product hero image. Let the simplicity of the approach speak for itself before discussing technical architecture.',
          },
          {
            title: 'Total Addressable Market & Momentum',
            cat: 'Market Opportunity',
            bullets: [
              `\$14.8B serviceable addressable market (SAM) expanding at 28% CAGR through 2030.`,
              'Zero-to-one organic demand driven by bottom-up practitioner adoption.',
              'Targeting top 20% high-frequency power users as the initial go-to-market beachhead.',
            ],
            visual: 'Concentric circle TAM/SAM/SOM diagram with CAGR growth metrics',
            notes: 'Anchor the market size with reputable analyst citations. Explain why our bottom-up distribution wedges deeply into incumbent accounts.',
          },
          {
            title: 'Core Technology & Defensibility',
            cat: 'Unfair Advantage',
            bullets: [
              'Proprietary data flywheel: each workload execution refines accuracy benchmarks.',
              'Built natively on modern serverless edge architecture with sub-50ms latency.',
              'Significant switching costs built into team collaboration and workflows.',
            ],
            visual: 'Architecture flow diagram highlighting the proprietary feedback loop',
            notes: 'Defensibility is what angels and partners care most about. Clarify why a well-funded competitor cannot easily clone our retention flywheel.',
          },
          {
            title: 'Business Model & Unit Economics',
            cat: 'Financial Engine',
            bullets: [
              'Usage-based consumption tiers paired with high-LTV enterprise annual contracts.',
              '82% gross margins with predictable, expanding net revenue retention (135% NRR).',
              'CAC payback estimated at 5.2 months via viral team invites and word-of-mouth.',
            ],
            visual: 'Bar chart tracking LTV vs CAC progression across quarterly cohorts',
            notes: 'Walk through unit economics confidently. Mention that expanding NRR protects us against churn and high acquisition spend.',
          },
          {
            title: 'The Capital Ask & Growth Roadmap',
            cat: 'The Ask',
            bullets: [
              'Securing \$2.5M Seed round to expand core engineering and scale go-to-market sales.',
              '12-month milestone: Achieve \$1.2M ARR and 200 key enterprise logo deployments.',
              'Join us in establishing the default industry benchmark for this category.',
            ],
            visual: 'Gantt roadmap with milestone markers (Product v2, SOC 2, US Expansion)',
            notes: 'Close with clarity and urgency. Leave the investment ask slide up during open Q&A so investors keep the numbers top of mind.',
          },
          {
            title: 'Customer Proof & Early Testimonials',
            cat: 'Social Proof',
            bullets: [
              'Quotes from 3 design partners celebrating a 4x reduction in weekly task overhead.',
              'Average NPS of 74 across our closed beta cohort.',
              'Zero churn observed over our initial 90-day pilot testing window.',
            ],
            visual: '3 customer quote cards with headshots, company logos, and verified badges',
            notes: 'Highlight tangible business impact metrics cited by real practitioners rather than generic flattery.',
          },
          {
            title: 'World-Class Founding Team',
            cat: 'Execution Muscle',
            bullets: [
              'Founders with prior exits and deep technical backgrounds from Tier-1 tech firms.',
              'Complementary engineering, product design, and enterprise B2B sales DNA.',
              'Backed by prominent industry operators, angel advisors, and domain experts.',
            ],
            visual: 'Team headshot cards with previous company logos (Google, Stripe, Uber)',
            notes: 'Remind the room that execution capability is our greatest asset. Point out unique domain insights our team holds.',
          },
          {
            title: 'Competitive Moat Matrix',
            cat: 'Landscape Analysis',
            bullets: [
              'Matrix comparison against legacy tools, manual spreadsheets, and generic AI wrappers.',
              'Uniquely positioned in the High Speed + High Defensibility quadrant.',
              'Low latency and strict client-side data privacy as core differentiators.',
            ],
            visual: '2x2 quadrant matrix showing our solution in the upper-right winner corner',
            notes: 'Be fair to competitors while highlighting where they fundamentally fail to satisfy modern enterprise buyer security requirements.',
          },
          {
            title: 'Summary & Next Steps',
            cat: 'Call to Action',
            bullets: [
              'Pilot program onboarding open for select partner teams starting next week.',
              'Data room and customer diligence transcripts available upon request.',
              'Contact: founders@ourcompany.com | Book follow-up diligence call.',
            ],
            visual: 'High-contrast QR code and scheduling link with clean contact layout',
            notes: 'Thank the audience for their time and immediately transition into interactive dialogue.',
          },
        ],
      },
      executive: {
        title: `${cleanTopic}: Strategic Executive Brief`,
        subtitle: 'Key Performance Indicators, Operational Milestones & Action Items',
        theme: 'Corporate Executive Clean',
        colors: 'Charcoal Grey (#1E293B), Emerald Green (#10B981), Pure White',
        outline: [
          {
            title: 'Executive Summary & Core Objectives',
            cat: 'Strategic Overview',
            bullets: [
              `High-level status check on ${cleanTopic} across current quarterly milestones.`,
              'Three primary wins achieved ahead of scheduled operational timeline.',
              'One critical resource dependency requiring senior leadership alignment.',
            ],
            visual: 'Status dashboard with green/amber indicators and headline KPI numbers',
            notes: 'State the conclusion first. Busy executives appreciate knowing the outcome before drilling into granular supporting details.',
          },
          {
            title: 'Key Performance Metrics & Trends',
            cat: 'Performance Data',
            bullets: [
              'Key throughput metrics improved by 34% quarter-over-quarter.',
              'Customer satisfaction (CSAT) maintained at 94% across all cohorts.',
              'Cost per operational unit decreased from \$12.40 to \$8.10.',
            ],
            visual: 'Clean multi-line trend chart showing quarterly growth vs budget targets',
            notes: 'Explain the drivers behind the positive variance. Give credit to cross-functional collaboration between product and operations.',
          },
          {
            title: 'Challenges & Strategic Mitigation',
            cat: 'Risk Management',
            bullets: [
              'Identified supply-chain and compute bandwidth bottlenecks during peak load.',
              'Mitigation: Pre-negotiated reserved capacity and implemented automated caching.',
              'Residual risk evaluated as low under projected Q4 growth forecasts.',
            ],
            visual: 'Risk severity heatmap (Likelihood vs Impact) with mitigation tags',
            notes: 'Do not hide risks. Presenting proactive mitigations builds strong leadership credibility.',
          },
          {
            title: 'Budget Allocation & ROI Projection',
            cat: 'Resource Planning',
            bullets: [
              'Actual expenditures tracking 4.2% below initial quarterly budget forecast.',
              'Projected full-year ROI estimated at 3.2x capital investment.',
              'Reallocation of surplus savings toward high-yield automation initiatives.',
            ],
            visual: 'Waterfall chart illustrating cost savings and projected incremental returns',
            notes: 'Highlight fiscal discipline. Show that every dollar invested has generated compounding operational efficiencies.',
          },
          {
            title: 'Cross-Functional Roadmaps & Dependencies',
            cat: 'Operations',
            bullets: [
              'Product, marketing, and customer success deliverables aligned for synchronized rollout.',
              'Key milestone delivery dates confirmed for weeks 6, 9, and 12.',
              'Zero blocking technical debt reported from internal audits.',
            ],
            visual: 'Timeline ribbon with swimlanes for Engineering, Marketing, and Operations',
            notes: 'Confirm that team leads have signed off on their respective delivery dates.',
          },
          {
            title: 'Decisions Required & Immediate Next Steps',
            cat: 'Action Plan',
            bullets: [
              'Formal approval requested for expanding compute resources by 15%.',
              'Authorization to kick off Stage-2 commercial pilot rollout.',
              'Next progress review scheduled for end-of-month executive committee.',
            ],
            visual: 'Two-column decision checklist with sign-off signature blocks',
            notes: 'Summarize the specific ask. Do not end the meeting without clear decision ownership and deadlines.',
          },
        ],
      },
      product: {
        title: `${cleanTopic}: Product Architecture & Vision`,
        subtitle: 'Empowering users through seamless functionality and design',
        theme: 'Modern Tech & Product',
        colors: 'Violet Indigo (#4F46E5), Cyan Teal (#06B6D4), Off-White',
        outline: [
          {
            title: 'The User Story & Everyday Friction',
            cat: 'User Discovery',
            bullets: [
              `How current users struggle with manual workarounds in ${cleanTopic}.`,
              'Voice of Customer: Quotes illustrating daily workflow disruption.',
              'The gap between current market expectations and reality.',
            ],
            visual: 'User persona journey map highlighting red friction milestones',
            notes: 'Ground the presentation in authentic user empathy. Tell a story about a specific customer pain point.',
          },
          {
            title: 'Product Walkthrough & Core Architecture',
            cat: 'Feature Deep-Dive',
            bullets: [
              'Intuitive 3-step workflow designed for zero onboarding friction.',
              'Real-time processing with instant visual feedback loops.',
              'Robust export and integration capabilities across existing tools.',
            ],
            visual: 'Product interface mockups with callout pointers on key interactions',
            notes: 'Demonstrate how the UI anticipates the user’s next action before they even click.',
          },
          {
            title: 'Technical Implementation & Scalability',
            cat: 'Engineering',
            bullets: [
              '99.99% uptime architecture powered by decentralized microservices.',
              'Sub-second query response times even under enterprise dataset load.',
              'End-to-end encryption preserving data integrity at rest and in transit.',
            ],
            visual: 'High-level cloud infrastructure schema with API gateway and caching layers',
            notes: 'Speak to technical robustness. Assure developers and architects that this scales gracefully.',
          },
          {
            title: 'Adoption Metrics & User Feedback',
            cat: 'Validation',
            bullets: [
              'Daily active usage grew 300% during private beta testing.',
              'Task completion rates surged from 45% to 92%.',
              'Over 85% of users shared the tool organically with colleagues.',
            ],
            visual: 'Cohort retention graph and user sentiment word cloud',
            notes: 'Show that users genuinely love the product experience and come back daily.',
          },
          {
            title: 'Product Roadmap: The Next 12 Months',
            cat: 'Future Vision',
            bullets: [
              'Phase 1: Advanced automated intelligence and smart workflows.',
              'Phase 2: Mobile native applications for on-the-go productivity.',
              'Phase 3: Public API and marketplace for third-party extensions.',
            ],
            visual: 'Visual product horizon timeline with feature badges',
            notes: 'Excite the audience about where the product is headed without overpromising unfeasible timelines.',
          },
          {
            title: 'Get Started & Integration Guide',
            cat: 'Call to Action',
            bullets: [
              'Try the interactive sandbox demo in your browser right now.',
              'Documentation, API SDKs, and starter kits available today.',
              'Join our active community of builders and creators.',
            ],
            visual: 'Call-to-action buttons with sandbox link and community invite badge',
            notes: 'Invite the room to experience the product immediately.',
          },
        ],
      },
      education: {
        title: `Understanding ${cleanTopic}`,
        subtitle: 'A Comprehensive Masterclass & Practical Framework',
        theme: 'Educational Editorial',
        colors: 'Navy Blue (#1E3A8A), Warm Amber (#F59E0B), Soft Parchment',
        outline: [
          {
            title: 'Foundational Concepts & Background',
            cat: 'Introduction',
            bullets: [
              `Historical context and why ${cleanTopic} is critical today.`,
              'Core definitions simplified without academic jargon.',
              'The fundamental principles that govern this domain.',
            ],
            visual: 'Timeline graphic illustrating evolution of concepts from inception to today',
            notes: 'Start by connecting the topic to something the students or attendees already understand intimately.',
          },
          {
            title: 'The Core Mechanism: How It Works',
            cat: 'Mechanism',
            bullets: [
              'Step-by-step breakdown of the underlying process.',
              'Key variables and how changes impact overall outcomes.',
              'Common misconceptions debunked with empirical evidence.',
            ],
            visual: 'Detailed explanatory flowchart showing cause-and-effect relationships',
            notes: 'Use a clear visual metaphor here to make the abstract concept tangible.',
          },
          {
            title: 'Real-World Case Studies',
            cat: 'Application',
            bullets: [
              'Case Study A: How an industry leader applied these principles successfully.',
              'Case Study B: A cautionary tale of what happens when rules are ignored.',
              'Key takeaways and universal patterns observed across both cases.',
            ],
            visual: 'Side-by-side comparison cards comparing the two case studies',
            notes: 'Encourage attendees to identify the subtle factors that separated success from failure.',
          },
          {
            title: 'Practical Framework for Practitioners',
            cat: 'Framework',
            bullets: [
              'Actionable 4-stage playbook you can apply immediately.',
              'Tools, checklists, and templates recommended for beginners.',
              'How to measure baseline progress and avoid early pitfalls.',
            ],
            visual: 'Step-by-step visual matrix with actionable checklist items',
            notes: 'Give attendees concrete steps they can put to work the moment this presentation ends.',
          },
          {
            title: 'Common Pitfalls & How to Avoid Them',
            cat: 'Best Practices',
            bullets: [
              'Pitfall 1: Overcomplicating early iterations without validating fundamentals.',
              'Pitfall 2: Neglecting feedback loops from end users.',
              'Checklist to self-audit your work before publishing or launching.',
            ],
            visual: 'Warning callout boxes paired with defensive best practice rules',
            notes: 'Address the most common mistakes beginners make so they don’t get discouraged.',
          },
          {
            title: 'Summary, Reading List & Q&A',
            cat: 'Conclusion',
            bullets: [
              '3 core takeaways to memorize from this session.',
              'Curated recommended readings, seminal papers, and follow-up resources.',
              'Open floor for interactive discussion and questions.',
            ],
            visual: 'Summary recap card with QR code linking to lecture notes and resources',
            notes: 'Reiterate the single most important lesson before opening the floor to questions.',
          },
        ],
      },
      sales: {
        title: `Accelerating Growth with ${cleanTopic}`,
        subtitle: 'A Tailored Business Proposal & Partnership Blueprint',
        theme: 'Corporate B2B Sales',
        colors: 'Slate Black (#020617), Royal Blue (#2563EB), Warm Gold',
        outline: [
          {
            title: 'Your Current Strategic Priorities',
            cat: 'Customer Discovery',
            bullets: [
              'We heard your team’s goal to reduce operational cycle times by 40%.',
              'Current pain points identified during discovery: manual handoffs and errors.',
              'The measurable cost of maintaining current status quo practices.',
            ],
            visual: 'Customer priority scorecard highlighting primary target outcomes',
            notes: 'Demonstrate deep listening. Show that this proposal was customized strictly around their exact goals.',
          },
          {
            title: 'Proposed Strategic Partnership',
            cat: 'Our Solution',
            bullets: [
              `Deploying specialized automation for ${cleanTopic} across your teams.`,
              'Dedicated solution architects ensuring seamless transition and staff training.',
              'Guaranteed SLA benchmarks backed by contractual performance standards.',
            ],
            visual: 'Solution architecture mapping directly onto the client’s existing stack',
            notes: 'Frame this as a collaborative partnership rather than a transactional vendor sale.',
          },
          {
            title: 'Projected Economic Impact & ROI',
            cat: 'Financial Return',
            bullets: [
              'Estimated annual net cost savings: \$240,000+ across operations.',
              'Payback period achieved within the first 65 days of full rollout.',
              'Freeing up 25+ human hours weekly for strategic revenue generation.',
            ],
            visual: 'ROI calculation chart showing breakeven point and 3-year net gains',
            notes: 'Walk through the financial numbers methodically. Emphasize the opportunity cost of delaying.',
          },
          {
            title: 'Implementation Timeline & Milestones',
            cat: 'Rollout Plan',
            bullets: [
              'Weeks 1-2: Security review, environment provisioning, and data sync.',
              'Weeks 3-4: Pilot user onboarding and workflow tuning.',
              'Week 5 onwards: Full enterprise rollout and quarterly business reviews.',
            ],
            visual: 'Phased rollout roadmap showing milestones and executive review checkpoints',
            notes: 'Reassure the client that onboarding will be painless and handled entirely by our deployment team.',
          },
          {
            title: 'Commercial Terms & Investment Options',
            cat: 'Investment',
            bullets: [
              'Tiered package options tailored for your current team headcount.',
              'Includes enterprise onboarding, unlimited seats during pilot, and priority support.',
              'Special early-adopter incentive available for agreements finalized this quarter.',
            ],
            visual: 'Side-by-side pricing tier cards with clear feature checklists',
            notes: 'Recommend the tier that delivers maximum long-term value while leaving room for negotiation.',
          },
          {
            title: 'Next Steps to Launch',
            cat: 'Action Plan',
            bullets: [
              'Review Master Services Agreement (MSA) and Statement of Work (SOW).',
              'Schedule technical security audit with IT leadership.',
              'Target kick-off date: 1st of next month.',
            ],
            visual: 'Simple 3-step action checklist with contact details and kickoff calendar link',
            notes: 'Ask for the business directly: "If this meets your criteria, what prevents us from kicking off on the 1st?"',
          },
        ],
      },
    };

    const template = deckTemplates[deckType] || deckTemplates.pitch;
    const selectedSlides = template.outline.slice(0, slideCount).map((s, idx) => ({
      number: idx + 1,
      title: s.title,
      category: s.cat,
      bullets: s.bullets,
      visualSuggestion: s.visual,
      speakerNotes: s.notes,
    }));

    setResult({
      deckTitle: template.title,
      subtitle: template.subtitle,
      theme: template.theme,
      colorPalette: template.colors,
      slides: selectedSlides,
    });
    setActiveSlideIndex(0);
  };

  const copyMarkdown = () => {
    if (!result) return;
    let md = `# ${result.deckTitle}\n`;
    md += `*${result.subtitle}*\n\n`;
    md += `**Visual Theme:** ${result.theme}\n`;
    md += `**Color Palette:** ${result.colorPalette}\n\n`;
    md += `---\n\n`;

    result.slides.forEach((s) => {
      md += `## Slide ${s.number}: ${s.title} (${s.category})\n\n`;
      s.bullets.forEach((b) => {
        md += `- ${b}\n`;
      });
      md += `\n*Visual Direction:* ${s.visualSuggestion}\n\n`;
      md += `> **Speaker Notes:** ${s.speakerNotes}\n\n`;
      md += `---\n\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyNotesOnly = () => {
    if (!result) return;
    let notesText = `SPEAKER TALKING POINTS FOR: ${result.deckTitle}\n\n`;
    result.slides.forEach((s) => {
      notesText += `[Slide ${s.number} - ${s.title}]\n${s.speakerNotes}\n\n`;
    });
    navigator.clipboard.writeText(notesText);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  const downloadOutline = () => {
    if (!result) return;
    let text = `${result.deckTitle.toUpperCase()}\n${result.subtitle}\n`;
    text += `Theme: ${result.theme} | Colors: ${result.colorPalette}\n\n`;
    text += `========================================\n\n`;

    result.slides.forEach((s) => {
      text += `SLIDE ${s.number}: ${s.title.toUpperCase()}\n`;
      text += `Category: ${s.category}\n\n`;
      text += `KEY POINTS:\n`;
      s.bullets.forEach((b) => {
        text += `• ${b}\n`;
      });
      text += `\nVISUAL RECOMMENDATION:\n${s.visualSuggestion}\n\n`;
      text += `SPEAKER TALKING POINTS:\n${s.speakerNotes}\n\n`;
      text += `----------------------------------------\n\n`;
    });

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.deckTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-outline.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Preset Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Quick Start Templates:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTopic(p.topic);
                setAudience(p.audience);
                setDeckType(p.type);
                setSlideCount(p.slides);
              }}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Presentation Topic or Product Pitch:
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. AI-powered customer support copilot that slashes response latency by 70% for e-commerce brands..."
            rows={3}
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Target Audience:
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Seed Investors, B2B Buyers"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Deck Format:
            </label>
            <select
              value={deckType}
              onChange={(e) => setDeckType(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pitch">Startup Investor Pitch</option>
              <option value="executive">Executive / Board Brief</option>
              <option value="product">Product Architecture &amp; Demo</option>
              <option value="education">Educational Lecture / Workshop</option>
              <option value="sales">B2B Sales Commercial Proposal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Number of Slides:
            </label>
            <select
              value={slideCount}
              onChange={(e) => setSlideCount(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={4}>4 Slides (Lightning 3-Min)</option>
              <option value={6}>6 Slides (Standard Executive)</option>
              <option value={8}>8 Slides (Deep Dive)</option>
              <option value={10}>10 Slides (Comprehensive)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Delivery Tone:
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="persuasive">Persuasive &amp; Visionary</option>
              <option value="executive">Concise &amp; Executive</option>
              <option value="technical">Technical &amp; Rigorous</option>
              <option value="inspiring">Inspiring &amp; Motivating</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Complete Presentation Deck ({slideCount} Slides)</span>
        </button>
      </div>

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header Metadata Banner */}
          <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:bg-gray-900 p-6 flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Generated Presentation Deck
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100">
                {result.deckTitle}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {result.subtitle}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 flex-wrap">
                <span><strong>Theme:</strong> {result.theme}</span>
                <span>•</span>
                <span><strong>Palette:</strong> {result.colorPalette}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={copyMarkdown}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50 transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
              </button>

              <button
                onClick={copyNotesOnly}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50 transition-colors shadow-xs"
              >
                {copiedNotes ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{copiedNotes ? 'Copied Notes' : 'Copy Speaker Notes'}</span>
              </button>

              <button
                onClick={downloadOutline}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>
            </div>
          </div>

          {/* Slide Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {result.slides.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlideIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeSlideIndex === idx
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <span>Slide {s.number}</span>
                <span className="opacity-70 text-[10px]">({s.category})</span>
              </button>
            ))}
          </div>

          {/* Active Slide Card Preview */}
          {result.slides[activeSlideIndex] && (
            <div className="p-6 sm:p-10 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center">
                    {result.slides[activeSlideIndex].number}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {result.slides[activeSlideIndex].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
                      {result.slides[activeSlideIndex].title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                  <span>{activeSlideIndex + 1} of {result.slides.length}</span>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Slide Content &amp; Key Talking Bullets:
                </h4>
                <ul className="space-y-2.5">
                  {result.slides[activeSlideIndex].bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium flex items-start gap-2.5"
                    >
                      <span className="text-blue-500 font-bold shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Suggestion */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Recommended Visual Layout &amp; Asset:</span>
                </div>
                <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed pl-5">
                  {result.slides[activeSlideIndex].visualSuggestion}
                </p>
              </div>

              {/* Speaker Notes */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/60 space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-800 dark:text-indigo-300 font-bold text-xs">
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Presenter Talking Track &amp; Script:</span>
                </div>
                <p className="text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed pl-5 italic">
                  &ldquo;{result.slides[activeSlideIndex].speakerNotes}&rdquo;
                </p>
              </div>

              {/* Slide Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  disabled={activeSlideIndex === 0}
                  onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  ← Previous Slide
                </button>

                <button
                  type="button"
                  disabled={activeSlideIndex === result.slides.length - 1}
                  onClick={() => setActiveSlideIndex((prev) => Math.min(result.slides.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold disabled:opacity-40 hover:bg-blue-500 transition-colors"
                >
                  Next Slide →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
