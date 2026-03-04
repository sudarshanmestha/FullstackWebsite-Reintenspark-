// app/more/[slug]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Post = {
  title: string
  image_url: string | null
  description: string
  html_content: string
  date: string
}

// THIS IS THE MISSING FUNCTION!
async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/DocPost/doc/${slug}/`, {
    cache: 'no-store',
  })
  if (!res.ok) notFound()
  return res.json()
}

export default async function PostDetail({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <article className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{post.title}</h1>
          <time className="text-zinc-400 text-lg">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </header>

        {post.image_url && (
          <div className="relative h-96 mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <p className="text-xl text-zinc-300 leading-relaxed mb-12 max-w-3xl mx-auto">
          {post.description}
        </p>

        <div
  className="dark:invert dark:hue-rotate-180"
>
          <div dangerouslySetInnerHTML={{ __html: post.html_content }} />
        </div>
      </div>
    </article>
  )
}