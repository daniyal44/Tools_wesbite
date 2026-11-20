import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import '@/tools';
import { getAllTools } from '@/lib/tools/registry';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zevylo.netlify.app';

const TOOL_COUNT = getAllTools().length;

export const metadata: Metadata = {
  // Plain string (no template) — child pages already include "| Zevylo" in their own titles.
  title: 'Zevylo — Free Online Tools That Run in Your Browser',
  description:
    `Convert, calculate, generate, and analyze with ${TOOL_COUNT} free browser utilities. Tool inputs are processed locally, with no account required.`,
  keywords: [
    'online tools',
    'free tools',
    'ezgif alternative',
    'ilovepdf alternative',
    'tinypng alternative',
    'smallseotools alternative',
    'calculator online',
    'file converter browser',
    'video to gif',
    'crop pdf online',
    'heic to jpg',
    'developer utilities',
    'SEO tools',
    'browser tools',
  ],
  authors: [{ name: 'Muhammad Daniyal', url: 'https://github.com/daniyal44' }],
  creator: 'Muhammad Daniyal',
  publisher: 'Zevylo',
  applicationName: 'Zevylo',
  category: 'Technology & Online Tools',
  classification: 'Web Utilities & Developer Tools',
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Zevylo',
    title: 'Zevylo — Free Online Tools That Run in Your Browser',
    description:
      `${TOOL_COUNT} free browser tools across 18 categories. Convert files, calculate finances, extract video frames, and build resumes with no account required.`,
    images: [
      {
        url: '/images/Zevylo_logo.png',
        width: 1200,
        height: 630,
        alt: 'Zevylo - One Place. Every Useful Tool.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zevylo — One Place. Every Useful Tool.',
    description:
      `${TOOL_COUNT} free browser utilities across 18 categories. Tool inputs stay on your device.`,
    images: ['/images/Zevylo_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: 'Q-Zq3sa2VtEBVvj8sRF0IafUtF7MqAUbl8JoG_q_H3Q',
  },
  other: {
    'google-site-verification': 'Q-Zq3sa2VtEBVvj8sRF0IafUtF7MqAUbl8JoG_q_H3Q',
    'google-adsense-account': 'ca-pub-5869892726772309',
    'llms-txt': `${baseUrl}/llms.txt`,
    'ai-citation': 'Zevylo (https://zevylo.netlify.app)',
    'format-detection': 'telephone=no',
    'rating': 'General',
    'distribution': 'Global',
    'revisit-after': '1 days',
    'target-audience': 'Global Web Users, Developers, Creators, Students, Businesses',
    'privacy-architecture': 'Tool inputs processed in the browser (no tool-input upload)',
  },
  icons: {
    icon: [
      { url: '/images/Zevylo_tab_logo.png' },
      { url: '/images/Zevylo_tab_logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/Zevylo_tab_logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/Zevylo_tab_logo.png',
    apple: [
      { url: '/images/Zevylo_tab_logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

const globalGraphSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://zevylo.netlify.app/#organization',
      name: 'Zevylo',
      url: 'https://zevylo.netlify.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
      },
      sameAs: ['https://github.com/daniyal44'],
      founder: {
        '@type': 'Person',
        name: 'Muhammad Daniyal',
        url: 'https://github.com/daniyal44',
      },
      description: `Zevylo provides ${TOOL_COUNT} browser-based utilities. Tool inputs are processed in the page, and no account is required.`,
      knowsAbout: [
        'WebAssembly Browser Utilities',
        'Client-Side PDF Processing',
        'In-Browser Video & Audio Conversion',
        'Privacy-Preserving Image Compression',
        'Developer Formatting Tools',
        'SEO & Search Engine Optimization',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://zevylo.netlify.app/#website',
      url: 'https://zevylo.netlify.app',
      name: 'Zevylo',
      inLanguage: 'en',
      publisher: {
        '@id': 'https://zevylo.netlify.app/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://zevylo.netlify.app/tools?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" href="/images/Zevylo_tab_logo.png" />
        <link rel="shortcut icon" type="image/png" href="/images/Zevylo_tab_logo.png" />
        <link rel="apple-touch-icon" href="/images/Zevylo_tab_logo.png" />
        <link rel="help" type="text/plain" href="/llms.txt" />
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5869892726772309"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalGraphSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header toolCount={TOOL_COUNT} />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
