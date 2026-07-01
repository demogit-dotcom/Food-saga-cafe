"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Clock, ExternalLink, Volume2, VolumeX, Play, Pause, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 })
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)
  const [videoNaturalDimensions, setVideoNaturalDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setIsLoaded(true)

    // Enhanced mobile detection and screen dimension tracking
    const checkMobile = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = window.devicePixelRatio || 1

      setIsMobile(width < 768)
      setScreenDimensions({ width, height })
      setDevicePixelRatio(pixelRatio)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("orientationchange", () => {
      setTimeout(checkMobile, 200) // Increased delay for orientation change
    })

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsVideoLoaded(true)
      // Auto-play the video when loaded
      video.play().catch((error) => {
        console.error("Auto-play failed:", error)
        if (error.name === "NotAllowedError") {
          console.log("Auto-play prevented by browser policy")
        }
      })
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setVideoError(true)
      console.error("Video error occurred")
    }

    const handleLoadedMetadata = () => {
      if (video.videoWidth && video.videoHeight) {
        const aspectRatio = video.videoWidth / video.videoHeight
        setVideoNaturalDimensions({ width: video.videoWidth, height: video.videoHeight })
        console.log(`Video natural dimensions: ${video.videoWidth}x${video.videoHeight}, aspect ratio: ${aspectRatio}`)
      }
    }

    const handleCanPlay = () => {
      // Ensure video quality is optimized
      if (video.readyState >= 3) {
        console.log("Video ready for optimal playback")
      }
    }

    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("error", handleError)
    }
  }, [])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch((error) => {
        console.error("Error playing video:", error)
        if (error.name === "NotAllowedError") {
          setVideoError(true)
        }
      })
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  // Direct Google Maps link for Food Saga
  const googleMapsLink = "https://maps.app.goo.gl/5eeSr5Vp8mqA7Fuu8"

  // WhatsApp link
  const whatsappLink = "https://wa.me/919765230838"

  // Calculate optimal video container dimensions based on natural aspect ratio
  const getVideoContainerStyle = () => {
    const containerWidth = isMobile
      ? screenDimensions.width < 480
        ? screenDimensions.width - 32
        : screenDimensions.width - 64
      : 600 // Desktop container width

    let containerHeight

    if (videoNaturalDimensions.width && videoNaturalDimensions.height) {
      // Use natural aspect ratio to calculate height
      const aspectRatio = videoNaturalDimensions.width / videoNaturalDimensions.height
      containerHeight = containerWidth / aspectRatio
    } else {
      // Fallback dimensions
      if (isMobile) {
        containerHeight = screenDimensions.width < 480 ? 280 : 320
      } else {
        containerHeight = 400
      }
    }

    // Apply reasonable constraints
    const minHeight = isMobile ? 200 : 300
    const maxHeight = isMobile ? 400 : 500

    containerHeight = Math.max(minHeight, Math.min(maxHeight, containerHeight))

    return {
      width: "100%",
      height: `${containerHeight}px`,
      maxWidth: "100%",
    }
  }

  const getVideoStyle = () => {
    const baseStyle = {
      transform: "translate3d(0, 0, 0)",
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const,
      imageRendering: "high-quality" as const,
      WebkitImageRendering: "high-quality" as const,
      WebkitTransform: "translateZ(0)",
      willChange: "transform",
    }

    // Mobile-optimized video display settings
    if (isMobile) {
      return {
        ...baseStyle,
        objectFit: "contain" as const, // Prevent cropping on mobile
        objectPosition: "center center" as const,
        filter: "brightness(1.03) contrast(1.02) saturate(1.05) sharpen(0.2)",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      }
    }

    // Desktop settings
    return {
      ...baseStyle,
      objectFit: "cover" as const,
      objectPosition: "center center" as const,
      filter: "brightness(1.05) contrast(1.03) saturate(1.1)",
      width: "100%",
      height: "100%",
    }
  }

  return (
    <div
      className={`min-h-screen bg-white text-black pt-16 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-wider mb-4 md:mb-8 text-black drop-shadow-lg lg:text-7xl font-medium">
            VISIT US
          </h1>
          <div className="w-8 sm:w-12 md:w-16 h-px bg-black/70 mx-auto mb-4 md:mb-8"></div>
          <p className="text-base sm:text-lg md:text-xl text-black/90 mb-4 md:mb-8 drop-shadow-md">
            Experience Food Saga in the Heart of Kolhapur
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Details */}
            <div className="space-y-8 lg:space-y-12">
              <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-6 md:mb-8 text-gray-700">
                Come find out what the hype is all about!
              </h2>

                <div className="space-y-6 lg:space-y-8">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 lg:w-6 lg:h-6 mt-1 text-black flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-2 text-gray-700">ADDRESS</h3>
                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer"
                      >
                        Food Saga, Sardar Colony, Tarabai Park,
                        <br />
                        Kolhapur, 416003
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 lg:w-6 lg:h-6 mt-1 text-black flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-2 text-gray-700">PHONE</h3>
                      <a
                        href="tel:+919876543210"
                        className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 hover:text-black transition-colors duration-200"
                      >
                        +91 9765230838
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 mt-1 text-black flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-2 text-gray-700">WHATSAPP</h3>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 hover:text-black transition-colors duration-200"
                      >
                        +91 9765230838
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Quick responses during business hours</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 mt-1 text-black flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-2 text-gray-700">
                        OPENING HOURS
                      </h3>
                      <div className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 space-y-1">
                        <p>Monday - Friday: 12:30 PM - 10:00 PM</p>
                        <p>Weekends: 12:00 AM - 11:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Actions */}
              <div className="bg-gray-50 p-4 lg:p-6 rounded-lg border border-gray-200">
                <h3 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-4 text-gray-700">QUICK CONTACT</h3>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="tel:+919765230838"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm lg:text-base"
                    style={{ minHeight: "44px" }}
                  >
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>CALL NOW</span>
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 text-sm lg:text-base"
                    style={{ minHeight: "44px" }}
                  >
                    <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Find Us Section with Optimized Video */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8 text-gray-700">FIND US</h2>

                {/* Location Image */}
                <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-900 shadow-2xl" style={getVideoContainerStyle()}>
                  <img
                    src="/food-saga-happy-hour.jpeg"
                    alt="Food Saga Happy Hour Location"
                    className="w-full h-full object-cover"
                    style={getVideoStyle()}
                  />
                </div>
              </div>

              {/* Get Directions */}
              <div className="bg-gray-50 p-4 lg:p-8 rounded-lg border border-gray-200">
                <h3 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-4 text-gray-700">GET DIRECTIONS</h3>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-gray-700">
                  Click below to open our location in Google Maps and get turn-by-turn directions to Food Saga.
                </p>
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-black text-white px-4 py-3 lg:px-6 lg:py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm lg:text-base"
                >
                  <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>OPEN IN GOOGLE MAPS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Food Saga Logo */}
            <div className="flex justify-center">
              <img
                src="/images/food-saga-logo.png"
                alt="Food Saga Logo"
                className="h-20 lg:h-24 w-20 lg:w-24 rounded-full object-cover hover:opacity-80 transition-opacity duration-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
            </div>

            {/* Divider */}
            <div className="w-16 h-px bg-white/30 mx-auto"></div>

            {/* Location */}
            <div className="space-y-2">
              <p className="text-lg sm:text-xl md:text-2xl font-normal text-white">Food Saga - Old House Cafe</p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
                Tarabai Park, Kolhapur
              </p>
            </div>

            {/* Contact Methods */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <a
                href="tel:+919876543210"
                className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 hover:text-white transition-colors duration-200"
              >
                +91 9765230838
              </a>
              <div className="hidden sm:block w-px h-4 bg-white/30"></div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 hover:text-white transition-colors duration-200"
              >
                WhatsApp
              </a>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-lg sm:text-xl font-light text-center text-gray-300 md:text-xl">
                Where every taste tells a story, and every visit is a moment to cherish.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
