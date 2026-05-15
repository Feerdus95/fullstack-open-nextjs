import type { Metadata } from "next"
import Link from "next/link"
import { createBlog } from "@/app/actions/blogs"

export const metadata: Metadata = {
  title: "New Blog | NextNotes",
  description: "Add a new blog post to the list.",
}

export default function NewBlogPage() {
  return (
    <div className="page">
      <Link href="/blogs" className="back-link" id="back-to-blogs">
        ← Back to blogs
      </Link>
      <h1 className="page__title" style={{ marginTop: "1rem" }}>
        Add a blog
      </h1>
      <p className="page__subtitle">
        Fill in the details below to add a new blog to the list.
      </p>

      <form action={createBlog} className="blog-form" id="new-blog-form">
        <div className="form-field">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g. Why I love Next.js"
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            placeholder="e.g. Jane Doe"
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            placeholder="https://example.com/my-post"
            className="form-input"
          />
        </div>

        <button type="submit" className="btn-primary" id="submit-blog">
          Add blog
        </button>
      </form>
    </div>
  )
}
