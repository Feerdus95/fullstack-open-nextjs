"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

const MIN_LENGTHS = {
  username: 4,
  password: 4,
}

type RegisterState = {
  error: string
  values?: { username: string; name: string }
}

export const registerUser = async (prevState: RegisterState, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim() || ""
  const name = (formData.get("name") as string)?.trim() || ""
  const password = formData.get("password") as string || ""
  const passwordConfirm = formData.get("passwordConfirm") as string || ""

  const values = { username, name }
  const errors: string[] = []

  if (username.length < MIN_LENGTHS.username) {
    errors.push(`Username must be at least ${MIN_LENGTHS.username} characters long`)
  }

  if (password.length < MIN_LENGTHS.password) {
    errors.push(`Password must be at least ${MIN_LENGTHS.password} characters long`)
  }

  if (password !== passwordConfirm) {
    errors.push("Passwords do not match")
  }

  if (errors.length > 0) {
    return { error: errors.join(". "), values }
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username)
  })

  if (existingUser) {
    return { error: "Username is already taken", values }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}
