/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Hostinger static hosting
  output: 'export',

  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Turbopack configuration for Next.js 16
  turbopack: {},

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
