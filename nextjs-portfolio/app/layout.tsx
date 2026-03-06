// app/layout.tsx
import { AuthProvider } from "@/lib/AuthContext"; // MUST be this exact path
import Navbar from './components/nav';
import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Footer from './components/footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ReintenSpark Technology Pvt Ltd.',
    template: '%s | Innovation in Drones & AI',
  },
  description: 'Leading the future of robotics and IoT.',
}

const cx = (...classes: (string | undefined | boolean)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx('antialiased scroll-smooth', GeistSans.variable, GeistMono.variable)}>
      <body className="min-h-screen flex flex-col overflow-x-hidden selection:bg-[#39FF14]/30">
        <AuthProvider>
          {/* Banner */}
          <div className="fixed top-0 left-0 w-full h-9 z-[70] bg-neutral-100 dark:bg-[#141416] border-b border-neutral-200 dark:border-white/5 flex items-center justify-center text-[12px] sm:text-sm">
            <p className="text-neutral-500 dark:text-neutral-400">
              Building the future of AI & Robotics at <span className="text-[#39FF14] font-medium">ReintenSpark</span>.
            </p>
          </div>

          {/* CHANGED: Removed 'mt-9' so content starts at the very top */}
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 w-full flex flex-col items-center">
              {/* CHANGED: Removed 'pt-24' to eliminate top padding inside the main container */}
              <div className="w-full max-w-8xl pb-12 transition-all duration-300">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </AuthProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}