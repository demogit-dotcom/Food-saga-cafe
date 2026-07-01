import Image from "next/image"
import Link from "next/link"

interface FeaturedItemProps {
  name: string
  description: string
  image: string
  href: string
  isVideo?: boolean
}

export default function FeaturedItem({ name, description, image, href, isVideo = false }: FeaturedItemProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative h-40 overflow-hidden bg-gray-100 border border-gray-200">
        {isVideo ? (
          <video
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            autoPlay
            muted
            loop
          >
            <source src={image} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
          <div className="p-3 w-full bg-white/90">
            <h5 className="text-xs font-medium text-black">{name}</h5>
            <p className="text-xs text-gray-600 truncate">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
