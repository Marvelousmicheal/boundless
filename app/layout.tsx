import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Providers } from './providers';
import {
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
} from '@/lib/structured-data';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Boundless - Ideas Made Boundless',
  description:
    'Validate, fund, and grow your project with milestone-based support on Stellar.',
  keywords: [
    'crowdfunding',
    'stellar',
    'blockchain',
    'projects',
    'funding',
    'milestones',
    'boundless',
  ],
  authors: [{ name: 'Boundless Team' }],
  creator: 'Boundless',
  publisher: 'Boundless',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://boundlessfi.xyz',
    siteName: 'Boundless',
    title: 'Boundless - Ideas Made Boundless',
    description:
      'Validate, fund, and grow your project with milestone-based support on Stellar.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Boundless',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@boundless',
    creator: '@boundless',
    title: 'Boundless - Ideas Made Boundless',
    description:
      'Validate, fund, and grow your project with milestone-based support on Stellar.',
    images: ['/BOUNDLESS.png'],
  },
  alternates: {
    canonical: 'https://boundlessfi.xyz',
  },
  metadataBase: new URL('https://boundlessfi.xyz'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: generateOrganizationStructuredData(),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: generateWebsiteStructuredData(),
          }}
        />
      </head>
      <body className={`${inter.variable} font-inter antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
