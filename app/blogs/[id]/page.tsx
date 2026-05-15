import { getBlogById } from "@/app/lib/blogs"
import { likeBlog } from "@/app/actions/blogs"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    return {
      title: "Blog Not Found",
    }
  }

  return {
    title: `${blog.title} | NextNotes`,
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="page">
      <Link href="/blogs" className="back-link" style={{ marginBottom: "2rem" }}>
        ← Back to blogs
      </Link>
      
      <article className="blog-card" style={{ marginTop: "1.5rem" }}>
        <h1 className="blog-card__title" style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.title}
          </a>
        </h1>
        
        <div className="blog-card__meta" style={{ fontSize: "1rem", marginTop: "1.5rem" }}>
          <span>Written by <strong>{blog.author}</strong></span>
          
          <form action={likeBlog} style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit" className="btn-primary" style={{ padding: "0.25rem 0.75rem", fontSize: "0.85rem", background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)" }}>
              Like ♥
            </button>
            <span className="blog-card__likes" style={{ marginLeft: "0.5rem" }}>
              {blog.likes.toLocaleString()} likes
            </span>
          </form>
        </div>
        
        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
          <p style={{ marginBottom: "1rem", color: "var(--text-muted)" }}>
            URL: <a href={blog.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>{blog.url}</a>
          </p>
        </div>
      </article>
    </div>
  )
}
