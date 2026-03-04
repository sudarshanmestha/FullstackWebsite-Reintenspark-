import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Navbar from './components/nav' 
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ReintenSpark Technology Pvt Ltd.',
    template: '%s | Innovation in Drones & AI',
  },
  description: 'Leading the future of robotics and IoT.',
  openGraph: {
    title: 'Innovation in Drones, Robotics, and AI',
    description: 'Empowering the next generation of technology through research and development.',
    url: baseUrl,
    siteName: 'reintenspark.com',
    locale: 'en_US',
    type: 'website',
  },
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
        'antialiased text-white selection:bg-[#39FF14]/30 scroll-smooth',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
<body className={cx(
  'min-h-screen flex flex-col overflow-x-hidden text-white',
  /* SCIENTIFIC GRADIENT:
     - from-[#021b1b]: Starts with Dark Forest-Teal to make the neon logo pop.
     - via-[#051616]: Transitions into a deeper, darker teal.
     - to-black: Ends in solid black at the bottom for maximum depth.
  */
  'bg-black bg-gradient-to-b from-[#021b1b] via-[#051616] to-black'
)}>
        <AuthProvider>
          <Navbar />
          
          <main className="flex-1 w-full flex flex-col items-center">
            {/* Inner Content Wrapper */}
            <div className="w-full max-w-8xl px-4 sm:px-6 lg:px-8 pt-28 pb-12">
              {children}
            </div>
          </main>

          <Footer />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}