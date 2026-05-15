"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600"

  return (
    <div className={`px-4 py-2.5 mb-2.5 rounded text-white ${bgColor} fixed top-4 right-4 z-[100] shadow-lg animate-in fade-in slide-in-from-top-4`}>
      {message}
    </div>
  )
}
