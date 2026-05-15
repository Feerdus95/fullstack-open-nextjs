import type { Metadata } from "next"
import Link from "next/link"
import { createBlog } from "@/app/actions/blogs"

export const metadata: Metadata = {
  title: "New Blog | NextNotes",
  description: "Add a new blog post to the list.",
}

import { auth } from "@/auth"
import { redirect } from "next/navigation"

import NewBlogForm from "@/app/components/NewBlogForm"

export default async function NewBlogPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

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

      <NewBlogForm />
    </div>
  )
}
