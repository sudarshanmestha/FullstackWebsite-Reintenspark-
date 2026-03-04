// app/more/page.tsx
import Link from 'next/link'
import Image from 'next/image'

type Post = {
  id: number
  title: string
  slug: string
  image_url: string | null
  date: string
}

// THIS IS THE MISSING FUNCTION!
async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/DocPost/doc/`, {
    cache: 'no-store',
  })
  if (!res.ok) return [] // fallback
  return res.json()
}

export default async function MorePage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />

        <div className="max-w-5xl mx-auto px-6 py-16">
          {/* HERO */}
          <div className="relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Project
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Documentary
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
              In-depth explorations of Projects, AI tools and agentic systems.
            </p>
          </div>

          {/* WAVE */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-32 text-zinc-900"
              preserveAspectRatio="none"
            >
              <path d="M0,0 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="currentColor" />
            </svg>
          </div>

          {/* POST GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/more/${post.slug}`}
                className="group block bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500 transition"
              >
                <div className="relative h-48">
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                      priority
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-full h-full" />
                  )}
                </div>

                <div className="p-6">
                  <time className="text-sm text-zinc-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <h3 className="mt-3 text-2xl font-bold text-white group-hover:text-blue-400 transition">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}