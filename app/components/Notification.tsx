"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()
  if (!message) return null

  return (
    <div
      data-testid="notification"
      className={`fixed top-4 right-4 z-[100] px-4 py-2.5 rounded-lg text-white text-sm font-medium shadow-lg backdrop-blur transition-all ${
        type === "success" ? "bg-emerald-500" : "bg-red-500/90"
      }`}
    >
      {message}
    </div>
  )
}
