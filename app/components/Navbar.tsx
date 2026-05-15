"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="navbar">
      <Link href="/" className="navbar__brand">
        NextNotes
      </Link>
      <ul className="navbar__links" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <li>
          <Link href="/" className={`navbar__link${pathname === "/" ? " navbar__link--active" : ""}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/blogs" className={`navbar__link${pathname.startsWith("/blogs") ? " navbar__link--active" : ""}`}>
            Blogs
          </Link>
        </li>
        <li>
          <Link href="/users" className={`navbar__link${pathname.startsWith("/users") ? " navbar__link--active" : ""}`}>
            Users
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href="/blogs/new" className={`navbar__link${pathname === "/blogs/new" ? " navbar__link--active" : ""}`}>
                Create new
              </Link>
            </li>
            <li style={{ marginLeft: "1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              <em>{session.user?.name} logged in</em>
            </li>
            <li>
              <button onClick={() => signOut()} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", textDecoration: "underline", padding: 0 }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className={`navbar__link${pathname === "/login" ? " navbar__link--active" : ""}`}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className={`navbar__link${pathname === "/register" ? " navbar__link--active" : ""}`}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
