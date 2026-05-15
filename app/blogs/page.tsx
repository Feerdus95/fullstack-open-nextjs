import type { Metadata } from "next"
import Link from "next/link"
import { getBlogs } from "@/app/lib/blogs"

export const metadata: Metadata = {
  title: "Blogs | NextNotes",
  description: "A curated list of blog posts.",
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Blogs</h1>
          <p className="text-neutral-400 mt-1">{blogs.length} posts &middot; sorted by likes</p>
        </div>
        <Link
          href="/blogs/new"
          className="self-start px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors text-sm text-center"
        >
          + New blog
        </Link>
      </div>

      <form action="/blogs" method="GET" className="mb-10">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            name="filter"
            defaultValue={filter || ""}
            placeholder="Search by title..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-neutral-100 placeholder-neutral-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
      </form>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500 text-lg mb-4">No blogs found</p>
          <Link href="/blogs/new" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Add the first blog &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <div
                key={blog.id}
                className="bg-surface border border-border rounded-xl p-5 hover:border-emerald-500/30 hover:bg-surface-2 transition-all"
              >
                <h2 className="text-lg font-semibold mb-1.5">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-neutral-100 hover:text-emerald-400 transition-colors no-underline"
                  >
                    {blog.title}
                  </Link>
                </h2>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <span>by {blog.author}</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    &#9829; {blog.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
