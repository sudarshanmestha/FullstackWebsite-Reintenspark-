// app/components/posts.tsx (or MorePost.tsx)
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function BlogPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://justpythonindia.pythonanywhere.com/api/posts/')
      .then(res => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching posts:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-20 text-zinc-400">Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
      {posts
        .sort((a, b) => new Date(b.year || b.publishedAt).getTime() - new Date(a.year || a.publishedAt).getTime())
        .map((post, index) => (
          <Link
            key={post.id || post.slug}
            href={post.link || post.url || '#'}
            className="group relative block overflow-hidden rounded-3xl shadow-2xl
                       bg-gradient-to-br from-slate-900/50 to-slate-800/50 
                       border border-slate-700/50 backdrop-blur-sm
                       hover:border-blue-500/50 hover:shadow-blue-500/25
                       transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
          >
            {/* Image - Full top section */}
            <div className="relative h-64 lg:h-72 overflow-hidden">
              <Image
                src={post.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative p-8 pb-12">
              {/* Date & Author - Bottom left */}
              <div className="absolute bottom-4 left-8 flex items-center gap-3 opacity-90 group-hover:opacity-100">
                <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-white/30">
                  <img
                    src={post.authorImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                    alt={post.author || 'Author'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{post.author || 'Admin'}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(post.year || post.publishedAt || '2025-03-01').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Title - Center */}
              <div className="text-center mt-4 mb-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight 
                              group-hover:text-blue-400 transition-colors duration-300
                              line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}