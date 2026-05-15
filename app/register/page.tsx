import { registerUser } from "@/app/actions/users"

export default function RegisterPage() {
  return (
    <div className="page" style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "4rem" }}>
      <h2 className="page__title">Register</h2>
      
      <form action={registerUser} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Username
          </label>
          <input type="text" name="username" required className="form-input" style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Name
          </label>
          <input type="text" name="name" required className="form-input" style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Password
          </label>
          <input type="password" name="password" required className="form-input" style={{ width: "100%" }} />
        </div>
        <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>
          Register
        </button>
      </form>
    </div>
  )
}
