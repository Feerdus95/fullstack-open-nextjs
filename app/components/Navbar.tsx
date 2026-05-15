"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="navbar">
      <Link href="/" className="navbar__brand">
        NextNotes
      </Link>
      <ul className="navbar__links">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`navbar__link${pathname === href ? " navbar__link--active" : ""}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
