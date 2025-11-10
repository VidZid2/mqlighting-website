import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BannerProvider } from '@/contexts/BannerContext'
import StickyBanner from '@/components/StickyBanner'
import Navigation from '@/components/Navigation'
import ErrorBoundary from '@/components/ErrorBoundary'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load heavy components
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
  loading: () => <div className="h-96 bg-[#0a2540]"></div>
})

const AIChatBot = dynamic(() => import('@/components/AIChatBot'), {
  ssr: false,
  loading: () => null
})

const CursorProvider = dynamic(() => import('@/components/CursorProvider'), {
  ssr: false
})

const SecurityProtection = dynamic(() => import('@/components/SecurityProtection'), {
  ssr: false
})

const AdvancedSecurityProtection = dynamic(() => import('@/components/AdvancedSecurityProtection'), {
  ssr: false
})

const SecurityMonitoring = dynamic(() => import('@/components/SecurityMonitoring'), {
  ssr: false
})

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MQ Group | Professional Lighting & Studio Equipment Philippines',
  description: 'Your trusted distributor of world-class motion picture, photography, broadcast, studio, stage & theater equipment in the Philippines since 1987.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href="https://api.elevenlabs.io" />
        <link rel="preconnect" href="https://api.elevenlabs.io" />
      </head>
      <body className={inter.className}>
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
        <ErrorBoundary>
          <BannerProvider>
            <Suspense fallback={null}>
              <SecurityProtection />
              <AdvancedSecurityProtection />
              <SecurityMonitoring />
              <CursorProvider />
            </Suspense>
            <StickyBanner />
            <Navigation />
            <main className="pt-12">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
              }>
                {children}
              </Suspense>
            </main>
            <Suspense fallback={<div className="h-96 bg-[#0a2540]"></div>}>
              <Footer />
            </Suspense>
            <Suspense fallback={null}>
              <AIChatBot />
            </Suspense>
          </BannerProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
