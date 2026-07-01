import fs from "fs"
import path from "path"
import { VIDEO_ASSETS } from "../lib/video-asset-manager"

interface VideoFileInfo {
  path: string
  exists: boolean
  size: number
  extension: string
  isValidFormat: boolean
}

async function verifyVideoAssets(): Promise<void> {
  console.log("🎬 Verifying video assets for deployment...\n")

  const publicDir = path.join(process.cwd(), "public")
  const videoResults: VideoFileInfo[] = []
  let missingCount = 0
  let totalSize = 0
  let invalidFormatCount = 0

  const validFormats = [".mp4", ".webm", ".mov"]

  for (const [key, asset] of Object.entries(VIDEO_ASSETS)) {
    const fullPath = path.join(publicDir, asset.path.replace(/^\//, ""))
    const exists = fs.existsSync(fullPath)
    const extension = path.extname(asset.path).toLowerCase()
    const isValidFormat = validFormats.includes(extension)

    let size = 0
    if (exists) {
      try {
        const stats = fs.statSync(fullPath)
        size = stats.size
        totalSize += size
      } catch (error) {
        console.warn(`⚠️  Could not get size for ${asset.path}`)
      }
    } else {
      missingCount++
    }

    if (!isValidFormat) {
      invalidFormatCount++
    }

    videoResults.push({
      path: asset.path,
      exists,
      size,
      extension,
      isValidFormat,
    })

    // Log individual results
    const status = exists ? "✅" : "❌"
    const formatStatus = isValidFormat ? "" : " ⚠️ Format"
    const sizeStr = size > 0 ? `(${formatBytes(size)})` : ""
    console.log(`${status} ${asset.path} ${sizeStr}${formatStatus}`)
  }

  // Summary
  console.log("\n📊 Video Verification Summary:")
  console.log(`Total videos: ${videoResults.length}`)
  console.log(`Found: ${videoResults.length - missingCount}`)
  console.log(`Missing: ${missingCount}`)
  console.log(`Invalid format: ${invalidFormatCount}`)
  console.log(`Total size: ${formatBytes(totalSize)}`)

  // Check for large files
  const largeFiles = videoResults.filter((v) => v.size > 50 * 1024 * 1024) // > 50MB
  if (largeFiles.length > 0) {
    console.log("\n⚠️  Large video files detected (>50MB):")
    largeFiles.forEach((file) => {
      console.log(`   - ${file.path}: ${formatBytes(file.size)}`)
    })
    console.log("   Consider compressing these files for better performance.")
  }

  // Missing videos details
  if (missingCount > 0) {
    console.log("\n❌ Missing Videos:")
    videoResults.filter((v) => !v.exists).forEach((v) => console.log(`   - ${v.path}`))
  }

  // Invalid format details
  if (invalidFormatCount > 0) {
    console.log("\n⚠️  Invalid Video Formats:")
    videoResults
      .filter((v) => !v.isValidFormat)
      .forEach((v) => {
        console.log(`   - ${v.path}: ${v.extension} (recommended: .mp4)`)
      })
  }

  // Recommendations
  console.log("\n💡 Recommendations:")
  console.log("   - Use MP4 format with H.264 codec for best compatibility")
  console.log("   - Keep video files under 50MB for optimal loading")
  console.log("   - Consider WebM format as fallback for modern browsers")
  console.log("   - Test video playback on different devices and browsers")

  // Generate deployment manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    verification: {
      total: videoResults.length,
      found: videoResults.length - missingCount,
      missing: missingCount,
      invalidFormat: invalidFormatCount,
      totalSize: totalSize,
      largeFiles: largeFiles.length,
    },
    videos: videoResults,
    missingVideos: videoResults.filter((v) => !v.exists).map((v) => v.path),
    largeVideos: largeFiles.map((v) => ({ path: v.path, size: v.size })),
    recommendations: [
      "Ensure all video files are in MP4 format with H.264 codec",
      "Compress large video files (>50MB) for better performance",
      "Test video playback across different browsers and devices",
      "Consider adding poster images for better loading experience",
      "Implement fallback mechanisms for video loading failures",
    ],
  }

  const manifestPath = path.join(publicDir, "video-deployment-manifest.json")
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`\n📄 Video deployment manifest saved to: ${manifestPath}`)

  // Exit with error if critical issues found
  if (missingCount > 0 && process.env.NODE_ENV === "production") {
    console.error("\n🚨 Build failed: Missing required video assets in production build")
    process.exit(1)
  }

  if (missingCount === 0 && invalidFormatCount === 0) {
    console.log("\n✅ All video assets verified successfully!")
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Run verification
verifyVideoAssets().catch(console.error)
