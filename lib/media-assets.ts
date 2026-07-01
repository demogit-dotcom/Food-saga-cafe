// Media Asset Management and Verification System

export interface MediaAsset {
  path: string
  type: "image" | "video"
  required: boolean
  fallback?: string
  alt?: string
  description?: string
}

// Complete media asset registry
export const MEDIA_ASSETS: Record<string, MediaAsset> = {
  // Logo Assets
  "amai-logo": {
    path: "/amai-logo.png",
    type: "image",
    required: true,
    alt: "AMAI Artisanal Bakehouse Logo",
    description: "Main logo for navigation and branding",
  },
  "amai-logo-new": {
    path: "/amai-logo-new.png",
    type: "image",
    required: true,
    alt: "AMAI Artisanal Bakehouse New Logo",
    description: "Updated logo for splash screen and navigation",
  },

  // Food Images
  "avocado-strawberry-granola": {
    path: "/images/avocado-strawberry-granola.jpg",
    type: "image",
    required: true,
    alt: "Avocado Strawberry Granola Bowl",
    description: "Nourishment bowl with fresh strawberry and granola",
  },
  "avocado-blueberry-granola": {
    path: "/images/avocado-blueberry-granola.jpg",
    type: "image",
    required: true,
    alt: "Avocado Blueberry Granola Bowl",
    description: "Wholesome bowl with blueberries and avocado",
  },
  "strawberry-latte": {
    path: "/images/strawberry-latte.jpg",
    type: "image",
    required: true,
    alt: "Strawberry Latte",
    description: "Layers of flavor with fresh strawberry and milk",
  },
  tiramisu: {
    path: "/images/tiramisu.jpg",
    type: "image",
    required: true,
    alt: "Tiramisu 2.0",
    description: "Artisanal presentation of classic tiramisu",
  },
  "strawberry-cake": {
    path: "/images/strawberry-cake.jpg",
    type: "image",
    required: true,
    alt: "Strawberry Cake",
    description: "Vanilla sponge with strawberry and chantilly",
  },
  "protein-cake": {
    path: "/images/protein-cake.jpg",
    type: "image",
    required: true,
    alt: "Protein Cake",
    description: "Healthy, gluten-free protein-rich dessert",
  },
  "strawberry-croissant": {
    path: "/images/strawberry-croissant.jpg",
    type: "image",
    required: true,
    alt: "Strawberry Cheesecake Croissant",
    description: "Flaky croissant with strawberry cheesecake filling",
  },
  "lazy-cat-cake": {
    path: "/images/lazy-cat-cake.jpg",
    type: "image",
    required: true,
    alt: "Lazy Cat Cake",
    description: "Chocolate indulgence with cream and texture",
  },
  "pistachio-latte-iced": {
    path: "/images/pistachio-latte-iced.jpg",
    type: "image",
    required: true,
    alt: "Pistachio Latte Iced",
    description: "Creamy pistachio perfection with nuts",
  },
  "mango-delice": {
    path: "/images/mango-delice.jpg",
    type: "image",
    required: true,
    alt: "Mango Delice",
    description: "Pure Alphonso mango indulgence",
  },
  "strawberry-choux": {
    path: "/images/strawberry-choux.jpg",
    type: "image",
    required: true,
    alt: "Strawberry Choux",
    description: "Delicate choux pastry with strawberry cream",
  },
  "strawberry-collection": {
    path: "/images/strawberry-collection.jpg",
    type: "image",
    required: true,
    alt: "Strawberry Collection",
    description: "Artisanal spread of strawberry creations",
  },

  // Ambiance Images
  "amai-exterior": {
    path: "/images/amai-exterior.jpg",
    type: "image",
    required: true,
    alt: "AMAI Café Exterior",
    description: "External view of AMAI café",
  },
  "indulge-relax-slowdown": {
    path: "/images/indulge-relax-slowdown.jpg",
    type: "image",
    required: true,
    alt: "Indulge Relax Slow Down",
    description: "Table setting with natural lighting",
  },
  "pumpkin-spice-protein-cake": {
    path: "/images/pumpkin-spice-protein-cake.jpg",
    type: "image",
    required: true,
    alt: "Pumpkin Spice Protein Cake",
    description: "Seasonal protein cake with spices",
  },
  "amai-interior": {
    path: "/images/amai-interior.png",
    type: "image",
    required: true,
    alt: "AMAI Interior",
    description: "Modern café interior design",
  },
  "layered-coffee-pastries": {
    path: "/images/layered-coffee-pastries.png",
    type: "image",
    required: true,
    alt: "Layered Coffee and Pastries",
    description: "Artful coffee presentation with garnishes",
  },
  "strawberry-protein-smoothie": {
    path: "/images/strawberry-protein-smoothie.jpg",
    type: "image",
    required: true,
    alt: "Strawberry Protein Smoothie",
    description: "Healthy smoothie with elegant dessert",
  },

  // Video Assets
  "coconut-water-matcha": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hydrated%20by%20matcha%2C%20driven%20by%20desire%E2%80%94this%20thirst%20hits%20different%20%E2%80%94%20Coconut%20Water%20Matcha%20%F0%9F%A5%A5%20%F0%9F%8D%B5-PD4gwYXmB1nOmfEWv1ucC3c9urXikx.mp4",
    type: "video",
    required: true,
    alt: "Coconut Water Matcha Video",
    description: "Original matcha coconut water blend",
  },
  "strawberry-elderflower-espresso": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Limited%20Edition%20Strawberry%20Elderflower%20Espresso.%20Dropping%20today%20for%20valentines%20week%20only%20.%20Grab%20it%20while%20you%20can-Lg4EzIBo872ltr24o9tAgezzJbGRzy.mp4",
    type: "video",
    required: true,
    alt: "Strawberry Elderflower Espresso Video",
    description: "Limited edition Valentine special",
  },
  caffeinated: {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Caffeinated%20%E2%98%95%EF%B8%8F%20%F0%9F%8C%A1%EF%B8%8F-2wCUnWrkzYijGa8tDUwdA6oPsFruJt.mp4",
    type: "video",
    required: true,
    alt: "Caffeinated Video",
    description: "Pure energy in motion",
  },
  "coconut-water-matcha-new": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hydrated%20by%20matcha%2C%20driven%20by%20desire%E2%80%94this%20thirst%20hits%20different%20%E2%80%94%20Coconut%20Water%20Matcha%20%F0%9F%A5%A5%20%F0%9F%8D%B5-orfnHKAtTmXhGijwRzLovRATzQDXiU.mp4",
    type: "video",
    required: true,
    alt: "New Coconut Water Matcha Video",
    description: "Updated matcha blend presentation",
  },
  "amai-creation-1": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.34.54_f5209451-NdZqrUv42cesK3bB4ErrMxkzy4sAUd.mp4",
    type: "video",
    required: true,
    alt: "AMAI Creation Process 1",
    description: "Behind the scenes artistry",
  },
  "amai-creation-2": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.35.06_f2eed39c-P4Kvn0pRE4dCjUMHx9UdjvF5b4Ehib.mp4",
    type: "video",
    required: true,
    alt: "AMAI Creation Process 2",
    description: "Culinary artistry in detail",
  },
  glass: {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glass-EVVEcgjXAqyH1kcop6W8jsGeVIrnsJ.mp4",
    type: "video",
    required: true,
    alt: "Glass Artistry Video",
    description: "Crystal clear perfection",
  },
  pista: {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pista-W3dMRDhgzWXdZqR8ltCCBtBAdSg2un.mp4",
    type: "video",
    required: true,
    alt: "Pistachio Creation Video",
    description: "Pistachio artistry process",
  },
  "texture-experience": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.54.28_f98d6a7f-NVA9qRuRtjH9xqR0IZnuVPlyUfyFjY.mp4",
    type: "video",
    required: true,
    alt: "Texture Experience Video",
    description: "Symphony of textures",
  },
  chewww: {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chewww-WAhw3ilrnIcpegWB5kv9VnsmnBGZcC.mp4",
    type: "video",
    required: true,
    alt: "Perfect Bite Video",
    description: "Texture meets flavor moment",
  },
  "hello-cloudy": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hello%20Cloudy%20%E2%98%81%EF%B8%8F-MPIHuhHikActneJMz8lskk0pcLsIn7.mp4",
    type: "video",
    required: true,
    alt: "Hello Cloudy Video",
    description: "Ethereal clouds meet liquid artistry",
  },
  "cruffin-creation": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cruffin%20is%20croissant%20muffin%20stuffed%20with%20flavoured%20creme%20%21%20Do%20you%20want%20to%20see%20this%20on%20the%20menu%20-ZlycJ8fbszm0baDppMUYJCzp4GP2DX.mp4",
    type: "video",
    required: true,
    alt: "Cruffin Creation Video",
    description: "Croissant meets muffin innovation",
  },
  "menu-showcase": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Would%20you%20like%20to%20see%20this%20on%20the%20menu%20-ijkSHFvbV8UngIbOxhqGpYINNyFeGX.mp4",
    type: "video",
    required: true,
    alt: "Menu Innovation Video",
    description: "Birth of tomorrow's favorites",
  },
  "celebrating-love": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Celebrating%20love%20in%20all%20forms%20%E2%9D%A4%EF%B8%8F%F0%9F%8E%88-7axztfkZU1QphOnFcrcCzCDdW1Wc8t.mp4",
    type: "video",
    required: true,
    alt: "Celebrating Love Video",
    description: "Hero background video 1",
  },
  indulge: {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/indulge-yIaMuMWncsxduEH3MaOEvu8JdUQmBY.mp4",
    type: "video",
    required: true,
    alt: "Indulge Video",
    description: "Hero background video 2",
  },
  "651": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/651-cREw3JlsuoUDpVT0uUqDAqCqjPtWbl.mp4",
    type: "video",
    required: true,
    alt: "651 Video",
    description: "Hero background video 3",
  },
  "about-video": {
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2019.29.46_7cc84f44-kmltBhK2wkA1TAjBOtvnTBeONEzi5L.mp4",
    type: "video",
    required: true,
    alt: "About AMAI Video",
    description: "Main about page video",
  },
}

// Asset verification utilities
export class MediaAssetManager {
  private static instance: MediaAssetManager
  private verificationResults: Map<string, boolean> = new Map()
  private loadingPromises: Map<string, Promise<boolean>> = new Map()

  static getInstance(): MediaAssetManager {
    if (!MediaAssetManager.instance) {
      MediaAssetManager.instance = new MediaAssetManager()
    }
    return MediaAssetManager.instance
  }

  // Verify if an asset exists and is accessible
  async verifyAsset(assetKey: string): Promise<boolean> {
    const asset = MEDIA_ASSETS[assetKey]
    if (!asset) {
      console.warn(`Asset key "${assetKey}" not found in registry`)
      return false
    }

    // Return cached result if available
    if (this.verificationResults.has(assetKey)) {
      return this.verificationResults.get(assetKey)!
    }

    // Return existing promise if verification is in progress
    if (this.loadingPromises.has(assetKey)) {
      return this.loadingPromises.get(assetKey)!
    }

    // Start verification
    const verificationPromise = this.performAssetVerification(asset)
    this.loadingPromises.set(assetKey, verificationPromise)

    const result = await verificationPromise
    this.verificationResults.set(assetKey, result)
    this.loadingPromises.delete(assetKey)

    return result
  }

  private async performAssetVerification(asset: MediaAsset): Promise<boolean> {
    try {
      if (asset.type === "image") {
        return await this.verifyImage(asset.path)
      } else if (asset.type === "video") {
        return await this.verifyVideo(asset.path)
      }
      return false
    } catch (error) {
      console.error(`Failed to verify asset ${asset.path}:`, error)
      return false
    }
  }

  private async verifyImage(path: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = path
    })
  }

  private async verifyVideo(path: string): Promise<boolean> {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.onloadedmetadata = () => resolve(true)
      video.onerror = () => resolve(false)
      video.src = path
    })
  }

  // Verify all assets
  async verifyAllAssets(): Promise<{ verified: string[]; missing: string[]; total: number }> {
    const assetKeys = Object.keys(MEDIA_ASSETS)
    const results = await Promise.all(
      assetKeys.map(async (key) => ({
        key,
        verified: await this.verifyAsset(key),
      })),
    )

    const verified = results.filter((r) => r.verified).map((r) => r.key)
    const missing = results.filter((r) => !r.verified).map((r) => r.key)

    return {
      verified,
      missing,
      total: assetKeys.length,
    }
  }

  // Get asset info
  getAssetInfo(assetKey: string): MediaAsset | null {
    return MEDIA_ASSETS[assetKey] || null
  }

  // Get fallback for missing asset
  getFallbackPath(assetKey: string): string {
    const asset = MEDIA_ASSETS[assetKey]
    if (!asset) return "/placeholder.svg?height=400&width=600"

    if (asset.fallback) return asset.fallback

    // Generate appropriate placeholder
    if (asset.type === "image") {
      return `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(asset.alt || "Image")}`
    } else {
      return "/placeholder.svg?height=400&width=600&text=Video+Unavailable"
    }
  }

  // Clear cache
  clearCache(): void {
    this.verificationResults.clear()
    this.loadingPromises.clear()
  }
}

// Utility functions
export const getAsset = (assetKey: string): MediaAsset | null => {
  return MEDIA_ASSETS[assetKey] || null
}

export const getAssetPath = (assetKey: string): string => {
  const asset = MEDIA_ASSETS[assetKey]
  return asset ? asset.path : "/placeholder.svg?height=400&width=600"
}

export const getAssetAlt = (assetKey: string): string => {
  const asset = MEDIA_ASSETS[assetKey]
  return asset?.alt || "Media content"
}

// Build-time asset verification (for development)
export const generateAssetManifest = (): string => {
  const manifest = {
    generated: new Date().toISOString(),
    assets: MEDIA_ASSETS,
    summary: {
      total: Object.keys(MEDIA_ASSETS).length,
      images: Object.values(MEDIA_ASSETS).filter((a) => a.type === "image").length,
      videos: Object.values(MEDIA_ASSETS).filter((a) => a.type === "video").length,
      required: Object.values(MEDIA_ASSETS).filter((a) => a.required).length,
    },
  }

  return JSON.stringify(manifest, null, 2)
}
