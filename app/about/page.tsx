"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const [isPhilosophyVideoInView, setIsPhilosophyVideoInView] = useState(false)
  const [isPhilosophyVideoLoaded, setIsPhilosophyVideoLoaded] = useState(false)
  const [philosophyVideoError, setPhilosophyVideoError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)
  const philosophyVideoRef = useRef<HTMLVideoElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Detect mobile and screen dimensions
    const checkMobile = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setScreenSize({ width, height })
      setIsMobile(width < 768)
      setDevicePixelRatio(window.devicePixelRatio || 1)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("orientationchange", () => {
      setTimeout(checkMobile, 100) // Delay to get accurate dimensions after orientation change
    })

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => setVideoError(true)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("error", handleError)
    }
  }, [])

  // Enhanced Intersection Observer for Philosophy Video with mobile optimization
  useEffect(() => {
    // Only set up observer once per mount
    if (observerRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = philosophyVideoRef.current
          if (!video) return

          if (entry.isIntersecting) {
            setIsPhilosophyVideoInView(true)
            // Always attempt to play when in view - the video element will handle autoplay policies
            video.playbackRate = 1.0
            video.play().catch(() => {
              // Silently handle autoplay restrictions on mobile
            })
          } else {
            setIsPhilosophyVideoInView(false)
            video.pause()
          }
        })
      },
      {
        threshold: isMobile ? 0.15 : 0.3,
        rootMargin: isMobile ? "50px 0px 50px 0px" : "0px 0px -100px 0px",
      },
    )

    const videoElement = philosophyVideoRef.current
    if (videoElement) {
      observerRef.current.observe(videoElement)
    }

    return () => {
      // Don't disconnect - keep persistent to avoid re-init lag on navigation
    }
  }, [isMobile])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch((error) => {
        console.error("Error playing video:", error)
        setVideoError(true)
      })
    } else {
      video.pause()
    }
  }

  const handlePhilosophyVideoLoad = useCallback(() => {
    setIsPhilosophyVideoLoaded(true)
    const video = philosophyVideoRef.current
    if (!video) return

    // Apply mobile optimizations
    if (isMobile) {
      video.setAttribute("webkit-playsinline", "true")
      video.setAttribute("playsinline", "true")
      video.style.imageRendering = "high-quality"
      video.style.WebkitImageRendering = "high-quality"
    }

    // Try to play immediately if already in view
    if (isPhilosophyVideoInView) {
      video.play().catch(() => {
        // On mobile, autoplay may be blocked - that's OK, video is visible with poster/first frame
      })
    }
  }, [isPhilosophyVideoInView, isMobile])

  const handlePhilosophyVideoError = useCallback(() => {
    setPhilosophyVideoError(true)
  }, [])

  // Calculate optimal video dimensions for mobile
  const getVideoStyles = () => {
    const baseStyles = {
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const,
    }

    // Mobile-specific optimizations
    if (isMobile) {
      return {
        ...baseStyles,
        objectFit: "cover" as const,
        objectPosition: "center center",
        maxWidth: "100%",
        maxHeight: "100%",
        width: "100%",
        height: "100%",
        // Prevent video from being too large on small screens
        ...(screenSize.width < 480 && {
          transform: "translate3d(0, 0, 0) scale(1)",
        }),
      }
    }

    return baseStyles
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Full-Screen Video Section */}
      <section className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
        {videoError ? (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="text-center">
              <p className="text-white mb-4">Unable to load video</p>
              <button
                onClick={() => {
                  setVideoError(false)
                  const video = videoRef.current
                  if (video) {
                    video.load()
                  }
                }}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/videos/about-background-new.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                imageRendering: "high-quality",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />

            {/* Video Controls */}
            <div className="absolute bottom-8 right-8 z-30 flex space-x-3">
              <button
                onClick={togglePlayPause}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 sm:p-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg border border-white/20"
                style={{ minWidth: "48px", minHeight: "48px" }}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 flex items-center justify-center z-10">
              <div className="text-center text-white max-w-4xl px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider mb-4 md:mb-8 text-white drop-shadow-lg">
                  ABOUT
                </h1>
                <div className="w-8 sm:w-12 md:w-16 h-px bg-white/70 mx-auto mb-4 md:mb-8"></div>
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 md:mb-8 drop-shadow-md">
                  Where every taste tells a story, and every visit is a moment to cherish.
                </p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
              <div className="flex flex-col items-center text-white/80">
                <span className="text-sm mb-2 hidden sm:block">Scroll to explore</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Spacer for scroll */}
      <div className="h-screen"></div>

      {/* Content Section */}
      <section className="relative z-10 bg-black text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="space-y-16 sm:space-y-20 md:space-y-24">


            {/* Story Section */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-relaxed text-gray-200">Our Story</h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200">
                  Born from a passion for authentic flavors and meaningful connections, Food Saga represents more than just a
                  café — it's a sanctuary where time moves at your pace and every moment is crafted to inspire
                  tranquility.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200">
                  Our journey began with a simple vision: to create a space where the art of slow living meets
                  exceptional taste, where every guest feels welcomed into our extended family.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/images/story-old-house-cafe.png"
                  alt="The Old House Cafe logo - minimalist line art design"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Values Section */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              <div className="order-2 lg:order-1 relative overflow-hidden rounded-lg">
                <Image
                  src="/images/values-cafe-community.jpeg"
                  alt="Food Saga café - community and connection in a warm, welcoming space"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-relaxed text-gray-200">Our Values</h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 text-left">
                  Quality is our cornerstone. From sourcing the finest ingredients to perfecting each recipe, we
                  maintain unwavering standards that reflect our commitment to excellence.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 text-left">
                  Sustainability guides our choices. We partner with local suppliers and embrace practices that honor
                  our environment, ensuring that our impact extends positively beyond our walls.
                </p>
              </div>
            </div>

            {/* Experience Section */}
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-relaxed text-gray-200 mb-4 sm:mb-6 md:mb-8">
                The Food Saga Experience
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 mb-4 sm:mb-6 md:mb-8">
                Step into our world and discover a carefully curated environment where every detail has been
                thoughtfully considered. From the gentle play of natural light to the artful presentation of each dish,
                we create an atmosphere that encourages you to pause, breathe, and truly savor the moment.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200">
                Whether you're seeking a quiet moment of reflection or sharing laughter with loved ones, Food Saga provides
                the perfect backdrop for life's most precious moments.
              </p>
            </div>

            {/* Location Section */}
            <div className="text-center max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 md:p-12 border border-white/10">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 mb-4 sm:mb-6 md:mb-8">
                Visit Us
              </h3>
              <div className="space-y-4">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                  Food Saga
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200">
                  Tarabai Park, Kolhapur
                </p>
                <div className="pt-4">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200">
                    Monday - Friday: 12:30 PM - 10:00 PM
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200">
                    Weekends: 12:00 AM - 11:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-10 md:py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Food Saga Logo */}
            <div className="flex justify-center">
              <img
                src="/images/food-saga-logo.png"
                alt="Food Saga Logo"
                className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 rounded-full object-cover hover:opacity-80 transition-opacity duration-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
            </div>

            {/* Divider */}
            <div className="w-12 sm:w-14 md:w-16 h-px bg-white/30 mx-auto"></div>

            {/* Location */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light italic text-white">
                Food Saga
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200">
                Kolhapur, Maharashtra, India
              </p>
            </div>



            {/* Copyright */}
            <div className="pt-6 sm:pt-8 border-t border-white/10">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light italic text-center text-white">
                Where every taste tells a story, and every visit is a moment to cherish.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
