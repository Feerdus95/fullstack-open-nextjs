"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  const linkActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const linkClass = (href: string) => {
    const base = "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
    if (linkActive(href)) {
      return `${base} text-emerald-400 bg-emerald-500/10`
    }
    return `${base} text-neutral-400 hover:text-neutral-100 hover:bg-surface-2`
  }

  const links = [
    { href: "/", label: "Home", ariaLabel: "home" },
    { href: "/blogs", label: "Blogs", ariaLabel: "blogs" },
    { href: "/users", label: "Users", ariaLabel: "users" },
    ...(session ? [{ href: "/blogs/new", label: "Create new", ariaLabel: "create new" }, { href: "/me", label: "My page", ariaLabel: "me" }] : []),
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-surface/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-emerald-500 tracking-tight">
            NextNotes
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} aria-label={link.ariaLabel} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
            {session ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
                <span className="text-sm text-neutral-500">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="cursor-pointer px-3 py-1.5 rounded-lg text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
                <Link href="/login" aria-label="login" className={linkClass("/login")}>
                  Login
                </Link>
                <Link
                  href="/register"
                  aria-label="register"
                  className="px-3 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
              {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.ariaLabel}
                onClick={() => setMenuOpen(false)}
                className={linkClass(link.href) + " block"}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border my-2" />
            {session ? (
              <div className="px-3 py-2 space-y-2">
                <span className="block text-sm text-neutral-500">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="cursor-pointer w-full text-left px-3 py-1.5 rounded-lg text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Link
                  href="/login"
                  aria-label="login"
                  onClick={() => setMenuOpen(false)}
                  className="block cursor-pointer px-3 py-1.5 rounded-lg text-sm text-neutral-400 hover:text-neutral-100 hover:bg-surface-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  aria-label="register"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-3 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
