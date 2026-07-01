"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { VideoAssetManager, getVideoAsset, getVideoFallback } from "@/lib/video-asset-manager"

interface EnhancedVideoProps {
  videoKey: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  playsInline?: boolean
  poster?: string
  onError?: (error: string) => void
  onLoad?: () => void
  onPlay?: () => void
  onPause?: () => void
  fallbackToImage?: boolean
  showLoadingState?: boolean
  retryOnError?: boolean
}

export default function EnhancedVideo({
  videoKey,
  className = "",
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  playsInline = true,
  poster,
  onError,
  onLoad,
  onPlay,
  onPause,
  fallbackToImage = true,
  showLoadingState = true,
  retryOnError = true,
}: EnhancedVideoProps) {
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const assetManager = VideoAssetManager.getInstance()
  const maxRetries = 3

  // Get video asset info
  const videoAsset = getVideoAsset(videoKey)
  const fallbackImage = getVideoFallback(videoKey)

  // Verify video on mount
  useEffect(() => {
    const verifyVideo = async () => {
      setIsLoading(true)
      setHasError(false)

      try {
        const result = await assetManager.verifyVideo(videoKey)
        setVerificationResult(result)

        if (!result.exists || !result.canPlay) {
          setHasError(true)
          onError?.(result.error || "Video verification failed")

          if (fallbackToImage) {
            setShowFallback(true)
          }
        }
      } catch (error) {
        setHasError(true)
        onError?.(error instanceof Error ? error.message : "Unknown error")

        if (fallbackToImage) {
          setShowFallback(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    verifyVideo()
  }, [videoKey, assetManager, onError, fallbackToImage])

  // Handle video events
  const handleLoadStart = useCallback(() => {
    setLoadingProgress(0)
  }, [])

  const handleProgress = useCallback(() => {
    const video = videoRef.current
    if (video && video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1)
      const duration = video.duration
      if (duration > 0) {
        setLoadingProgress((bufferedEnd / duration) * 100)
      }
    }
  }, [])

  const handleLoadedData = useCallback(() => {
    setIsLoading(false)
    setLoadingProgress(100)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)

    const error = videoRef.current?.error
    const errorMessage = error ? `Video error: ${error.message}` : "Video playback failed"

    onError?.(errorMessage)

    // Retry logic
    if (retryOnError && retryCount < maxRetries) {
      setTimeout(
        () => {
          setRetryCount((prev) => prev + 1)
          setHasError(false)
          setIsLoading(true)

          if (videoRef.current) {
            videoRef.current.load()
          }
        },
        1000 * (retryCount + 1),
      ) // Exponential backoff
    } else if (fallbackToImage) {
      setShowFallback(true)
    }
  }, [onError, retryOnError, retryCount, maxRetries, fallbackToImage])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    onPlay?.()
  }, [onPlay])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
    onPause?.()
  }, [onPause])

  // Manual retry function
  const retryVideo = useCallback(() => {
    setHasError(false)
    setIsLoading(true)
    setShowFallback(false)
    setRetryCount(0)

    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [])

  // Loading state
  if (isLoading && showLoadingState) {
    return (
      <div className={`relative bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          <div className="w-16 h-16 border-4 border-gray-400 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-sm text-gray-600 mb-2">Loading video...</div>
          {loadingProgress > 0 && (
            <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
              <div
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          )}
          <div className="text-xs text-gray-500">{videoAsset?.description}</div>
        </div>
      </div>
    )
  }

  // Fallback to image
  if (showFallback && fallbackToImage) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={fallbackImage || "/placeholder.svg"}
          alt={videoAsset?.alt || "Video content"}
          fill
          className="object-cover"
          onError={() => {
            // If even the fallback image fails, show a placeholder
          }}
        />

        {/* Video unavailable overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <svg className="h-12 w-12 mx-auto mb-4 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <div className="text-sm font-medium mb-2">Video Temporarily Unavailable</div>
            <div className="text-xs opacity-75 mb-4">{videoAsset?.description}</div>
            {retryOnError && (
              <button
                onClick={retryVideo}
                className="bg-white text-black px-4 py-2 text-xs rounded hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Error state without fallback
  if (hasError && !fallbackToImage) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}
      >
        <div className="text-center p-6">
          <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <div className="text-lg font-medium text-gray-700 mb-2">Video Unavailable</div>
          <div className="text-sm text-gray-600 mb-4">{verificationResult?.error || "Video could not be loaded"}</div>
          <div className="text-xs text-gray-500 mb-4">{videoAsset?.description}</div>

          {retryOnError && retryCount < maxRetries && (
            <button
              onClick={retryVideo}
              className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 transition-colors"
            >
              Retry ({retryCount + 1}/{maxRetries})
            </button>
          )}
        </div>
      </div>
    )
  }

  // Render working video
  if (verificationResult?.exists && verificationResult?.canPlay) {
    return (
      <div className={`relative ${className}`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline={playsInline}
          poster={poster || fallbackImage}
          onLoadStart={handleLoadStart}
          onProgress={handleProgress}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onPlay={handlePlay}
          onPause={handlePause}
          preload="metadata"
        >
          <source src={verificationResult.path} type="video/mp4" />

          {/* Fallback content for browsers that don't support video */}
          <div className="bg-gray-100 p-4 text-center">
            <p className="text-gray-600 mb-2">Your browser does not support the video tag.</p>
            <p className="text-sm text-gray-500">{videoAsset?.description}</p>
          </div>
        </video>

        {/* Video status indicator (development only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="absolute top-2 left-2 bg-black/75 text-white px-2 py-1 rounded text-xs">
            {isPlaying ? "▶️ Playing" : "⏸️ Paused"} | {verificationResult.duration?.toFixed(1)}s
          </div>
        )}
      </div>
    )
  }

  // Default loading state
  return (
    <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
      <div className="text-gray-500 text-sm">Loading video...</div>
    </div>
  )
}
