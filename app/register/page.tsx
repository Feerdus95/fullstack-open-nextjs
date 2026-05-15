"use client"

import { useActionState } from "react"
import { registerUser } from "@/app/actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { error: "", values: { username: "", name: "" } })

  return (
    <div className="max-w-sm mx-auto px-4 py-16 sm:py-24">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Register</h2>

      {state.error && (
        <div className="text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg text-sm mb-6">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
            Username
          </label>
          <input
            type="text"
            name="username"
            defaultValue={state.values?.username}
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-neutral-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={state.values?.name}
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-neutral-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-neutral-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirm"
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-neutral-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  )
}
