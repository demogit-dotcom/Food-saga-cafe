import type React from "react"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import ClientLayout from "./clientLayout"
import AssetVerificationPanel from "@/components/asset-verification-panel"
import VideoDiagnosticsPanel from "@/components/video-diagnostics-panel"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700", "900"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientLayout children={children} fontVariable={`${inter.variable} ${playfair.variable}`}>
      {children}
      <AssetVerificationPanel />
      <VideoDiagnosticsPanel />
    </ClientLayout>
  )
}
