import fs from "fs"
import path from "path"
import { MEDIA_ASSETS } from "../lib/media-assets"

interface VerificationResult {
  path: string
  exists: boolean
  size?: number
  type: "image" | "video"
}

async function verifyBuildAssets(): Promise<void> {
  console.log("🔍 Verifying media assets for deployment...\n")

  const publicDir = path.join(process.cwd(), "public")
  const results: VerificationResult[] = []
  let missingCount = 0
  let totalSize = 0

  for (const [key, asset] of Object.entries(MEDIA_ASSETS)) {
    const fullPath = path.join(publicDir, asset.path.replace(/^\//, ""))
    const exists = fs.existsSync(fullPath)

    let size: number | undefined
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

    results.push({
      path: asset.path,
      exists,
      size,
      type: asset.type,
    })

    // Log individual results
    const status = exists ? "✅" : "❌"
    const sizeStr = size ? `(${formatBytes(size)})` : ""
    console.log(`${status} ${asset.path} ${sizeStr}`)
  }

  // Summary
  console.log("\n📊 Verification Summary:")
  console.log(`Total assets: ${results.length}`)
  console.log(`Found: ${results.length - missingCount}`)
  console.log(`Missing: ${missingCount}`)
  console.log(`Total size: ${formatBytes(totalSize)}`)

  // Missing assets details
  if (missingCount > 0) {
    console.log("\n❌ Missing Assets:")
    results.filter((r) => !r.exists).forEach((r) => console.log(`   - ${r.path}`))

    console.log("\n⚠️  Warning: Some assets are missing. This may cause broken images/videos in production.")
    console.log("   Make sure all media files are properly placed in the public directory.")
  } else {
    console.log("\n✅ All assets verified successfully!")
  }

  // Generate deployment manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    verification: {
      total: results.length,
      found: results.length - missingCount,
      missing: missingCount,
      totalSize: totalSize,
    },
    assets: results,
    missingAssets: results.filter((r) => !r.exists).map((r) => r.path),
  }

  const manifestPath = path.join(publicDir, "deployment-manifest.json")
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`\n📄 Deployment manifest saved to: ${manifestPath}`)

  // Exit with error if assets are missing and this is a production build
  if (missingCount > 0 && process.env.NODE_ENV === "production") {
    console.error("\n🚨 Build failed: Missing required assets in production build")
    process.exit(1)
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
verifyBuildAssets().catch(console.error)
