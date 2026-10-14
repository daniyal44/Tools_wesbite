'use client';

import React, { useState, useMemo } from 'react';
import { Mail, Copy, Check, Download, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface Recipient {
  email: string;
  name: string;
  company: string;
  role: string;
}

const DEFAULT_RECIPIENTS_RAW = `sarah.connor@acme.ai, Sarah Connor, Acme AI, VP of Growth
alex.chen@fintechx.com, Alex Chen, FintechX, Head of Product
marcus.vance@designflow.io, Marcus Vance, DesignFlow, Creative Director`;

export default function BulkEmailGenerator() {
  const [recipientsRaw, setRecipientsRaw] = useState<string>(DEFAULT_RECIPIENTS_RAW);
  const [subjectTemplate, setSubjectTemplate] = useState<string>('Quick idea for {{company}}’s upcoming launch, {{name}}');
  const [bodyTemplate, setBodyTemplate] = useState<string>(
`Hi {{name}},

I came across your profile and noticed the impressive work you are leading as {{role}} at {{company}}.

We recently developed a new toolsuite that cuts manual repetitive workflows by over 40% for high-growth tech teams. I put together a quick 2-minute walkthrough specifically tailored to how {{company}} could benefit.

Would you be open to checking out a 3-minute demo link later this week?

Best regards,
The Zevylo Team`
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const recipients = useMemo<Recipient[]>(() => {
    return recipientsRaw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(',').map((p) => p.trim());
        return {
          email: parts[0] || 'unknown@domain.com',
          name: parts[1] || 'Colleague',
          company: parts[2] || 'your team',
          role: parts[3] || 'Leader',
        };
      });
  }, [recipientsRaw]);

  const renderedEmails = useMemo(() => {
    return recipients.map((r) => {
      const replaceVars = (template: string) => {
        return template
          .replace(/\{\{name\}\}/gi, r.name)
          .replace(/\{\{company\}\}/gi, r.company)
          .replace(/\{\{role\}\}/gi, r.role)
          .replace(/\{\{email\}\}/gi, r.email);
      };

      return {
        recipient: r,
        subject: replaceVars(subjectTemplate),
        body: replaceVars(bodyTemplate),
      };
    });
  }, [recipients, subjectTemplate, bodyTemplate]);

  const activeEmail = renderedEmails[currentIndex] || renderedEmails[0];

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadAll = () => {
    const content = renderedEmails
      .map(
        (e, i) =>
          `=== EMAIL #${i + 1} TO: ${e.recipient.email} (${e.recipient.name}) ===\nSUBJECT: ${e.subject}\n\n${e.body}\n\n`
      )
      .join('--------------------------------------------------\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-emails-rendered-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Recipient List & Variables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Recipients (CSV Format)</h2>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{recipients.length} recipients loaded</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Format: <code>email, Full Name, Company Name, Job Role</code> (one per line)
          </p>
          <textarea
            rows={6}
            value={recipientsRaw}
            onChange={(e) => {
              setRecipientsRaw(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full p-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono text-xs focus:outline-none focus:border-amber-500/50 leading-relaxed"
          />

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-gray-400 dark:text-gray-500 font-semibold self-center">Available Tags:</span>
            {['{{name}}', '{{company}}', '{{role}}', '{{email}}'].map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded bg-amber-500/10 text-amber-300 font-mono text-[11px] border border-amber-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Template Configuration */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Email Outreach Template</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Subject Line</label>
            <input
              type="text"
              value={subjectTemplate}
              onChange={(e) => setSubjectTemplate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Email Body</label>
            <textarea
              rows={6}
              value={bodyTemplate}
              onChange={(e) => setBodyTemplate(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono text-xs focus:outline-none focus:border-amber-500/50 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Rendered Preview Card */}
      {activeEmail && (
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Live Personalized Preview</h3>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-800">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="p-1 rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono px-2 text-gray-600 dark:text-gray-300">
                  {currentIndex + 1} / {renderedEmails.length}
                </span>
                <button
                  disabled={currentIndex === renderedEmails.length - 1}
                  onClick={() => setCurrentIndex((prev) => Math.min(renderedEmails.length - 1, prev + 1))}
                  className="p-1 rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  copyText('single', `To: ${activeEmail.recipient.email}\nSubject: ${activeEmail.subject}\n\n${activeEmail.body}`)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white text-xs font-semibold transition-colors"
              >
                {copiedKey === 'single' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy This Email
              </button>

              <button
                onClick={downloadAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download All ({renderedEmails.length})
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3 text-sm">
            <div className="text-xs text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-800 flex gap-2">
              <span className="font-semibold text-gray-600 dark:text-gray-300">To:</span> {activeEmail.recipient.email}
              <span className="text-zinc-600">|</span>
              <span className="text-gray-500 dark:text-gray-400">({activeEmail.recipient.name} - {activeEmail.recipient.company})</span>
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">Subject:</span> {activeEmail.subject}
            </div>
            <pre className="text-xs text-gray-600 dark:text-gray-300 font-sans whitespace-pre-wrap leading-relaxed pt-2">
              {activeEmail.body}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
