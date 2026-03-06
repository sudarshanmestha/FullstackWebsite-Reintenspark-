'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Page() {
  const [showModal, setShowModal] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const HERO_VIDEO = "/videos/homepage-hero.mp4"
  const PREVIEW_VIDEO_SRC = "https://cdn.cosmicjs.com/00e107d0-9155-11ef-b5a0-93db72e2be98-ai-development.mp4"
  const THUMB_URL = "https://imgix.cosmicjs.com/f0509380-9231-11ef-b5a0-93db72e2be98-ai-development.png?auto=compress,format&w=1000"

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 })
  }, [])

  return (
    <div className="min-h-screen transition-colors duration-300 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Fixed Mobile Alignment */}
      <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 h-full w-full object-cover z-0 opacity-60"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Improved container with better mobile padding */}
        <div className="relative z-20 w-full px-4 sm:px-6 text-center" data-aos="zoom-out">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.2] md:leading-tight max-w-5xl mx-auto drop-shadow-2xl">
            Transforming <span className="text-[#39FF14]">Knowledge </span> into<br className="hidden md:block" />
            <span className="text-[#39FF14]">Real-World</span> Innovation.
          </h2>
        </div>

        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 md:gap-3 text-white/70 hover:text-[#39FF14] transition-colors cursor-pointer animate-bounce">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Explore</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6">
            <path d="M12.0051 14.3089L3.02634 5.33058C2.77971 5.08336 2.44995 4.94736 2.09834 4.94736C1.74654 4.94736 1.41698 5.08336 1.16995 5.33058L0.38361 6.11731C0.136195 6.36414 0 6.69409 0 7.0457C0 7.39731 0.136195 7.72687 0.38361 7.97389L11.0736 18.664C11.3214 18.912 11.6525 19.0478 12.0045 19.0469C12.358 19.0478 12.6888 18.9122 12.9368 18.664L23.6164 7.98385C23.8638 7.73682 24 7.40726 24 7.05546C24 6.70385 23.8638 6.37428 23.6164 6.12707L22.83 5.34053C22.3182 4.82872 21.4851 4.82872 20.9735 5.34053L12.0051 14.3089Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* 2. CONTENT SECTION - Fixed Padding and Alignment */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 bg-transparent overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-30 transition-opacity pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#39FF14] rounded-full blur-[120px] md:blur-[160px]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-20">
            
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left" data-aos="fade-up">
              <p className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#39FF14] border border-[#39FF14]/30 rounded-full bg-[#39FF14]/5">
                Igniting Future Innovation
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-neutral-900 dark:text-white">
                Transforming Knowledge into <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-teal-400">
                  Real-World Innovation.
                </span>
              </h1>

              <p className="text-sm md:text-lg text-neutral-500 dark:text-neutral-400 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed text-center sm:text-justify">
                Explore the limitless possibilities of electronics, AI, and emerging technologies. We are dedicated to providing cutting-edge solutions and fostering an environment of learning and collaboration.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Link href="/projects" className="w-full sm:w-auto text-center px-8 py-4 bg-[#39FF14] text-black rounded-full text-[11px] font-bold uppercase tracking-widest shadow-lg hover:shadow-neon transition-all hover:scale-105">
                  Explore Projects
                </Link>
                <Link href="/courses" className="w-full sm:w-auto text-center px-8 py-4 border border-neutral-200 dark:border-white/20 text-neutral-900 dark:text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-white/5 transition-all">
                  View Courses
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/2" data-aos="fade-up" data-aos-delay="200">
              <div 
                className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-200 dark:border-white/10 glass-panel shadow-xl md:shadow-2xl cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setShowModal(true)}
              >
                {isHovering ? (
                  <video 
                    src={PREVIEW_VIDEO_SRC} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full">
                     <img 
                      src={THUMB_URL} 
                      alt="Preview" 
                      className="w-full h-full object-cover opacity-90 dark:opacity-70 transition-opacity duration-700" 
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-500" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MODAL - Fixed Sizing */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-5xl bg-white dark:bg-[#141416] rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border dark:border-white/10">
            <button 
              className="absolute right-3 top-3 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#39FF14] hover:text-black transition-colors"
              onClick={() => setShowModal(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative aspect-video w-full">
              <video src={PREVIEW_VIDEO_SRC} autoPlay controls className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}