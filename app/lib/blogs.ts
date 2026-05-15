import { eq, ilike } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"

export interface Blog {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

export const getBlogs = async (filter?: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`),
    })
  }
  return db.query.blogs.findMany()
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addBlog = async (blog: Omit<Blog, "id" | "likes">) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const result = await db.insert(blogs).values({
    ...blog,
    userId: user.id
  }).returning()
  return result[0]
}

export const incrementBlogLikes = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    const result = await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
      .returning()
    return result[0]
  }
  return undefined
}
