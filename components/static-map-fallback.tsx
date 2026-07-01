"use client"

interface StaticMapFallbackProps {
  className?: string
  height?: string
  address: string
  markerTitle: string
}

export default function StaticMapFallback({
  className = "",
  height = "400px",
  address,
  markerTitle,
}: StaticMapFallbackProps) {
  return (
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
}
