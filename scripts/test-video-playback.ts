import { VIDEO_ASSETS } from "../lib/video-asset-manager"

interface PlaybackTestResult {
  videoKey: string
  path: string
  canFetch: boolean
  responseTime: number
  fileSize?: number
  contentType?: string
  error?: string
}

async function testVideoPlayback(): Promise<void> {
  console.log("🧪 Testing video playback capabilities...\n")

  const results: PlaybackTestResult[] = []
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  for (const [key, asset] of Object.entries(VIDEO_ASSETS)) {
    const startTime = Date.now()
    const fullUrl = `${baseUrl}${asset.path}`

    try {
      console.log(`Testing: ${key}...`)

      const response = await fetch(fullUrl, { method: "HEAD" })
      const responseTime = Date.now() - startTime

      const result: PlaybackTestResult = {
        videoKey: key,
        path: asset.path,
        canFetch: response.ok,
        responseTime,
      }

      if (response.ok) {
        const contentLength = response.headers.get("content-length")
        const contentType = response.headers.get("content-type")

        result.fileSize = contentLength ? Number.parseInt(contentLength, 10) : undefined
        result.contentType = contentType || undefined

        console.log(`  ✅ ${key}: ${responseTime}ms, ${formatBytes(result.fileSize || 0)}, ${contentType}`)
      } else {
        result.error = `HTTP ${response.status}: ${response.statusText}`
        console.log(`  ❌ ${key}: ${result.error}`)
      }

      results.push(result)
    } catch (error) {
      const responseTime = Date.now() - startTime
      const result: PlaybackTestResult = {
        videoKey: key,
        path: asset.path,
        canFetch: false,
        responseTime,
        error: error instanceof Error ? error.message : "Unknown error",
      }

      results.push(result)
      console.log(`  ❌ ${key}: ${result.error}`)
    }
  }

  // Summary
  const successful = results.filter((r) => r.canFetch)
  const failed = results.filter((r) => !r.canFetch)
  const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length
  const totalSize = successful.reduce((sum, r) => sum + (r.fileSize || 0), 0)

  console.log("\n📊 Playback Test Summary:")
  console.log(`Total videos tested: ${results.length}`)
  console.log(`Successful: ${successful.length}`)
  console.log(`Failed: ${failed.length}`)
  console.log(`Success rate: ${((successful.length / results.length) * 100).toFixed(1)}%`)
  console.log(`Average response time: ${avgResponseTime.toFixed(0)}ms`)
  console.log(`Total video size: ${formatBytes(totalSize)}`)

  if (failed.length > 0) {
    console.log("\n❌ Failed Videos:")
    failed.forEach((result) => {
      console.log(`   - ${result.videoKey}: ${result.error}`)
    })
  }

  // Performance analysis
  const slowVideos = successful.filter((r) => r.responseTime > 1000)
  if (slowVideos.length > 0) {
    console.log("\n⚠️  Slow Loading Videos (>1s):")
    slowVideos.forEach((result) => {
      console.log(`   - ${result.videoKey}: ${result.responseTime}ms`)
    })
  }

  // Content type analysis
  const contentTypes = successful.reduce(
    (acc, r) => {
      const type = r.contentType || "unknown"
      acc[type] = (acc[type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  console.log("\n📋 Content Types:")
  Object.entries(contentTypes).forEach(([type, count]) => {
    console.log(`   - ${type}: ${count} videos`)
  })

  // Recommendations
  console.log("\n💡 Recommendations:")
  if (failed.length > 0) {
    console.log("   - Fix failed video URLs or file paths")
  }
  if (slowVideos.length > 0) {
    console.log("   - Consider compressing slow-loading videos")
  }
  if (totalSize > 500 * 1024 * 1024) {
    // > 500MB
    console.log("   - Total video size is large, consider CDN or compression")
  }
  console.log("   - Test on different networks and devices")
  console.log("   - Implement progressive loading for large videos")

  // Generate test report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl,
    summary: {
      total: results.length,
      successful: successful.length,
      failed: failed.length,
      successRate: (successful.length / results.length) * 100,
      avgResponseTime,
      totalSize,
    },
    results,
    contentTypes,
    recommendations: [
      "Ensure all video files are accessible via HTTP",
      "Optimize video compression for web delivery",
      "Test video playback across different browsers",
      "Consider implementing video streaming for large files",
      "Add proper MIME type configuration on server",
    ],
  }

  // Save report
  const fs = await import("fs")
  const path = await import("path")
  const reportPath = path.join(process.cwd(), "public", "video-playback-test.json")
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\n📄 Test report saved to: ${reportPath}`)
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Run test
testVideoPlayback().catch(console.error)
