import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogsByUsername } from "@/app/lib/users"

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = await getUserWithBlogsByUsername(username)
  if (!user) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link
        href="/users"
        className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-emerald-400 transition-colors text-sm mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to users
      </Link>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-neutral-500">@{user.username}</p>
        </div>
      </div>

      <div className="border-t border-border pt-8">
        <h2 className="text-lg font-semibold mb-4">
          Added blogs {user.blogs ? `(${user.blogs.length})` : ""}
        </h2>
        {user.blogs && user.blogs.length > 0 ? (
          <div className="space-y-3">
            {user.blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-surface border border-border rounded-xl p-4 hover:border-emerald-500/30 hover:bg-surface-2 transition-all"
              >
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-neutral-100 hover:text-emerald-400 font-medium transition-colors no-underline"
                >
                  {blog.title}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">This user hasn&apos;t added any blogs yet.</p>
        )}
      </div>
    </div>
  )
}
