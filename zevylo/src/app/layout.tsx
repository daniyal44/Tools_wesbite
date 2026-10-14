import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
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

export const metadata: Metadata = {
  title: {
    default: 'Zevylo — One Place. Every Useful Tool. (100% Free & In-Browser)',
    template: '%s | Zevylo',
  },
  description:
    'Convert, calculate, generate, analyze, optimize, and create with 157+ free online browser utilities. 100% client-side privacy, zero cloud uploads, and zero paywalls.',
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
    '100% client side tools',
  ],
  authors: [{ name: 'Zevylo Engineering Team', url: baseUrl }],
  creator: 'Zevylo',
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
    title: 'Zevylo — One Place. Every Useful Tool. (100% Free & Private)',
    description:
      '157+ free online tools across 18 categories. Convert files, calculate finances, edit video frames, and build resumes with 100% in-browser privacy.',
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
      '157+ free online browser utilities across 18 categories. 100% private, zero server uploads.',
    images: ['/images/Zevylo_logo.png'],
    creator: '@zevylo',
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
    canonical: '/',
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
      sameAs: [
        'https://github.com/zevylo',
        'https://twitter.com/zevylo',
      ],
      description: 'Zevylo provides 157+ free online client-side browser utilities across 18 categories with zero server uploads and 100% privacy.',
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
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://zevylo.netlify.app/#application',
      name: 'Zevylo Web Suite',
      operatingSystem: 'All modern web browsers (Chrome, Firefox, Safari, Edge)',
      applicationCategory: 'UtilitiesApplication',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      },
      featureList: [
        '100% Client-Side Processing',
        'Zero Cloud File Uploads',
        'Zero File Size Limits',
        'Hardware-Accelerated WebAssembly',
        'No Account or Registration Required',
      ],
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
            <Header />
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
