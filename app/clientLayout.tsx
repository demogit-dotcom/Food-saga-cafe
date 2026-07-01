"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import SplashScreen from "@/components/splash-screen"

interface ClientLayoutProps {
  children: React.ReactNode
  fontVariable: string
}

export default function ClientLayout({ children, fontVariable }: ClientLayoutProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user has visited before (optional - remove if you want splash on every visit)
    const hasVisited = sessionStorage.getItem("amai-visited")

    if (hasVisited) {
      setShowSplash(false)
      setIsLoaded(true)
    } else {
      // Mark as visited for this session
      sessionStorage.setItem("amai-visited", "true")
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)
  }

  return (
    <html lang="en" className={fontVariable}>
      <head>
        <title>Food Saga - Old House Cafe</title>
        <meta name="description" content="Where Minimalism Meets Indulgence" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <link rel="icon" href="/old-house-cafe-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/old-house-cafe-logo.png" />
      </head>
      <body className="font-sans antialiased">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

        <div className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  )
}
