"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"

interface VideoBackgroundProps {
  videos: string[]
  className?: string
  children?: React.ReactNode
}

export default function VideoBackground({ videos, className = "", children }: VideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(new Array(videos.length).fill(false))
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [reducedMotion, setReducedMotion] = useState(false)

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const transitionTimeoutRef = useRef<NodeJS.Timeout>()
  const cycleIntervalRef = useRef<NodeJS.Timeout>()
  const intersectionObserverRef = useRef<IntersectionObserver>()

  // Detect mobile device and capabilities
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    const checkOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape")
    }

    const checkReducedMotion = () => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }

    checkMobile()
    checkOrientation()
    checkReducedMotion()

    window.addEventListener("resize", checkMobile)
    window.addEventListener("resize", checkOrientation)
    window.addEventListener("orientationchange", checkOrientation)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("resize", checkOrientation)
      window.removeEventListener("orientationchange", checkOrientation)
    }
  }, [])

  // Intersection Observer for performance optimization - create once and reuse
  useEffect(() => {
    if (!containerRef.current) return

    // Only create observer if it doesn't exist
    if (!intersectionObserverRef.current) {
      intersectionObserverRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting)

          if (!entry.isIntersecting) {
            videoRefs.current.forEach((video) => {
              if (video && !video.paused) {
                video.pause()
              }
            })
          } else {
            const currentVideo = videoRefs.current[currentVideoIndex]
            if (currentVideo && currentVideo.paused) {
              currentVideo.play().catch(() => {
                // Silently handle autoplay restrictions
              })
            }
          }
        },
        { threshold: 0.1 },
      )

      intersectionObserverRef.current.observe(containerRef.current)
    }

    return () => {
      // Don't disconnect - keep observer persistent to prevent re-initialization lag
    }
  }, [currentVideoIndex])

  // Optimized video preloading - preload all video metadata immediately to prevent lag on navigation
  useEffect(() => {
    const preloadVideos = () => {
      videos.forEach((videoUrl, i) => {
        // Create a detached video element for preloading metadata only
        const videoElement = document.createElement("video")
        videoElement.preload = "metadata"
        videoElement.muted = true
        videoElement.crossOrigin = "anonymous"

        // Mark as loaded once metadata is available (doesn't require full download)
        const handleLoadedMetadata = () => {
          setVideosLoaded((prev) => {
            const newLoaded = [...prev]
            newLoaded[i] = true
            return newLoaded
          })
          videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
        }

        videoElement.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true })
        videoElement.src = videoUrl
      })
    }

    preloadVideos()
  }, [videos])

  // Video cycling disabled - videos now loop infinitely

  // Handle video end with mobile optimizations
  const handleVideoEnd = useCallback(
    (index: number) => {
      if (videoRefs.current[index] && isVisible) {
        const video = videoRefs.current[index]!
        video.currentTime = 0
        video.play().catch(() => {
          // Handle autoplay restrictions gracefully
        })
      }
    },
    [isVisible],
  )

  // Handle video load with mobile optimizations
  const handleVideoLoad = useCallback(
    (index: number) => {
      const video = videoRefs.current[index]
      if (video && isMobile) {
        // Optimize video quality for mobile
        video.setAttribute("webkit-playsinline", "true")
        video.setAttribute("playsinline", "true")

        // Reduce quality on slower connections
        if (navigator.connection && navigator.connection.effectiveType === "slow-2g") {
          video.style.filter = "blur(1px)"
        }
      }
    },
    [isMobile],
  )

  // Manual video switching with mobile optimizations
  const switchToVideo = useCallback(
    (index: number) => {
      if (index === currentVideoIndex) return

      // Preload the selected video if not loaded (mobile)
      if (isMobile && !videosLoaded[index]) {
        const video = document.createElement("video")
        video.src = videos[index]
        video.preload = "metadata"
        video.onloadedmetadata = () => {
          setVideosLoaded((prev) => {
            const newLoaded = [...prev]
            newLoaded[index] = true
            return newLoaded
          })
          setCurrentVideoIndex(index)
        }
      } else {
        setCurrentVideoIndex(index)
      }
    },
    [currentVideoIndex, isMobile, videosLoaded, videos],
  )

  // Get responsive video styles
  const getVideoStyles = () => {
    const baseStyles = "absolute inset-0 w-full h-full object-cover"
    const mobileStyles = isMobile ? "transform-gpu will-change-transform" : ""
    const orientationStyles = orientation === "portrait" ? "object-position-center" : "object-position-center"

    return `${baseStyles} ${mobileStyles} ${orientationStyles}`
  }

  // Get transition duration based on device capabilities
  const getTransitionDuration = () => {
    if (reducedMotion) return "duration-0"
    if (isMobile) return "duration-300"
    return "duration-1000"
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Video Layers */}
      {videos.map((video, index) => (
        <video
          key={`${video}-${index}`}
          ref={(el) => (videoRefs.current[index] = el)}
          className={`${getVideoStyles()} transition-opacity ${getTransitionDuration()} ${
            index === currentVideoIndex ? "opacity-100" : "opacity-0"
          }`}
          autoPlay={!isMobile || isVisible}
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload={isMobile ? "metadata" : "auto"}
          onEnded={() => handleVideoEnd(index)}
          onLoadedMetadata={() => handleVideoLoad(index)}
          onLoadedData={() => handleVideoLoad(index)}
          style={{
            zIndex: index === currentVideoIndex ? 1 : 0,
            transform: isMobile ? "translate3d(0, 0, 0)" : "none",
          }}
          poster={isMobile ? undefined : "/placeholder.svg?height=1080&width=1920"}
        >
          <source src={video} type="video/mp4" />
        </video>
      ))}

      {/* Enhanced fallback for mobile */}
      {(!videosLoaded[currentVideoIndex] || !isVisible) && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {isMobile && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm opacity-75">Loading experience...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Adaptive overlay for mobile readability */}
      <div className={`absolute inset-0 z-10 ${isMobile ? "bg-black/50" : "bg-black/40"}`} />

      {/* Content */}
      <div className="relative z-20">{children}</div>

      {/* Video pagination indicators hidden - infinite loop mode */}

      {/* Mobile-specific loading and connection indicators */}
      {isMobile && (
        <>
          {/* Data saver mode indicator */}
          {navigator.connection && navigator.connection.saveData && (
            <div className="absolute top-4 right-4 z-30 bg-black/75 text-white px-3 py-1 rounded-full text-xs">
              Data Saver Mode
            </div>
          )}

          {/* Low battery indicator */}
          {navigator.getBattery && (
            <div className="absolute top-4 left-4 z-30">{/* Battery status would be implemented here */}</div>
          )}
        </>
      )}

      {/* Performance monitoring for development */}
      {process.env.NODE_ENV === "development" && isMobile && (
        <div className="absolute bottom-4 right-4 z-30 bg-black/75 text-white p-2 rounded text-xs">
          <div>Mobile: {isMobile ? "Yes" : "No"}</div>
          <div>Orientation: {orientation}</div>
          <div>Visible: {isVisible ? "Yes" : "No"}</div>
          <div>Loaded: {videosLoaded[currentVideoIndex] ? "Yes" : "No"}</div>
        </div>
      )}
    </div>
  )
}
