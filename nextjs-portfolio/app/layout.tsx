import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Navbar from './components/nav' 
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
// IMPORTANT: Ensure this path matches where your actual file is located!
import { AuthProvider } from "@/app/contexts/AuthContext"; 

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ReintenSpark Technology Pvt Ltd.',
    template: '%s | Innovation in Drones & AI',
  },
  description: 'Leading the future of robotics and IoT.',
}

const cx = (...classes: (string | undefined | boolean)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'antialiased scroll-smooth',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden selection:bg-[#39FF14]/30">
        {/* The AuthProvider must wrap EVERYTHING that uses useAuth(), 
            including the Navbar and the children (pages).
        */}
        <AuthProvider>
          {/* TOP BANNER */}
          <div className="fixed top-0 left-0 w-full h-9 z-[70] bg-neutral-100 dark:bg-[#141416] border-b border-neutral-200 dark:border-white/5 flex items-center justify-center text-[12px] sm:text-sm transition-colors duration-300">
            <p className="text-neutral-500 dark:text-neutral-400">
              Building the future of AI & Robotics at{' '}
              <span className="text-[#39FF14] font-medium">ReintenSpark</span>.
            </p>
          </div>

          <div className="relative flex flex-col min-h-screen mt-9">
            <Navbar />
            
            <main className="flex-1 w-full flex flex-col items-center">
              <div className="w-full max-w-8xl pt-24 pb-12 transition-all duration-300">
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