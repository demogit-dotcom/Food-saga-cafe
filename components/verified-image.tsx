"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MediaAssetManager, getAsset, getAssetPath, getAssetAlt } from "@/lib/media-assets"

interface VerifiedImageProps {
  assetKey: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  onError?: () => void
  onLoad?: () => void
}

export default function VerifiedImage({
  assetKey,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  onError,
  onLoad,
}: VerifiedImageProps) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [hasError, setHasError] = useState(false)
  const assetManager = MediaAssetManager.getInstance()

  useEffect(() => {
    const verifyAsset = async () => {
      try {
        const verified = await assetManager.verifyAsset(assetKey)
        setIsVerified(verified)

        if (!verified) {
          console.warn(`Image asset "${assetKey}" could not be verified`)
        }
      } catch (error) {
        console.error(`Error verifying image asset "${assetKey}":`, error)
        setIsVerified(false)
      }
    }

    verifyAsset()
  }, [assetKey, assetManager])

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  const handleLoad = () => {
    onLoad?.()
  }

  const asset = getAsset(assetKey)
  const imagePath = isVerified === false || hasError ? assetManager.getFallbackPath(assetKey) : getAssetPath(assetKey)

  const imageAlt = getAssetAlt(assetKey)

  // Loading state
  if (isVerified === null) {
    return (
      <div
        className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
        style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
      >
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  // Error state with fallback
  if (hasError || isVerified === false) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}
        style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
      >
        <div className="text-center p-4">
          <svg className="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div className="text-xs text-gray-500">{asset?.alt || "Image unavailable"}</div>
        </div>
      </div>
    )
  }

  // Render verified image
  return (
    <Image
      src={imagePath || "/placeholder.svg"}
      alt={imageAlt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}
