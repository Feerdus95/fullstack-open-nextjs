import Link from "next/link"
import { getUsers } from "@/app/lib/users"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Users</h1>
        <p className="text-neutral-400 mt-1">{users.length} registered users</p>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500 text-lg">No users yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-surface border border-border rounded-xl p-4 hover:border-emerald-500/30 hover:bg-surface-2 transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-bold shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <Link
                  href={`/users/${user.username}`}
                  className="text-neutral-100 hover:text-emerald-400 font-medium transition-colors no-underline"
                >
                  {user.name}
                </Link>
                <p className="text-sm text-neutral-500">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
