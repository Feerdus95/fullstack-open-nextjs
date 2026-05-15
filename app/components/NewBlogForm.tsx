"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "./NotificationContext"

export default function NewBlogForm() {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    success: false,
    values: { title: "", author: "", url: "" },
  })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!", "success")
      router.push("/blogs")
    }
  }, [state.success, showNotification, router])

  return (
    <form action={formAction} className="max-w-lg bg-surface border border-border rounded-xl p-6 sm:p-8 space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="title" className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Why I love Next.js"
          defaultValue={state.values?.title}
          className="w-full bg-neutral-950 border border-border rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="author" className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
          Author
        </label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="e.g. Jane Doe"
          defaultValue={state.values?.author}
          className="w-full bg-neutral-950 border border-border rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="url" className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
          URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com/my-post"
          defaultValue={state.values?.url}
          className="w-full bg-neutral-950 border border-border rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors"
      >
        Add blog
      </button>

      {state.error && (
        <div className="text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}
    </form>
  )
}
