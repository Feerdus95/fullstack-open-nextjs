import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Notes App",
  description: "A simple notes app built with Next.js",
}

import AuthSessionProvider from "./components/SessionProvider"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-neutral-950 text-neutral-100 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent scrollbar-gutter-stable antialiased min-h-screen">
        <AuthSessionProvider>
          <NotificationProvider>
            <Navbar />
            <Notification />
            <main>{children}</main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
