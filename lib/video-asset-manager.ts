// Video Asset Management and Verification System

export interface VideoAsset {
  key: string
  path: string
  fallbackImage?: string
  alt: string
  description: string
  required: boolean
  formats: string[]
  size?: number
  duration?: number
}

// Complete video asset registry with deployment verification
export const VIDEO_ASSETS: Record<string, VideoAsset> = {
  "coconut-water-matcha": {
    key: "coconut-water-matcha",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hydrated%20by%20matcha%2C%20driven%20by%20desire%E2%80%94this%20thirst%20hits%20different%20%E2%80%94%20Coconut%20Water%20Matcha%20%F0%9F%A5%A5%20%F0%9F%8D%B5-PD4gwYXmB1nOmfEWv1ucC3c9urXikx.mp4",
    fallbackImage: "/images/coconut-water-matcha-poster.jpg",
    alt: "Coconut Water Matcha Video",
    description: "Original matcha coconut water blend preparation",
    required: true,
    formats: ["mp4"],
  },
  "strawberry-elderflower-espresso": {
    key: "strawberry-elderflower-espresso",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Limited%20Edition%20Strawberry%20Elderflower%20Espresso.%20Dropping%20today%20for%20valentines%20week%20only%20.%20Grab%20it%20while%20you%20can-Lg4EzIBo872ltr24o9tAgezzJbGRzy.mp4",
    fallbackImage: "/images/strawberry-elderflower-poster.jpg",
    alt: "Strawberry Elderflower Espresso Video",
    description: "Limited edition Valentine special preparation",
    required: true,
    formats: ["mp4"],
  },
  caffeinated: {
    key: "caffeinated",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Caffeinated%20%E2%98%95%EF%B8%8F%20%F0%9F%8C%A1%EF%B8%8F-2wCUnWrkzYijGa8tDUwdA6oPsFruJt.mp4",
    fallbackImage: "/images/caffeinated-poster.jpg",
    alt: "Caffeinated Video",
    description: "Pure energy in motion - coffee preparation",
    required: true,
    formats: ["mp4"],
  },
  "coconut-water-matcha-new": {
    key: "coconut-water-matcha-new",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hydrated%20by%20matcha%2C%20driven%20by%20desire%E2%80%94this%20thirst%20hits%20different%20%E2%80%94%20Coconut%20Water%20Matcha%20%F0%9F%A5%A5%20%F0%9F%8D%B5-orfnHKAtTmXhGijwRzLovRATzQDXiU.mp4",
    fallbackImage: "/images/matcha-new-poster.jpg",
    alt: "New Coconut Water Matcha Video",
    description: "Updated matcha blend presentation",
    required: true,
    formats: ["mp4"],
  },
  "amai-creation-1": {
    key: "amai-creation-1",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.34.54_f5209451-NdZqrUv42cesK3bB4ErrMxkzy4sAUd.mp4",
    fallbackImage: "/images/creation-1-poster.jpg",
    alt: "AMAI Creation Process 1",
    description: "Behind the scenes artistry - part 1",
    required: true,
    formats: ["mp4"],
  },
  "amai-creation-2": {
    key: "amai-creation-2",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.35.06_f2eed39c-P4Kvn0pRE4dCjUMHx9UdjvF5b4Ehib.mp4",
    fallbackImage: "/images/creation-2-poster.jpg",
    alt: "AMAI Creation Process 2",
    description: "Culinary artistry in detail - part 2",
    required: true,
    formats: ["mp4"],
  },
  glass: {
    key: "glass",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glass-EVVEcgjXAqyH1kcop6W8jsGeVIrnsJ.mp4",
    fallbackImage: "/images/glass-poster.jpg",
    alt: "Glass Artistry Video",
    description: "Crystal clear perfection in glassware",
    required: true,
    formats: ["mp4"],
  },
  pista: {
    key: "pista",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pista-W3dMRDhgzWXdZqR8ltCCBtBAdSg2un.mp4",
    fallbackImage: "/images/pista-poster.jpg",
    alt: "Pistachio Creation Video",
    description: "Pistachio artistry process",
    required: true,
    formats: ["mp4"],
  },
  "texture-experience": {
    key: "texture-experience",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.54.28_f98d6a7f-NVA9qRuRtjH9xqR0IZnuVPlyUfyFjY.mp4",
    fallbackImage: "/images/texture-poster.jpg",
    alt: "Texture Experience Video",
    description: "Symphony of textures in our creations",
    required: true,
    formats: ["mp4"],
  },
  chewww: {
    key: "chewww",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chewww-WAhw3ilrnIcpegWB5kv9VnsmnBGZcC.mp4",
    fallbackImage: "/images/chew-poster.jpg",
    alt: "Perfect Bite Video",
    description: "The moment when texture meets flavor",
    required: true,
    formats: ["mp4"],
  },
  "hello-cloudy": {
    key: "hello-cloudy",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hello%20Cloudy%20%E2%98%81%EF%B8%8F-MPIHuhHikActneJMz8lskk0pcLsIn7.mp4",
    fallbackImage: "/images/cloudy-poster.jpg",
    alt: "Hello Cloudy Video",
    description: "Ethereal clouds meet liquid artistry",
    required: true,
    formats: ["mp4"],
  },
  "cruffin-creation": {
    key: "cruffin-creation",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cruffin%20is%20croissant%20muffin%20stuffed%20with%20flavoured%20creme%20%21%20Do%20you%20want%20to%20see%20this%20on%20the%20menu%20-ZlycJ8fbszm0baDppMUYJCzp4GP2DX.mp4",
    fallbackImage: "/images/cruffin-poster.jpg",
    alt: "Cruffin Creation Video",
    description: "Croissant meets muffin innovation",
    required: true,
    formats: ["mp4"],
  },
  "menu-showcase": {
    key: "menu-showcase",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Would%20you%20like%20to%20see%20this%20on%20the%20menu%20-ijkSHFvbV8UngIbOxhqGpYINNyFeGX.mp4",
    fallbackImage: "/images/menu-poster.jpg",
    alt: "Menu Innovation Video",
    description: "Birth of tomorrow's favorites",
    required: true,
    formats: ["mp4"],
  },
  "celebrating-love": {
    key: "celebrating-love",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Celebrating%20love%20in%20all%20forms%20%E2%9D%A4%EF%B8%8F%F0%9F%8E%88-7axztfkZU1QphOnFcrcCzCDdW1Wc8t.mp4",
    fallbackImage: "/images/love-poster.jpg",
    alt: "Celebrating Love Video",
    description: "Hero background video - celebrating moments",
    required: true,
    formats: ["mp4"],
  },
  indulge: {
    key: "indulge",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/indulge-yIaMuMWncsxduEH3MaOEvu8JdUQmBY.mp4",
    fallbackImage: "/images/indulge-poster.jpg",
    alt: "Indulge Video",
    description: "Hero background video - indulgence",
    required: true,
    formats: ["mp4"],
  },
  "651": {
    key: "651",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/651-cREw3JlsuoUDpVT0uUqDAqCqjPtWbl.mp4",
    fallbackImage: "/images/651-poster.jpg",
    alt: "651 Video",
    description: "Hero background video - signature blend",
    required: true,
    formats: ["mp4"],
  },
  "about-video": {
    key: "about-video",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2019.29.46_7cc84f44-kmltBhK2wkA1TAjBOtvnTBeONEzi5L.mp4",
    fallbackImage: "/images/about-poster.jpg",
    alt: "About AMAI Video",
    description: "Main about page video showcasing our story",
    required: true,
    formats: ["mp4"],
  },
}

export interface VideoVerificationResult {
  key: string
  path: string
  exists: boolean
  canPlay: boolean
  duration?: number
  size?: number
  error?: string
  loadTime?: number
  format?: string
}

export class VideoAssetManager {
  private static instance: VideoAssetManager
  private verificationResults: Map<string, VideoVerificationResult> = new Map()
  private loadingPromises: Map<string, Promise<VideoVerificationResult>> = new Map()
  private retryAttempts: Map<string, number> = new Map()
  private maxRetries = 3

  static getInstance(): VideoAssetManager {
    if (!VideoAssetManager.instance) {
      VideoAssetManager.instance = new VideoAssetManager()
    }
    return VideoAssetManager.instance
  }

  // Comprehensive video verification
  async verifyVideo(videoKey: string): Promise<VideoVerificationResult> {
    const asset = VIDEO_ASSETS[videoKey]
    if (!asset) {
      const result: VideoVerificationResult = {
        key: videoKey,
        path: "",
        exists: false,
        canPlay: false,
        error: `Video asset "${videoKey}" not found in registry`,
      }
      return result
    }

    // Return cached result if available
    if (this.verificationResults.has(videoKey)) {
      return this.verificationResults.get(videoKey)!
    }

    // Return existing promise if verification is in progress
    if (this.loadingPromises.has(videoKey)) {
      return this.loadingPromises.get(videoKey)!
    }

    // Start verification
    const verificationPromise = this.performVideoVerification(asset)
    this.loadingPromises.set(videoKey, verificationPromise)

    const result = await verificationPromise
    this.verificationResults.set(videoKey, result)
    this.loadingPromises.delete(videoKey)

    return result
  }

  private async performVideoVerification(asset: VideoAsset): Promise<VideoVerificationResult> {
    const startTime = Date.now()

    try {
      // First, check if the file exists via HEAD request
      const existsCheck = await this.checkVideoExists(asset.path)
      if (!existsCheck.exists) {
        return {
          key: asset.key,
          path: asset.path,
          exists: false,
          canPlay: false,
          error: existsCheck.error || "Video file not found",
          loadTime: Date.now() - startTime,
        }
      }

      // Then verify if the video can actually be played
      const playabilityCheck = await this.checkVideoPlayability(asset.path)

      return {
        key: asset.key,
        path: asset.path,
        exists: true,
        canPlay: playabilityCheck.canPlay,
        duration: playabilityCheck.duration,
        size: existsCheck.size,
        format: this.getVideoFormat(asset.path),
        error: playabilityCheck.error,
        loadTime: Date.now() - startTime,
      }
    } catch (error) {
      return {
        key: asset.key,
        path: asset.path,
        exists: false,
        canPlay: false,
        error: `Verification failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        loadTime: Date.now() - startTime,
      }
    }
  }

  private async checkVideoExists(path: string): Promise<{ exists: boolean; size?: number; error?: string }> {
    try {
      const response = await fetch(path, { method: "HEAD" })

      if (response.ok) {
        const contentLength = response.headers.get("content-length")
        return {
          exists: true,
          size: contentLength ? Number.parseInt(contentLength, 10) : undefined,
        }
      } else {
        return {
          exists: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }
    } catch (error) {
      return {
        exists: false,
        error: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      }
    }
  }

  private async checkVideoPlayability(path: string): Promise<{ canPlay: boolean; duration?: number; error?: string }> {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.muted = true // Required for autoplay in many browsers

      const timeout = setTimeout(() => {
        video.remove()
        resolve({
          canPlay: false,
          error: "Video load timeout (10s)",
        })
      }, 10000) // 10 second timeout

      video.onloadedmetadata = () => {
        clearTimeout(timeout)
        video.remove()
        resolve({
          canPlay: true,
          duration: video.duration,
        })
      }

      video.onerror = () => {
        clearTimeout(timeout)
        video.remove()
        resolve({
          canPlay: false,
          error: `Video error: ${video.error?.message || "Unknown playback error"}`,
        })
      }

      video.src = path
    })
  }

  private getVideoFormat(path: string): string {
    const extension = path.split(".").pop()?.toLowerCase()
    return extension || "unknown"
  }

  // Verify all videos
  async verifyAllVideos(): Promise<{
    verified: VideoVerificationResult[]
    working: VideoVerificationResult[]
    broken: VideoVerificationResult[]
    total: number
    summary: {
      totalSize: number
      averageLoadTime: number
      successRate: number
    }
  }> {
    const videoKeys = Object.keys(VIDEO_ASSETS)
    const results = await Promise.all(videoKeys.map((key) => this.verifyVideo(key)))

    const working = results.filter((r) => r.exists && r.canPlay)
    const broken = results.filter((r) => !r.exists || !r.canPlay)

    const totalSize = results.reduce((sum, r) => sum + (r.size || 0), 0)
    const averageLoadTime = results.reduce((sum, r) => sum + (r.loadTime || 0), 0) / results.length
    const successRate = (working.length / results.length) * 100

    return {
      verified: results,
      working,
      broken,
      total: results.length,
      summary: {
        totalSize,
        averageLoadTime,
        successRate,
      },
    }
  }

  // Retry failed videos
  async retryFailedVideos(): Promise<VideoVerificationResult[]> {
    const failedVideos = Array.from(this.verificationResults.entries())
      .filter(([_, result]) => !result.exists || !result.canPlay)
      .map(([key, _]) => key)

    const retryResults: VideoVerificationResult[] = []

    for (const videoKey of failedVideos) {
      const currentAttempts = this.retryAttempts.get(videoKey) || 0

      if (currentAttempts < this.maxRetries) {
        this.retryAttempts.set(videoKey, currentAttempts + 1)
        this.verificationResults.delete(videoKey) // Clear cached result

        const result = await this.verifyVideo(videoKey)
        retryResults.push(result)
      }
    }

    return retryResults
  }

  // Get video asset info
  getVideoAsset(videoKey: string): VideoAsset | null {
    return VIDEO_ASSETS[videoKey] || null
  }

  // Get fallback image for video
  getFallbackImage(videoKey: string): string {
    const asset = VIDEO_ASSETS[videoKey]
    if (asset?.fallbackImage) {
      return asset.fallbackImage
    }

    // Generate placeholder
    return `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(asset?.alt || "Video")}`
  }

  // Clear cache
  clearCache(): void {
    this.verificationResults.clear()
    this.loadingPromises.clear()
    this.retryAttempts.clear()
  }

  // Get deployment report
  generateDeploymentReport(): string {
    const results = Array.from(this.verificationResults.values())
    const working = results.filter((r) => r.exists && r.canPlay)
    const broken = results.filter((r) => !r.exists || !r.canPlay)

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: results.length,
        working: working.length,
        broken: broken.length,
        successRate: `${((working.length / results.length) * 100).toFixed(1)}%`,
      },
      workingVideos: working.map((r) => ({
        key: r.key,
        path: r.path,
        duration: r.duration,
        size: r.size,
        loadTime: r.loadTime,
      })),
      brokenVideos: broken.map((r) => ({
        key: r.key,
        path: r.path,
        error: r.error,
        loadTime: r.loadTime,
      })),
      recommendations: this.generateRecommendations(broken),
    }

    return JSON.stringify(report, null, 2)
  }

  private generateRecommendations(brokenVideos: VideoVerificationResult[]): string[] {
    const recommendations: string[] = []

    if (brokenVideos.length > 0) {
      recommendations.push("Some videos are not loading properly. Check the following:")

      brokenVideos.forEach((video) => {
        if (video.error?.includes("404") || video.error?.includes("not found")) {
          recommendations.push(`• ${video.key}: File missing at ${video.path}`)
        } else if (video.error?.includes("timeout")) {
          recommendations.push(`• ${video.key}: Loading timeout - file may be too large`)
        } else if (video.error?.includes("playback error")) {
          recommendations.push(`• ${video.key}: Video format may be incompatible`)
        } else {
          recommendations.push(`• ${video.key}: ${video.error}`)
        }
      })

      recommendations.push("")
      recommendations.push("Suggested fixes:")
      recommendations.push("1. Verify all video files are in the public/videos/ directory")
      recommendations.push("2. Check video file formats (MP4 H.264 recommended)")
      recommendations.push("3. Ensure video files are included in deployment")
      recommendations.push("4. Test video playback in different browsers")
      recommendations.push("5. Consider video compression for large files")
    }

    return recommendations
  }
}

// Utility functions
export const getVideoAsset = (videoKey: string): VideoAsset | null => {
  return VIDEO_ASSETS[videoKey] || null
}

export const getVideoPath = (videoKey: string): string => {
  const asset = VIDEO_ASSETS[videoKey]
  return asset ? asset.path : ""
}

export const getVideoFallback = (videoKey: string): string => {
  const manager = VideoAssetManager.getInstance()
  return manager.getFallbackImage(videoKey)
}
