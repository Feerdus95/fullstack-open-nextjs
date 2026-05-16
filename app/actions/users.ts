"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { updateUserToken } from "@/app/lib/users"

const MIN_LENGTHS = {
  username: 4,
  password: 4,
}

type RegisterState = {
  error: string
  fieldErrors?: {
    username?: string
    passwordConfirm?: string
  }
  values?: { username: string; name: string }
}

export const registerUser = async (prevState: RegisterState, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim() || ""
  const name = (formData.get("name") as string)?.trim() || ""
  const password = formData.get("password") as string || ""
  const passwordConfirm = formData.get("passwordConfirm") as string || ""

  const values = { username, name }
  const errors: string[] = []
  const fieldErrors: RegisterState["fieldErrors"] = {}

  if (username.length < MIN_LENGTHS.username) {
    const msg = `Username must be at least ${MIN_LENGTHS.username} characters long`
    errors.push(msg)
    fieldErrors.username = msg
  }

  if (password.length < MIN_LENGTHS.password) {
    errors.push(`Password must be at least ${MIN_LENGTHS.password} characters long`)
  }

  if (password !== passwordConfirm) {
    const msg = "Passwords do not match"
    errors.push(msg)
    fieldErrors.passwordConfirm = msg
  }

  if (errors.length > 0) {
    return { error: errors.join(". "), fieldErrors, values }
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

export const generateToken = async () => {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error("Not authenticated")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })
  if (!user) {
    throw new Error("User not found")
  }

  const token = crypto.randomUUID()
  await updateUserToken(user.id, token)
  return { token }
}
