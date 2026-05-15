import { getBlogById } from "@/app/lib/blogs"
import { likeBlog, addBlogToReadingList } from "@/app/actions/blogs"
import { isInReadingList } from "@/app/lib/readingList"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getCurrentUser } from "@/app/services/session"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  if (!blog) return { title: "Blog Not Found" }
  return { title: `${blog.title} | NextNotes` }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  if (!blog) notFound()

  const user = await getCurrentUser()
  const isOwner = user && blog.userId === user.id
  const alreadyInList = user ? await isInReadingList(user.id, blog.id) : false
  const showAddToReadingList = user && !isOwner && !alreadyInList

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-emerald-400 transition-colors text-sm mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to blogs
      </Link>

      <article>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 leading-tight">
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-100 hover:text-emerald-400 transition-colors no-underline"
          >
            {blog.title}
            <svg
              className="inline-block w-5 h-5 ml-2 -mt-0.5 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm mb-10 pb-8 border-b border-border">
          <span className="text-neutral-400">
            Written by <strong className="text-neutral-200">{blog.author}</strong>
          </span>

          <form action={likeBlog} className="flex items-center gap-2">
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-neutral-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all text-sm"
            >
              &#9829; {blog.likes.toLocaleString()}
            </button>
          </form>

          {showAddToReadingList && (
            <form action={addBlogToReadingList}>
              <input type="hidden" name="blogId" value={blog.id} />
              <button
                type="submit"
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 border border-emerald-500/30 bg-emerald-500/10 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add to reading list
              </button>
            </form>
          )}

          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 bg-surface-2 border border-border rounded-full text-xs text-neutral-400 hover:text-emerald-400 transition-colors no-underline"
          >
            {new URL(blog.url).hostname}
          </a>
        </div>

        <p className="text-neutral-400 text-sm">
          Visit the original article at{' '}
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
          >
            {blog.url}
          </a>
        </p>
      </article>
    </div>
  )
}
