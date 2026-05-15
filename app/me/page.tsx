import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/app/services/session"
import { generateToken } from "@/app/actions/users"
import { getReadingListForUser } from "@/app/lib/readingList"

export default async function MePage() {
  const session = await auth()
  if (!session) redirect("/login")

  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const readingList = await getReadingListForUser(user.id)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-bold shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-neutral-400">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Reading List</h2>

        {readingList.length === 0 ? (
          <p className="text-neutral-500 text-sm">Your reading list is empty.</p>
        ) : (
          <div className="space-y-3">
            {readingList.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 bg-surface-2 border border-border rounded-lg p-3"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <Link
                  href={`/blogs/${entry.blog.id}`}
                  className="text-neutral-100 hover:text-emerald-400 transition-colors no-underline text-sm font-medium"
                >
                  {entry.blog.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">API Token</h2>

        {user.token ? (
          <div className="bg-neutral-950 border border-border rounded-lg px-4 py-3 font-mono text-sm text-emerald-400 break-all select-all">
            {user.token}
          </div>
        ) : (
          <p className="text-neutral-500 text-sm">No API token generated yet.</p>
        )}

        <form action={generateToken} className="mt-4">
          <button
            type="submit"
            className="cursor-pointer px-4 py-2 border border-border hover:border-emerald-500/50 text-neutral-300 hover:text-emerald-400 font-semibold rounded-lg transition-colors text-sm"
          >
            {user.token ? "Regenerate token" : "Generate token"}
          </button>
        </form>
      </div>
    </div>
  )
}
