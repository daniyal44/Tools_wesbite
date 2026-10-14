'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Check,
  Code2,
  Quote,
  Copy,
  X,
} from 'lucide-react';

interface ToolInteractiveBarProps {
  slug: string;
  name: string;
  category: string;
}

export function ToolInteractiveBar({ slug, name, category }: ToolInteractiveBarProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  // Modals / Drawers
  const [showEmbedModal, setShowEmbedModal] = useState<boolean>(false);
  const [showCiteModal, setShowCiteModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Initialize recent tools and check favorite status
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const favs: string[] = JSON.parse(localStorage.getItem('zevylo_favorite_tools') || '[]');
        setIsFavorite(favs.includes(slug));

        const feedbackStore: Record<string, 'up' | 'down'> = JSON.parse(
          localStorage.getItem('zevylo_tool_feedback') || '{}'
        );
        if (feedbackStore[slug]) {
          setFeedback(feedbackStore[slug]);
        }

        interface RecentItem {
          slug: string;
          name: string;
          category: string;
          timestamp: number;
        }
        const recents: RecentItem[] = JSON.parse(localStorage.getItem('zevylo_recent_tools') || '[]');
        const filtered = recents.filter((item) => item.slug !== slug);
        const updated = [{ slug, name, category, timestamp: Date.now() }, ...filtered].slice(0, 8);
        localStorage.setItem('zevylo_recent_tools', JSON.stringify(updated));
      } catch {
        // Ignore localStorage exceptions in private browsing
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [slug, name, category]);

  const toggleFavorite = () => {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem('zevylo_favorite_tools') || '[]');
      let updated: string[];
      if (favs.includes(slug)) {
        updated = favs.filter((s) => s !== slug);
        setIsFavorite(false);
      } else {
        updated = [...favs, slug];
        setIsFavorite(true);
      }
      localStorage.setItem('zevylo_favorite_tools', JSON.stringify(updated));
      window.dispatchEvent(new Event('zevylo_favorites_updated'));
    } catch {
      // Ignore error
    }
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    try {
      const feedbackStore: Record<string, 'up' | 'down'> = JSON.parse(
        localStorage.getItem('zevylo_tool_feedback') || '{}'
      );
      feedbackStore[slug] = type;
      localStorage.setItem('zevylo_tool_feedback', JSON.stringify(feedbackStore));
    } catch {
      // Ignore
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const toolUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/tools/${category}/${slug}`
    : `https://zevylo.netlify.app/tools/${category}/${slug}`;

  // Backlink & Embed Snippets
  const iframeSnippet = `<iframe src="${toolUrl}" width="100%" height="650" frameborder="0" style="border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" title="${name}"></iframe>\n<p style="font-size: 12px; color: #64748b; margin-top: 6px;">Free online tool provided by <a href="${toolUrl}" target="_blank" rel="noopener">Zevylo</a></p>`;

  const markdownSnippet = `[${name} — Free Online Tool](${toolUrl})`;
  const htmlSnippet = `<a href="${toolUrl}" title="${name}">${name} — Free Online Tool by Zevylo</a>`;
  const apaCitation = `Zevylo. (2026). ${name} [Web Application]. Retrieved from ${toolUrl}`;

  // Social URLs
  const encodedUrl = encodeURIComponent(toolUrl);
  const encodedTitle = encodeURIComponent(`${name} — Free 100% Private Browser Tool`);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const redditUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3 pt-3 pb-2 border-b border-gray-200 dark:border-gray-800 text-xs">
        {/* Left Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              isFavorite
                ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/30'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            title={isFavorite ? 'Remove from Pinned Favorites' : 'Pin to Favorites'}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isFavorite ? 'Pinned' : 'Favorite'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
            title="Share Tool"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-500" />
            <span>Share</span>
          </button>

          {/* Embed Widget Button (Generates incoming Backlinks!) */}
          <button
            onClick={() => setShowEmbedModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
            title="Embed this tool on your website or blog"
          >
            <Code2 className="w-3.5 h-3.5 text-purple-500" />
            <span>&lt;&gt; Embed</span>
          </button>

          {/* Cite & Backlink Button */}
          <button
            onClick={() => setShowCiteModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
            title="Cite this tool or get backlink snippet"
          >
            <Quote className="w-3.5 h-3.5 text-emerald-500" />
            <span>Cite / Backlink</span>
          </button>
        </div>

        {/* Helpful Feedback Widget */}
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span>Helpful?</span>
          <button
            onClick={() => handleFeedback('up')}
            className={`p-1.5 rounded-md transition-colors ${
              feedback === 'up'
                ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            title="Yes, this tool is helpful"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleFeedback('down')}
            className={`p-1.5 rounded-md transition-colors ${
              feedback === 'down'
                ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            title="Needs improvement"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
          {feedback && (
            <span className="text-[11px] text-green-600 dark:text-green-400 font-medium ml-1">
              Thanks!
            </span>
          )}
        </div>
      </div>

      {/* Embed Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  Embed &ldquo;{name}&rdquo; on Your Website
                </h3>
              </div>
              <button
                onClick={() => setShowEmbedModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Add this responsive tool widget directly to your blog, documentation, or company portal. The widget runs 100% in-browser with zero tracking.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                HTML Embed Code (Responsive Iframe with Backlink Attribution)
              </label>
              <pre className="text-xs font-mono p-3 rounded-xl bg-gray-950 text-gray-200 border border-gray-800 overflow-x-auto whitespace-pre-wrap break-all leading-normal">
                {iframeSnippet}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-gray-500">
                Includes verified backlink attribution to Zevylo
              </span>
              <button
                onClick={() => copyToClipboard('iframe', iframeSnippet)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  copiedSnippet === 'iframe'
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                }`}
              >
                {copiedSnippet === 'iframe' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Embed Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cite & Backlink Modal */}
      {showCiteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  Cite & Link to &ldquo;{name}&rdquo;
                </h3>
              </div>
              <button
                onClick={() => setShowCiteModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Writing a tutorial, blog article, GitHub repository, or academic paper? Copy pre-formatted citation and backlink links below:
            </p>

            {/* Markdown */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Markdown Link (GitHub / Blog)</span>
                <button
                  onClick={() => copyToClipboard('md', markdownSnippet)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  {copiedSnippet === 'md' ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === 'md' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-xs font-mono p-2.5 rounded-lg bg-gray-950 text-gray-200 border border-gray-800 overflow-x-auto whitespace-pre-wrap break-all">
                {markdownSnippet}
              </pre>
            </div>

            {/* HTML */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">HTML Anchor Link</span>
                <button
                  onClick={() => copyToClipboard('html', htmlSnippet)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  {copiedSnippet === 'html' ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === 'html' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-xs font-mono p-2.5 rounded-lg bg-gray-950 text-gray-200 border border-gray-800 overflow-x-auto whitespace-pre-wrap break-all">
                {htmlSnippet}
              </pre>
            </div>

            {/* APA Academic */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">APA Citation</span>
                <button
                  onClick={() => copyToClipboard('apa', apaCitation)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  {copiedSnippet === 'apa' ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === 'apa' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-xs font-mono p-2.5 rounded-lg bg-gray-950 text-gray-200 border border-gray-800 overflow-x-auto whitespace-pre-wrap break-all">
                {apaCitation}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  Share &ldquo;{name}&rdquo;
                </h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1-Click Social Sharing Links */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-sky-500 bg-gray-50 hover:bg-sky-50 dark:bg-gray-800/60 dark:hover:bg-sky-950/40 text-gray-800 dark:text-gray-200 font-semibold text-xs transition-colors"
              >
                <span>Share on X / Twitter</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 bg-gray-50 hover:bg-blue-50 dark:bg-gray-800/60 dark:hover:bg-blue-950/40 text-gray-800 dark:text-gray-200 font-semibold text-xs transition-colors"
              >
                <span>Share on LinkedIn</span>
              </a>
              <a
                href={redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-orange-500 bg-gray-50 hover:bg-orange-50 dark:bg-gray-800/60 dark:hover:bg-orange-950/40 text-gray-800 dark:text-gray-200 font-semibold text-xs transition-colors"
              >
                <span>Share on Reddit</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-emerald-500 bg-gray-50 hover:bg-emerald-50 dark:bg-gray-800/60 dark:hover:bg-emerald-950/40 text-gray-800 dark:text-gray-200 font-semibold text-xs transition-colors"
              >
                <span>Share on WhatsApp</span>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-center gap-2 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-600 bg-gray-50 hover:bg-blue-50 dark:bg-gray-800/60 dark:hover:bg-blue-950/40 text-gray-800 dark:text-gray-200 font-semibold text-xs transition-colors"
              >
                <span>Share on Facebook</span>
              </a>
            </div>

            {/* Direct Copy URL */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Direct Tool Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={toolUrl}
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-400 select-all"
                />
                <button
                  onClick={() => copyToClipboard('direct', toolUrl)}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 flex items-center gap-1 transition-colors"
                >
                  {copiedSnippet === 'direct' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet === 'direct' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
