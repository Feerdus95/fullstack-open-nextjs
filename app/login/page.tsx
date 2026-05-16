"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "@/app/components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const { showNotification } = useNotification()

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
      showNotification("Logged in successfully!", "success")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16 sm:py-24">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Login</h2>

      {error && (
        <div data-testid="error-message" className="text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="username" className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <button
          type="submit"
          data-testid="login-button"
          className="cursor-pointer w-full px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  )
}
