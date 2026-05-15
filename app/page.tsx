import { getBlogs } from "@/app/lib/blogs"
import { getUsers } from "@/app/lib/users"
import Link from "next/link"

export default async function Home() {
  const blogs = await getBlogs()
  const users = await getUsers()
  const totalLikes = blogs.reduce((sum, b) => sum + b.likes, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            NextNotes
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-neutral-400 mb-10">
          A minimal blog reader built with Next.js and Turbopack. Discover, read, and curate your favorite posts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blogs"
            className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-colors text-center"
          >
            Browse blogs
          </Link>
          <Link
            href="/blogs/new"
            className="w-full sm:w-auto px-6 py-3 border border-border hover:border-emerald-500/50 text-neutral-300 hover:text-emerald-400 font-semibold rounded-xl transition-colors text-center"
          >
            Add a blog
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-1">{blogs.length}</div>
          <div className="text-sm text-neutral-500">Blogs</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-1">{users.length}</div>
          <div className="text-sm text-neutral-500">Users</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-1">{totalLikes.toLocaleString()}</div>
          <div className="text-sm text-neutral-500">Likes</div>
        </div>
      </div>
    </div>
  )
}
