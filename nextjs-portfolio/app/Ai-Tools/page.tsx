'use client'
import BlogPosts from 'app/components/posts'



export default function Page() {
  return (
    <section>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="w-16 h-16 mb-4 rounded-full bg-neutral-200 
                        flex items-center justify-center text-xl font-bold">
          SM.
        </div>
      {/* Intro Section */}
      <div className="text-center mb-16">
        
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hi, </span> I'm Sudarshan.</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          📍 Bangalore, India
        </p>
        <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
          I’m a Fullstack Developer specializing in building robust web applications
          and scalable backend systems. Currently, I work on projects involving
          Django, React, and AI/ML integrations to craft seamless digital experiences.
        </p>
      </div>

      {/* Work / Projects Section */}
      <BlogPosts />
      
    </div>
    </section>
  )
}


