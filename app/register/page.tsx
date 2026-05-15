"use client"

import { useActionState } from "react"
import { registerUser } from "@/app/actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { error: "", values: { username: "", name: "" } })

  return (
    <div className="page" style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "4rem" }}>
      <h2 className="page__title">Register</h2>
      {state.error && <div className="error-message" style={{ marginBottom: "1.5rem" }}>{state.error}</div>}
      
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Username
          </label>
          <input 
            type="text" 
            name="username" 
            className="form-input" 
            style={{ width: "100%" }} 
            defaultValue={state.values?.username}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Name
          </label>
          <input 
            type="text" 
            name="name" 
            className="form-input" 
            style={{ width: "100%" }} 
            defaultValue={state.values?.name}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Password
          </label>
          <input 
            type="password" 
            name="password" 
            className="form-input" 
            style={{ width: "100%" }} 
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Confirm Password
          </label>
          <input 
            type="password" 
            name="passwordConfirm" 
            className="form-input" 
            style={{ width: "100%" }} 
          />
        </div>
        <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>
          Register
        </button>
      </form>
    </div>
  )
}
