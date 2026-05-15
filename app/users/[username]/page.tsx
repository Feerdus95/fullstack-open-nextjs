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

  if (!user) {
    notFound()
  }

  return (
    <div className="page">
      <Link href="/users" className="back-link" style={{ marginBottom: "2rem" }}>
        ← Back to users
      </Link>
      
      <div className="page__header" style={{ marginTop: "1.5rem" }}>
        <div>
          <h1 className="page__title">{user.name}</h1>
          <p className="page__subtitle">
            Username: @{user.username}
          </p>
        </div>
      </div>
      
      <div style={{ marginTop: "2rem" }}>
        <h3>Added blogs</h3>
        {user.blogs && user.blogs.length > 0 ? (
          <ul className="blog-list" style={{ marginTop: "1rem" }}>
            {user.blogs.map((blog) => (
              <li key={blog.id} className="blog-card" style={{ padding: "1rem" }}>
                <Link href={`/blogs/${blog.id}`} style={{ fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>This user hasn't added any blogs yet.</p>
        )}
      </div>
    </div>
  )
}
