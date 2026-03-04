'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import BaseUrl from 'app/components/BaseUrl'

export default function Page() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 })
  }, [])

  /* --------------------------------------------------------------
     THUMBNAIL + PLAY-ON-CLICK LOGIC
     -------------------------------------------------------------- */
  const VIMEO_ID = '918539099'
  const [showPlayer, setShowPlayer] = useState(false)
  const [thumbUrl, setThumbUrl] = useState('')

  useEffect(() => {
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${VIMEO_ID}`)
      .then(r => r.json())
      .then(data => setThumbUrl(data.thumbnail_url))
      .catch(() => setThumbUrl(''))
  }, [])

  const openPlayer = () => setShowPlayer(true)

  /* --------------------------------------------------------------
     RENDER
     -------------------------------------------------------------- */
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">

        {/* ============================================= */}
        {/* 1. ABOUT MY PROFILE (TOP SECTION) */}
        {/* ============================================= */}
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0" data-aos="fade-right">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-blue-500 ring-offset-4 ring-offset-black">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQEIt0cM0VpDuQ/profile-displayphoto-scale_200_200/B56Zrx4c3fJsAY-/0/1764994700809?e=1768435200&v=beta&t=NkQkjBNbezS2IJ0j25atCxH9A3XTecNdkrfnNpk2mDI"
                  alt="Sudarshan Mestha"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center md:text-left flex-1" data-aos="fade-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Hi, I’m <span className="text-blue-400">Sudarshan Mestha</span>
              </h1>
              <p className="mt-2 text-xl text-zinc-300 flex items-center justify-center md:justify-start gap-2">
                <span>Data-Science Trainee</span>
                <span className="text-zinc-500">•</span>
                <span>Bangalore</span>
              </p>
              <p className="mt-4 text-lg text-zinc-400 max-w-2xl">
                Full-Stack Developer • AI & ML Enthusiast • Building real-world projects in Python, Django, Next.js, and Agentic AI.
              </p>

              {/* SOCIAL ICONS WITH CUSTOM SVG */}
              <div className="mt-6 flex gap-5 justify-center md:justify-start">
                {/* GitHub Icon */}
                <a
                  href="https://github.com/sudarshanmestha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <svg
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white group-hover:scale-110 transition-transform"
                  >
                    <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z" />
                  </svg>
                </a>
                

                {/* Docker Icon */}
                <a
                  href="https://hub.docker.com/u/sudarshan999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all duration-300"
                  aria-label="Docker Profile"
                >
                  <svg
                    height="22"
                    viewBox="0 0 24 24"
                    fill="#1D63ED"  // Docker blue
                    className="group-hover:scale-110 transition-transform"
                  >
                    <path d="M21.8 10.1c-.4-.3-1.3-.4-2-.2-.1-.5-.5-1.1-1-1.5l-.3-.2-.2.3c-.3.6-.4 1.3-.3 2-.6.1-1.2.4-1.6.8-.6.6-.9 1.5-.8 2.4.1.7.4 1.4.9 1.9.5.5 1.2.9 2 .9 1.6 0 2.9-1.3 2.9-2.9-.1-1.1-.6-2.1-1.6-2.5zM3 15.4h18c-.1 1.9-1.6 3.5-3.5 3.5H6.4C4.4 18.9 3 17.3 3 15.4zm3.2-6.9H9v2.8H6.2V8.5zm3.9 0h2.8v2.8H10V8.5zm3.9 0h2.8v2.8h-2.8V8.5zM6.2 11.9H9v2.8H6.2v-2.8zm3.9 0h2.8v2.8H10v-2.8zm3.9 0h2.8v2.8h-2.8v-2.8z"/>
                  </svg>
                </a>



                {/* LinkedIn Icon */}
                <a
                  href="https://www.linkedin.com/in/sudarshan-mestha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </a>

                {/* project section */}
                <BaseUrl
                  path="/Ai-Tools"
                  className="group flex items-center justify-center w-24 h-12 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all duration-300"
                >
                  <h4><strong>Projects</strong></h4>
                </BaseUrl>

                {/* Documentary section */}
                
                <BaseUrl
                  path="/more"
                  className="group flex items-center justify-center w-40 h-12 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all duration-300"
                >
                  <h4><strong>Documentray</strong></h4>
                </BaseUrl>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 2. HERO WITH VIDEO THUMBNAIL */}
        {/* ============================================= */}
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
          <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            data-aos="fade-up"
          >
            Educator in{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Data & Coding
            </span>
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-zinc-400 font-light max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Specializing in Machine Learning, Deep Learning, Natural Language Processing,
            Time Series Analysis, Bayesian Statistics, Computational Quantum Physics,
            Finance, and more.
          </p>


            {/* Video Thumbnail */}
            <div className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 cursor-pointer"
                 data-aos="fade-up" data-aos-delay="400"
                 onClick={openPlayer}>
              {showPlayer ? (
                <iframe
                  src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&quality=1080p`}
                  className="w-full aspect-video"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="JustPython Intro"
                />
              ) : (
                <div className="relative aspect-video bg-zinc-900">
                  {thumbUrl ? (
                    <img src={thumbUrl} alt="Video thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-6xl text-zinc-700">Play</div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition">
                    <button className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 hover:bg-white transition shadow-xl">
                      <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-12" data-aos="fade-up" data-aos-delay="600">
              <button
                onClick={() => window.open('https://forms.gle/4K42hcZPtomfHYUZ9', '_blank')}
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-200 transition-all duration-300 shadow-xl">
                Get Started Now
                <span className="group-hover:translate-x-1 transition-transform">Right Arrow</span>
              </button>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg"
                 className="w-full h-32 text-zinc-900" preserveAspectRatio="none">
              <path d="M0,0 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="currentColor" />
            </svg>
          </div>
        </section>

        {/* ============================================= */}
        {/* 3. GITHUB NEXT CONTENT */}
        {/* ============================================= */}
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h1 className="text-5xl md:text-6xl font-bold">GitHub Next</h1>
              <p className="mt-4 text-xl text-zinc-400 max-w-3xl mx-auto">
                GitHub Next investigates the future of software development.
              </p>
            </div>

            <div className="prose prose-invert max-w-4xl mx-auto text-center mb-20" data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg leading-relaxed">
                We are a team of researchers and engineers at GitHub, exploring things beyond the adjacent possible. 
                We prototype tools and technologies that will change our craft. We identify new approaches to 
                building healthy, productive software engineering teams.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-20 text-lg" data-aos="fade-up" data-aos-delay="200">
              {['Projects', 'Team', 'Events'].map((item) => (
                <a key={item} href="#" className="text-zinc-400 hover:text-white transition">
                  {item}
                </a>
              ))}
            </div>

            <div data-aos="fade-up" data-aos-delay="300">
              <h2 className="text-3xl font-bold mb-8">Active research areas</h2>
              <div className="flex flex-wrap gap-3 mb-12">
                {['All Categories', 'AI for Code', 'Data Visualization', 'AI', 'Visual Studio Code Extension'].map((cat) => (
                  <span key={cat} className="px-4 py-2 bg-zinc-800 rounded-full text-sm text-zinc-300 hover:bg-zinc-700 transition cursor-pointer">
                    {cat}
                  </span>
                ))}
              </div>

              <div className="bg-black/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 hover:border-zinc-600 transition">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-24 h-24 rounded-xl flex items-center justify-center text-4xl">
                    Agent
                  </div>
                  <a href="https://app.readytensor.ai/users/sudarshan15399">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">Agentic Workflows</h3>
                    <p className="text-sm text-zinc-500 mt-1">August 15, 2025 • Research prototype</p>
                    <p className="mt-3 text-zinc-300">
                      Towards Natural-Language Programming for GitHub Actions
                    </p>
                  </div> </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 4. FEATURES */}
        {/* ============================================= */}
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" data-aos="fade-up">
              Why Learn With Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'Rocket', title: 'Project-Driven Learning', desc: 'From Hello World to production-grade AI agents.' },
                { icon: 'Refresh', title: 'Free Revisions & Updates', desc: 'Content evolves with the industry — always current.' },
                { icon: 'Check', title: 'Trusted & Verified', desc: 'Used by thousands of learners worldwide.' },
              ].map((f, i) => (
                <div key={i}
                     className="group p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1"
                     data-aos="fade-up" data-aos-delay={`${i * 150}`}>
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-zinc-500 text-sm border-t border-zinc-800">
          <p>© 2025 JustPython. Built for the future of learning.</p>
        </footer>
      </div>
    </>
  )
}