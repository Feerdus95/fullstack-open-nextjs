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
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Blogs</h1>
          <p className="page__subtitle">
            {blogs.length} posts · sorted by likes
          </p>
        </div>
        <Link href="/blogs/new" className="btn-primary" id="add-blog-link">
          + New blog
        </Link>
      </div>

      <form action="/blogs" method="GET" style={{ marginBottom: "2rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          name="filter"
          defaultValue={filter || ""}
          placeholder="Search by title..."
          className="form-input"
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      <ul className="blog-list">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id} className="blog-card">
              <h2 className="blog-card__title">
                <Link href={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </h2>
              <div className="blog-card__meta">
                <span>by {blog.author}</span>
                <span className="blog-card__likes">
                  ♥ {blog.likes.toLocaleString()}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
