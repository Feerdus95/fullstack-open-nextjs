import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/app/services/session"
import { markAsRead } from "@/app/actions/blogs"
import { getReadingListForUser } from "@/app/lib/readingList"
import TokenSection from "./TokenSection"

export default async function MePage() {
  const session = await auth()
  if (!session) redirect("/login")

  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const allEntries = await getReadingListForUser(user.id)
  const unread = allEntries.filter((e) => !e.read)
  const read = allEntries.filter((e) => e.read)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div data-testid="user-profile" className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-bold shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold" data-testid="user-name">{user.name}</h1>
            <p className="text-neutral-400" data-testid="user-username">@{user.username}</p>
          </div>
        </div>
      </div>

      <div data-testid="reading-list-section" className="bg-surface border border-border rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Reading List</h2>

        {allEntries.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-neutral-500 text-sm">Your reading list is empty.</p>
        ) : (
          <div className="space-y-6">
            <div data-testid="unread-section">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Unread ({unread.length})
              </h3>
              {unread.length === 0 ? (
                <p data-testid="no-unread-blogs" className="text-neutral-600 text-sm">All caught up!</p>
              ) : (
                <div className="space-y-2">
                  {unread.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-3 bg-surface-2 border border-border rounded-lg p-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <Link
                        href={`/blogs/${entry.blog.id}`}
                        className="text-neutral-100 hover:text-emerald-400 transition-colors no-underline text-sm font-medium flex-1"
                      >
                        {entry.blog.title}
                      </Link>
                      <form action={markAsRead}>
                        <input type="hidden" name="entryId" value={entry.id} />
                        <button
                          type="submit"
                          data-testid={`mark-read-${entry.id}`}
                          className="cursor-pointer px-3 py-1 border border-border hover:border-emerald-500/50 text-neutral-400 hover:text-emerald-400 rounded-lg transition-all text-xs"
                        >
                          Mark as read
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Read ({read.length})
              </h3>
              {read.length === 0 ? (
                <p className="text-neutral-600 text-sm">No blogs marked as read yet.</p>
              ) : (
                <div className="space-y-2">
                  {read.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-3 bg-surface-2 border border-border rounded-lg p-3 opacity-60"
                    >
                      <div className="w-2 h-2 rounded-full bg-neutral-500 shrink-0" />
                      <Link
                        href={`/blogs/${entry.blog.id}`}
                        className="text-neutral-400 hover:text-emerald-400 transition-colors no-underline text-sm font-medium flex-1 line-through"
                      >
                        {entry.blog.title}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <TokenSection currentToken={user.token ?? null} />
    </div>
  )
}
