"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"

interface GoogleMapProps {
  className?: string
  height?: string
  zoom?: number
  center?: { lat: number; lng: number }
  markerTitle?: string
  address?: string
}

// Custom map styles to match AMAI's minimalist design
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dadada" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
]

export default function GoogleMap({
  className = "",
  height = "400px",
  zoom = 16,
  center = { lat: 16.705, lng: 74.2433 }, // Kolhapur coordinates
  markerTitle = "AMAI Experience",
  address = "RTO office road, opposite datt mandir, Tarabai Park, Kolhapur, Maharashtra 416002",
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const infoWindowRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false)
  const [mapConfig, setMapConfig] = useState<{ apiKey: string; enabled: boolean } | null>(null)

  // Get map configuration from environment variable
  const fetchMapConfig = useCallback(async () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    if (!apiKey || apiKey === "your_google_maps_api_key_here") {
      setMapConfig({ apiKey: "", enabled: false })
      return null
    }
    const config = { apiKey, enabled: true }
    setMapConfig(config)
    return config
  }, [])

  // Load Google Maps API
  const loadGoogleMaps = useCallback(async () => {
    try {
      const config = await fetchMapConfig()

      if (!config || !config.enabled || !config.apiKey) {
        setError("Interactive map not available")
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        setIsLoaded(true)
        setIsLoading(false)
        return
      }

      // Create script element
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&libraries=places`
      script.async = true
      script.defer = true

      // Handle script load
      script.onload = () => {
        setIsLoaded(true)
        setIsLoading(false)
        setError(null)
      }

      script.onerror = () => {
        setError("Failed to load Google Maps")
        setIsLoading(false)
      }

      document.head.appendChild(script)
    } catch (err) {
      setError("Error loading Google Maps")
      setIsLoading(false)
    }
  }, [fetchMapConfig])

  // Initialize map
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google || !window.google.maps) return

    try {
      // Create map
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
        gestureHandling: "cooperative",
        keyboardShortcuts: true,
        clickableIcons: false,
      })

      googleMapRef.current = map

      // Create custom marker icon
      const markerIcon = {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#000000" stroke="#ffffff" strokeWidth="4"/>
            <circle cx="20" cy="20" r="8" fill="#ffffff"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 20),
      }

      // Create marker
      const marker = new window.google.maps.Marker({
        position: center,
        map,
        title: markerTitle,
        icon: markerIcon,
        animation: window.google.maps.Animation.DROP,
      })

      markerRef.current = marker

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: 'Inter', sans-serif; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #000000;">${markerTitle}</h3>
            <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.4;">${address}</p>
            <div style="margin-top: 12px;">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}" 
                target="_blank" 
                rel="noopener noreferrer"
                style="display: inline-block; background: #000000; color: #ffffff; padding: 8px 16px; text-decoration: none; font-size: 12px; font-weight: 500; border-radius: 4px; transition: background-color 0.2s;"
                onmouseover="this.style.backgroundColor='#333333'"
                onmouseout="this.style.backgroundColor='#000000'"
              >
                GET DIRECTIONS
              </a>
            </div>
          </div>
        `,
        maxWidth: 300,
      })

      infoWindowRef.current = infoWindow

      // Add click listener to marker
      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })

      // Add keyboard event listeners for accessibility
      map.addListener("click", () => {
        if (isKeyboardFocused) {
          infoWindow.open(map, marker)
        }
      })

      // Handle map load completion
      window.google.maps.event.addListenerOnce(map, "idle", () => {
        // Map is fully loaded
        if (mapRef.current) {
          mapRef.current.setAttribute("aria-label", `Interactive map showing ${markerTitle} location`)
        }
      })
    } catch (err) {
      console.error("Error initializing map:", err)
      setError("Failed to initialize map")
    }
  }, [center, zoom, markerTitle, address, isKeyboardFocused])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setIsKeyboardFocused(true)
      if (infoWindowRef.current && googleMapRef.current && markerRef.current) {
        infoWindowRef.current.open(googleMapRef.current, markerRef.current)
      }
    }
  }

  const handleFocus = () => {
    setIsKeyboardFocused(true)
  }

  const handleBlur = () => {
    setIsKeyboardFocused(false)
  }

  // Load Google Maps on component mount
  useEffect(() => {
    loadGoogleMaps()
  }, [loadGoogleMaps])

  // Initialize map when loaded
  useEffect(() => {
    if (isLoaded) {
      initializeMap()
    }
  }, [isLoaded, initializeMap])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close()
      }
    }
  }, [])

  // Default fallback - Static map representation
  const StaticMapFallback = () => (
    <div
      className={`relative bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-lg overflow-hidden ${className}`}
      style={{ height }}
      role="img"
      aria-label={`Static map representation for ${markerTitle}`}
    >
      {/* Map-like background pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 400 400" fill="none">
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Road-like lines */}
          <path d="M0 100 Q100 120 200 100 T400 100" stroke="#666" strokeWidth="3" fill="none" />
          <path d="M0 200 Q150 180 300 200 T400 200" stroke="#666" strokeWidth="2" fill="none" />
          <path d="M100 0 Q120 100 100 200 T100 400" stroke="#666" strokeWidth="2" fill="none" />
          <path d="M300 0 Q280 150 300 300 T300 400" stroke="#666" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* Center marker */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Marker pin */}
          <div className="w-12 h-12 bg-black rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>

          {/* Marker label */}
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
            {markerTitle}
          </div>
        </div>
      </div>

      {/* Location info overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-lg p-4 shadow-lg">
        <h3 className="font-medium text-black mb-2">{markerTitle}</h3>
        <p className="text-sm text-gray-600 mb-3">{address}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-4 py-2 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors duration-300 rounded"
        >
          VIEW ON GOOGLE MAPS
        </a>
      </div>
    </div>
  )

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg ${className}`}
        style={{ height }}
        role="img"
        aria-label="Loading map"
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  // Error state or map not available - show static fallback
  if (error || !mapConfig?.enabled) {
    return (
      <>
        <StaticMapFallback />

        {/* Map Controls Info */}
        <div className="mt-4 text-sm text-gray-600">
          <p className="mb-2">
            <strong>Location:</strong> {address}
          </p>
          <div className="flex flex-wrap gap-4 text-xs">
            <span>• Interactive map temporarily unavailable</span>
            <span>• Click "View on Google Maps" for directions</span>
          </div>
        </div>

        {/* External Link */}
        <div className="mt-4">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-black hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Open in Google Maps
          </a>
        </div>
      </>
    )
  }

  // Interactive map
  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full rounded-lg overflow-hidden border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        style={{ height }}
        tabIndex={0}
        role="application"
        aria-label={`Interactive map showing ${markerTitle} at ${address}. Use arrow keys to navigate, Enter to open location details.`}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {/* Map Controls Info */}
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Location:</strong> {address}
        </p>
        <div className="flex flex-wrap gap-4 text-xs">
          <span>• Click marker for details</span>
          <span>• Use mouse wheel to zoom</span>
          <span>• Drag to pan</span>
          <span>• Press Enter when focused to open info</span>
        </div>
      </div>

      {/* External Link */}
      <div className="mt-4">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-black hover:text-gray-600 transition-colors duration-200"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Open in Google Maps
        </a>
      </div>
    </div>
  )
}
