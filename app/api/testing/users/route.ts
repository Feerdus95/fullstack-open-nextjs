import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import bcrypt from "bcryptjs"

export const POST = async (req: Request) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const body = await req.json()
  const { username, name, password } = body

  if (!username || !name || !password) {
    return NextResponse.json(
      { error: "Missing required fields: username, name, password" },
      { status: 400 },
    )
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const result = await db.insert(users).values({ username, name, passwordHash }).returning()

  return NextResponse.json({ id: result[0].id, username: result[0].username, name: result[0].name }, { status: 201 })
}
