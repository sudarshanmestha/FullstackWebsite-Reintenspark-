'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function BlogPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //axios.get('http://127.0.0.1:8001/api/posts/')
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

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
      {posts
        .sort((a, b) => b.year - a.year) // since year is an integer
        .map((post) => (
<Link
  key={post.id}
  href={post.link || "#"}
  className="group relative overflow-hidden block p-6 rounded-2xl 
             bg-gray-100 dark:bg-zinc-900 border border-transparent
             shadow-sm transition duration-300 ease-in-out
             hover:bg-gray-200 dark:hover:bg-zinc-800 hover:shadow-md"
>
  {/* Shine effect layer */}
  <div className="absolute top-0 -inset-full h-full w-1/2 z-10 
                  transform -skew-x-12 bg-gradient-to-r 
                  from-transparent to-white opacity-40 
                  group-hover:animate-shine" />
            <div className="relative z-20 flex flex-col md:flex-row items-center gap-6">
              {/* LEFT SIDE: text */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                {post.subtitle && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mt-1">
                    {post.subtitle} · {post.year}
                  </p>
                )}
                <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
                  {post.description}
                </p>

                {/* Button like in screenshot */}
                <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full 
                                   bg-neutral-200 hover:bg-neutral-300 
                                   text-sm font-medium transition">
                  See the Live →
                </button>
              </div>

              {/* RIGHT SIDE: image */}
              {post.image && (
                <div className="flex-shrink-0 mt-6 md:mt-0 md:w-60 md:h-40 relative 
                                transform rotate-[-6deg] hover:rotate-[-3deg] 
                                transition-transform duration-500">
                  <img
                    className="w-full h-full object-cover"
                    src={post.image}
                    alt={post.title}
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
    </div>
  )
}
