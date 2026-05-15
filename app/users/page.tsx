import Link from "next/link"
import { getUsers } from "@/app/lib/users"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Users</h1>
          <p className="page__subtitle">
            {users.length} registered users
          </p>
        </div>
      </div>

      <ul className="blog-list" style={{ marginTop: "2rem" }}>
        {users.map((user) => (
          <li key={user.id} className="blog-card" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <h2 className="blog-card__title" style={{ margin: 0 }}>
              <Link href={`/users/${user.username}`}>
                {user.name}
              </Link>
            </h2>
            <span style={{ color: "var(--text-muted)" }}>@{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
