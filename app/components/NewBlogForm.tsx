"use client"

import { useActionState } from "react"
import { createBlog } from "@/app/actions/blogs"

export default function NewBlogForm() {
  const [state, formAction] = useActionState(createBlog, { error: "", values: { title: "", author: "", url: "" } })

  return (
    <form action={formAction} className="blog-form" id="new-blog-form">
      <div className="form-field">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Why I love Next.js"
          className="form-input"
          defaultValue={state.values?.title}
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
          placeholder="e.g. Jane Doe"
          className="form-input"
          defaultValue={state.values?.author}
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
          placeholder="https://example.com/my-post"
          className="form-input"
          defaultValue={state.values?.url}
        />
      </div>

      <button type="submit" className="btn-primary" id="submit-blog">
        Add blog
      </button>

      {state.error && (
        <div className="error-message">{state.error}</div>
      )}
    </form>
  )
}
