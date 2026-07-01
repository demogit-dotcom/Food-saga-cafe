"use client"

import { useState, useEffect, useRef } from "react"
import { MediaAssetManager, getAsset, getAssetPath } from "@/lib/media-assets"

interface VerifiedVideoProps {
  assetKey: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  playsInline?: boolean
  poster?: string
  onError?: () => void
  onLoad?: () => void
  onPlay?: () => void
  onPause?: () => void
}

export default function VerifiedVideo({
  assetKey,
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
}: VerifiedVideoProps) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const assetManager = MediaAssetManager.getInstance()

  useEffect(() => {
    const verifyAsset = async () => {
      try {
        const verified = await assetManager.verifyAsset(assetKey)
        setIsVerified(verified)

        if (!verified) {
          console.warn(`Video asset "${assetKey}" could not be verified`)
        }
      } catch (error) {
        console.error(`Error verifying video asset "${assetKey}":`, error)
        setIsVerified(false)
      }
    }

    verifyAsset()
  }, [assetKey, assetManager])

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  const handleLoadedData = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handlePlay = () => {
    onPlay?.()
  }

  const handlePause = () => {
    onPause?.()
  }

  const asset = getAsset(assetKey)
  const videoPath = isVerified === false || hasError ? null : getAssetPath(assetKey)

  // Loading state
  if (isVerified === null || isLoading) {
    return (
      <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <div className="text-gray-500 text-sm">Loading video...</div>
        </div>
      </div>
    )
  }

  // Error state
  if (hasError || isVerified === false || !videoPath) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}
      >
        <div className="text-center p-6">
          <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <div className="text-sm text-gray-600 mb-2">Video Unavailable</div>
          <div className="text-xs text-gray-500">{asset?.description || "Video content could not be loaded"}</div>
        </div>
      </div>
    )
  }

  // Render verified video
  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline={playsInline}
      poster={poster}
      onError={handleError}
      onLoadedData={handleLoadedData}
      onPlay={handlePlay}
      onPause={handlePause}
    >
      <source src={videoPath} type="video/mp4" />
      <div className="bg-gray-100 p-4 text-center">
        <p className="text-gray-600">Your browser does not support the video tag.</p>
        <p className="text-sm text-gray-500 mt-2">{asset?.description}</p>
      </div>
    </video>
  )
}
