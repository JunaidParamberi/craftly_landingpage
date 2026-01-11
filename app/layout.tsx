import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
})

// Get app URL from environment variable (defaults to staging for beta)
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://stage.craftlyai.app'

export const metadata: Metadata = {
  title: 'CraftlyAI - Empower Your Independent Consultancy',
  description: 'CraftlyAI: AI-powered business management platform for freelancers worldwide. Automate proposals, manage clients, and track finances. Start your free trial today.',
  keywords: [
    'freelancer CRM',
    'consultant management',
    'AI proposal generator',
    'freelance invoicing software',
    'business management platform',
    'consultant CRM',
    'AI-powered invoicing',
    'freelance financial tracking',
    'consultant tools',
    'independent consultant software',
    'automated proposal generation',
    'freelance business management',
    'freelancer platform',
    'tax-compliant invoicing',
    'consultant productivity tools',
    'global freelancer platform',
    'international consultant tools',
  ],
  authors: [{ name: 'CraftlyAI' }],
  openGraph: {
    title: 'CraftlyAI - AI-Powered Business Management for Freelancers Worldwide',
    description: 'Empower your independent consultancy with AI-driven business management tools. Automate proposals, manage clients, track finances, and scale your consultancy globally. Start your 14-day free trial today.',
    url: appUrl,
    siteName: 'CraftlyAI',
    images: [
      {
        url: `${appUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'CraftlyAI - AI-powered business management platform dashboard showing proposal generation, client management, and financial tracking features for freelancers and consultants worldwide',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CraftlyAI - AI-Powered Business Management for Freelancers Worldwide',
    description: 'Empower your independent consultancy with AI-driven business management tools. Start your 14-day free trial today.',
    images: [`${appUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6366F1" />
      </head>
      <body className={`${inter.variable} ${sora.variable} font-sans dark`} suppressHydrationWarning>{children}</body>
    </html>
  )
}
