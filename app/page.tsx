"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import VideoBackground from "@/components/video-background"

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".observe")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  const heroVideos = ["/videos/hero-featured.mp4", "/videos/hero-featured.mp4", "/videos/hero-featured.mp4"]

  return (
    <div className="page-transition">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center">
        <VideoBackground videos={heroVideos} className="absolute inset-0">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-6xl md:text-7xl font-light tracking-wider mb-4 text-shadow animate-fade-in font-sans">Food Saga</h1>
              <div className="w-12 h-px bg-white opacity-50 mx-auto mb-4"></div>
              <p className="text-xl md:text-2xl font-light tracking-wide text-shadow animate-fade-in-delay">
                Experience culinary excellence in a warm, inviting atmosphere
              </p>
            </div>
          </div>
        </VideoBackground>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
          <ChevronDown className="h-8 w-8 text-white opacity-60" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center observe">
            <div className="space-y-6">
              <h2 className="text-3xl font-normal tracking-wider text-black">OUR PHILOSOPHY</h2>
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-2xl font-light tracking-wide text-black mb-2">'Food Saga' (食の佐賀)</h3>
                  <p className="text-sm text-gray-600 italic mb-4">"food-sah-gah" | Noun</p>
                  <p className="text-lg text-gray-800 leading-relaxed text-left">
                    'Food Saga' in Japanese means 'odyssey,' the rich culinary history and regional specialties of Saga Prefecture and rich flavors inspired by Asia.
                  </p>
                </div>
                <p className="text-lg text-gray-800 leading-relaxed text-left">
                  But for us, 'Food Saga' has a deeper meaning than just taste. It symbolizes the warmth and joy that small,
                  cherished moments bring, moments that should be adorned with indulgence and delight.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed text-left">
                  To capture this essence, our founder, Sayali, embarked on a self-taught journey to master the culinary
                  art. She sought the perfect blend that seamlessly merged the traditions and flavors of her childhood.
                  Unable to find what she craved, she decided to craft her own confections, drawing inspiration from her
                  mother who made everything from scratch.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed text-left">
                  Combining her knowledge of Western dishes techniques with Asian ingredients, she created a menu that is
                  as diverse as it is delicious.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="/images/philosophy-cafe-interior.jpg"
                alt="Food Saga Café interior with modern design and natural light"
                width={600}
                height={400}
                className="w-full h-auto hover-zoom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Signature Experience */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe">
            <h2 className="text-3xl tracking-wider text-black mb-8 font-medium">SIGNATURE EXPERIENCE</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "EXCEPTIONALLY CRAFTED CUISINE",
                  points: ["Fresh ingredients", "Authentic flavors", "Chef-inspired recipes"],
                },
                {
                  title: "ARTISANAL DISHES",
                  points: ["Made daily", "No artificial flavors", "Seasonal selection"],
                },
                {
                  title: "BESPOKE AMBIANCE",
                  points: ["Monochrome design", "Quiet corners", "Vinyl music"],
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-8 border border-black hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                >
                  <h3 className="text-lg font-medium tracking-wide text-black mb-4">{card.title}</h3>
                  <ul className="space-y-2">
                    {card.points.map((point, i) => (
                      <li key={i} className="text-gray-700">
                        • {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dish */}


      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/contact"
            className="inline-block bg-white text-black px-12 py-4 text-lg tracking-wider border border-white hover:bg-black hover:text-white transition-all duration-300 font-semibold"
          >
            DISCOVER OUR SPACE
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm tracking-wide">© 2026 Food Saga</p>

          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInDelay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-delay {
          animation: fadeInDelay 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  )
}
