"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [animationPhase, setAnimationPhase] = useState<"enter" | "display" | "exit">("enter")

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase("display")
    }, 800)

    const timer2 = setTimeout(() => {
      setAnimationPhase("exit")
    }, 2500)

    const timer3 = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      {/* Background Animation */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          animationPhase === "enter"
            ? "bg-white"
            : animationPhase === "display"
              ? "bg-gradient-to-br from-gray-50 to-white"
              : "bg-white opacity-0"
        }`}
      />

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Main Logo */}
        <div
          className={`transition-all duration-1000 ease-out ${
            animationPhase === "enter"
              ? "opacity-0 scale-95 translate-y-8"
              : animationPhase === "display"
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-105 translate-y-[-8px]"
          }`}
        >
          <Image
            src="/old-house-cafe-logo.png"
            alt="Food Saga - Old House Cafe"
            width={400}
            height={400}
            className="w-80 md:w-96 h-auto"
            priority
          />
        </div>

        {/* Animated Underline */}
        <div
          className={`mt-8 h-px bg-black transition-all duration-1000 ease-out delay-300 ${
            animationPhase === "enter"
              ? "w-0 opacity-0"
              : animationPhase === "display"
                ? "w-32 opacity-100"
                : "w-0 opacity-0"
          }`}
        />

        {/* Tagline */}
        <div
          className={`mt-6 text-center transition-all duration-800 ease-out delay-500 ${
            animationPhase === "enter"
              ? "opacity-0 translate-y-4"
              : animationPhase === "display"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[-4px]"
          }`}
        >
          <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide">Food Saga - Old House Cafe</p>
        </div>

        {/* Loading Animation */}
        <div
          className={`mt-8 transition-all duration-500 ease-out delay-700 ${
            animationPhase === "enter" ? "opacity-0" : animationPhase === "display" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse animation-delay-0"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>

      {/* Subtle Particles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gray-300 rounded-full transition-all duration-2000 ease-out ${
              animationPhase === "display" ? "opacity-30" : "opacity-0"
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 300}ms`,
              animation: animationPhase === "display" ? "float 3s ease-in-out infinite" : "none",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animation-delay-0 {
          animation-delay: 0ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  )
}
