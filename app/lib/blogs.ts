import fs from "fs"
import path from "path"

export interface Blog {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

// Resolve relative to the project root, not to .next/server
const DATA_FILE = path.join(process.cwd(), "app", "data", "blogs.json")

export function getBlogs(): Blog[] {
  const raw = fs.readFileSync(DATA_FILE, "utf-8")
  return JSON.parse(raw) as Blog[]
}

export function addBlog(blog: Omit<Blog, "id" | "likes">): Blog {
  const blogs = getBlogs()
  const newBlog: Blog = {
    id: Date.now(),
    likes: 0,
    ...blog,
  }
  blogs.push(newBlog)
  fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2), "utf-8")
  return newBlog
}

export function getBlogById(id: number): Blog | undefined {
  const blogs = getBlogs()
  return blogs.find((blog) => blog.id === id)
}

export function incrementBlogLikes(id: number): Blog | undefined {
  const blogs = getBlogs()
  const blogIndex = blogs.findIndex((blog) => blog.id === id)
  
  if (blogIndex === -1) return undefined
  
  blogs[blogIndex].likes += 1
  fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2), "utf-8")
  
  return blogs[blogIndex]
}
