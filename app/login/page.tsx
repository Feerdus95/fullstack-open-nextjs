"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="page" style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "4rem" }}>
      <h2 className="page__title">Login</h2>
      {error && <div className="error-message" style={{ marginBottom: "1.5rem" }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Username
          </label>
          <input type="text" name="username" required className="form-input" style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Password
          </label>
          <input type="password" name="password" required className="form-input" style={{ width: "100%" }} />
        </div>
        <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>
          Login
        </button>
      </form>
    </div>
  )
}
