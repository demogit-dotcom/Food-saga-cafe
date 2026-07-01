// Google Maps TypeScript declarations
declare global {
  interface Window {
    google: typeof google
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions)
      addListener(eventName: string, handler: Function): MapsEventListener
      setCenter(latlng: LatLng | LatLngLiteral): void
      setZoom(zoom: number): void
      getZoom(): number
      getCenter(): LatLng
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral
      zoom?: number
      styles?: MapTypeStyle[]
      disableDefaultUI?: boolean
      zoomControl?: boolean
      mapTypeControl?: boolean
      scaleControl?: boolean
      streetViewControl?: boolean
      rotateControl?: boolean
      fullscreenControl?: boolean
      gestureHandling?: string
      keyboardShortcuts?: boolean
      clickableIcons?: boolean
    }

    interface MapTypeStyle {
      featureType?: string
      elementType?: string
      stylers?: Array<{ [key: string]: any }>
    }

    class Marker {
      constructor(opts?: MarkerOptions)
      addListener(eventName: string, handler: Function): MapsEventListener
      setPosition(latlng: LatLng | LatLngLiteral): void
      setMap(map: Map | null): void
      getPosition(): LatLng | undefined
    }

    interface MarkerOptions {
      position?: LatLng | LatLngLiteral
      map?: Map
      title?: string
      icon?: string | Icon | symbol
      animation?: Animation
    }

    interface Icon {
      url: string
      scaledSize?: Size
      anchor?: Point
    }

    class Size {
      constructor(width: number, height: number)
    }

    class Point {
      constructor(x: number, y: number)
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions)
      open(map?: Map, anchor?: Marker): void
      close(): void
      setContent(content: string | Element): void
    }

    interface InfoWindowOptions {
      content?: string | Element
      maxWidth?: number
    }

    interface LatLng {
      lat(): number
      lng(): number
    }

    interface LatLngLiteral {
      lat: number
      lng: number
    }

    interface MapsEventListener {
      remove(): void
    }

    enum Animation {
      BOUNCE = 1,
      DROP = 2,
    }

    namespace event {
      function addListenerOnce(instance: object, eventName: string, handler: Function): MapsEventListener
    }
  }
}

export {}
