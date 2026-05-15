"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, incrementBlogLikes } from "@/app/lib/blogs"
import { auth } from "@/auth"

export async function createBlog(formData: FormData) {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string).trim()
  const author = (formData.get("author") as string).trim()
  const url = (formData.get("url") as string).trim()

  if (!title || !author || !url) return

  await addBlog({ title, author, url })

  revalidatePath("/blogs")
  redirect("/blogs")
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
