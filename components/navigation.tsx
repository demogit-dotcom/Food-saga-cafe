"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsMegaMenuOpen(false)
  }, [pathname])

const mainNavItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "MENU", href: "/menu" },
  { name: "EXPERIENCE", href: "/experience" },
  { name: "CONTACT", href: "/contact" },
]

  // Pages with light/white backgrounds need a dark navbar
  const needsDarkNav = pathname === "/" || pathname === "/contact"

return (
  <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen || isMegaMenuOpen || pathname === "/experience" || needsDarkNav
          ? "bg-black/90 backdrop-blur-md"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Using text instead of image to avoid file path issues */}
          <Link href="/" className="flex items-center z-10 transition-transform duration-300 hover:scale-105">
            <div
              className={`text-2xl font-bold tracking-wider ${isScrolled || isMobileMenuOpen || isMegaMenuOpen || pathname === "/experience"
                  ? "text-white"
                  : "text-white"
                }`}
            >
              Food Saga
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Main Navigation */}
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wider transition-all duration-200 hover:opacity-100 hover:transform hover:translate-y-0.5 ${pathname === item.href
                    ? "text-white opacity-100"
                    : isScrolled || isMobileMenuOpen || isMegaMenuOpen || pathname === "/experience"
                      ? "text-white opacity-60"
                      : "text-white opacity-60"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 z-10 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu
                className={`h-6 w-6 ${isScrolled || isMobileMenuOpen || isMegaMenuOpen || pathname === "/experience"
                    ? "text-white"
                    : "text-white"
                  }`}
              />
            )}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md lg:hidden overflow-y-auto">
        <div className="flex flex-col h-full pt-24 px-6 pb-8">
          {/* Main Navigation */}
          <div className="space-y-6 mb-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-2xl font-medium text-white tracking-wider hover:opacity-60 transition-opacity duration-200 py-2 touch-manipulation"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-auto pt-8 border-t border-white">
            <div className="space-y-2 text-white opacity-70">
              <p className="text-sm">Food Saga, Sardar Colony, Tarabai Park,</p>
              <p className="text-sm">Kolhapur, 416003</p>
              <p className="text-sm">+91 9765230838</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
)
}
