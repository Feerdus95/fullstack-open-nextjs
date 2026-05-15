"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, incrementBlogLikes } from "@/app/lib/blogs"
import { addToReadingList, markEntryAsRead } from "@/app/lib/readingList"
import { auth } from "@/auth"
import { getCurrentUser } from "@/app/services/session"

const MIN_LENGTHS = {
  title: 5,
  author: 5,
  url: 5,
}

type BlogState = {
  error: string
  success: boolean
  values?: { title: string; author: string; url: string }
}

export async function createBlog(
  prevState: BlogState,
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

export async function addBlogToReadingList(formData: FormData) {
  const blogIdStr = formData.get("blogId")
  if (!blogIdStr) return

  const user = await getCurrentUser()
  if (!user) return

  const blogId = Number(blogIdStr)
  if (isNaN(blogId)) return

  await addToReadingList(user.id, blogId)
  revalidatePath(`/blogs/${blogId}`)
}

export async function markAsRead(formData: FormData) {
  const entryIdStr = formData.get("entryId")
  if (!entryIdStr) return

  const entryId = Number(entryIdStr)
  if (isNaN(entryId)) return

  await markEntryAsRead(entryId)
  revalidatePath("/me")
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
