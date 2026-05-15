"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, incrementBlogLikes } from "@/app/lib/blogs"
import { auth } from "@/auth"

const MIN_LENGTHS = {
  title: 5,
  author: 5,
  url: 5,
}

export async function createBlog(
  prevState: any,
  formData: FormData
) {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string)?.trim() || ""
  const author = (formData.get("author") as string)?.trim() || ""
  const url = (formData.get("url") as string)?.trim() || ""

  const values = { title, author, url }

  const errors: string[] = []

  if (title.length < MIN_LENGTHS.title) {
    errors.push(`Title must be at least ${MIN_LENGTHS.title} characters long`)
  }
  
  if (author.length < MIN_LENGTHS.author) {
    errors.push(`Author must be at least ${MIN_LENGTHS.author} characters long`)
  }

  if (url.length < MIN_LENGTHS.url) {
    errors.push(`URL must be at least ${MIN_LENGTHS.url} characters long`)
  }

  if (errors.length > 0) {
    return { error: errors.join(". "), values, success: false }
  }

  await addBlog({ title, author, url })

  revalidatePath("/blogs")
  return { error: "", success: true }
}

export async function likeBlog(formData: FormData) {
  const idStr = formData.get("id")
  if (!idStr) return

  const id = Number(idStr)
  if (isNaN(id)) return

  await incrementBlogLikes(id)
  
  // Revalidate the individual blog page and the list
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
