import type { Metadata } from "next"
import Link from "next/link"
import NewBlogForm from "@/app/components/NewBlogForm"

export const metadata: Metadata = {
  title: "New Blog | NextNotes",
  description: "Add a new blog post to the list.",
}

export default async function NewBlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-emerald-400 transition-colors text-sm mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to blogs
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Add a blog</h1>
      <p className="text-neutral-400 mb-10">Fill in the details below to add a new blog to the list.</p>

      <NewBlogForm />
    </div>
  )
}
