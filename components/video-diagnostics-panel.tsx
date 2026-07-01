"use client"

import { useState, useEffect } from "react"
import { VideoAssetManager } from "@/lib/video-asset-manager"

interface VideoDiagnosticsPanelProps {
  showInProduction?: boolean
}

export default function VideoDiagnosticsPanel({ showInProduction = false }: VideoDiagnosticsPanelProps) {
  const [diagnosticsResults, setDiagnosticsResults] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(false)

  const assetManager = VideoAssetManager.getInstance()

  // Only show in development unless explicitly enabled for production
  const shouldShow = process.env.NODE_ENV === "development" || showInProduction

  useEffect(() => {
    if (shouldShow) {
      runDiagnostics()
    }
  }, [shouldShow])

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh && shouldShow) {
      const interval = setInterval(() => {
        runDiagnostics()
      }, 30000) // Refresh every 30 seconds

      return () => clearInterval(interval)
    }
  }, [autoRefresh, shouldShow])

  const runDiagnostics = async () => {
    setIsRunning(true)
    try {
      const results = await assetManager.verifyAllVideos()
      setDiagnosticsResults(results)

      // Log results for debugging
      console.group("🎬 Video Asset Diagnostics")
      console.log(`✅ Working: ${results.working.length}/${results.total}`)
      console.log(`❌ Broken: ${results.broken.length}/${results.total}`)
      console.log(`📊 Success Rate: ${results.summary.successRate.toFixed(1)}%`)
      console.log(`📦 Total Size: ${formatBytes(results.summary.totalSize)}`)
      console.log(`⏱️ Avg Load Time: ${results.summary.averageLoadTime.toFixed(0)}ms`)

      if (results.broken.length > 0) {
        console.warn(
          "Broken videos:",
          results.broken.map((v) => ({ key: v.key, error: v.error })),
        )
      }
      console.groupEnd()
    } catch (error) {
      console.error("Video diagnostics failed:", error)
    } finally {
      setIsRunning(false)
    }
  }

  const retryFailedVideos = async () => {
    setIsRunning(true)
    try {
      const retryResults = await assetManager.retryFailedVideos()
      console.log("Retry results:", retryResults)

      // Refresh diagnostics after retry
      await runDiagnostics()
    } catch (error) {
      console.error("Retry failed:", error)
    } finally {
      setIsRunning(false)
    }
  }

  const downloadReport = () => {
    const report = assetManager.generateDeploymentReport()
    const blob = new Blob([report], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `video-diagnostics-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusColor = (successRate: number): string => {
    if (successRate >= 90) return "text-green-600"
    if (successRate >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  if (!shouldShow) return null

  return (
    <>
      {/* Floating diagnostics button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className={`fixed bottom-20 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          diagnosticsResults?.summary.successRate >= 90
            ? "bg-green-600 hover:bg-green-700"
            : diagnosticsResults?.summary.successRate >= 70
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-red-600 hover:bg-red-700"
        } text-white`}
        title="Video Diagnostics"
      >
        {isRunning ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>

      {/* Diagnostics panel */}
      {showPanel && (
        <div className="fixed bottom-36 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-6 max-w-lg w-96 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Video Diagnostics</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`text-xs px-2 py-1 rounded ${
                  autoRefresh ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                }`}
              >
                Auto-refresh
              </button>
              <button onClick={() => setShowPanel(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {diagnosticsResults && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className={`ml-2 font-semibold ${getStatusColor(diagnosticsResults.summary.successRate)}`}>
                      {diagnosticsResults.working.length}/{diagnosticsResults.total}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Success Rate:</span>
                    <span className={`ml-2 font-semibold ${getStatusColor(diagnosticsResults.summary.successRate)}`}>
                      {diagnosticsResults.summary.successRate.toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Size:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {formatBytes(diagnosticsResults.summary.totalSize)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg Load:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {diagnosticsResults.summary.averageLoadTime.toFixed(0)}ms
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        diagnosticsResults.summary.successRate >= 90
                          ? "bg-green-600"
                          : diagnosticsResults.summary.successRate >= 70
                            ? "bg-yellow-600"
                            : "bg-red-600"
                      }`}
                      style={{ width: `${diagnosticsResults.summary.successRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Broken videos */}
              {diagnosticsResults.broken.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">
                    Issues Found ({diagnosticsResults.broken.length})
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {diagnosticsResults.broken.map((video: any) => (
                      <div key={video.key} className="text-xs bg-red-50 p-2 rounded border-l-2 border-red-200">
                        <div className="font-medium text-red-800">{video.key}</div>
                        <div className="text-red-600 truncate">{video.error}</div>
                        <div className="text-red-500 text-xs mt-1">{video.path}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Working videos summary */}
              {diagnosticsResults.working.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">
                    Working Videos ({diagnosticsResults.working.length})
                  </h4>
                  <div className="text-xs text-gray-600">All videos are loading and playing correctly.</div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={runDiagnostics}
                  disabled={isRunning}
                  className="flex-1 bg-black text-white px-3 py-2 text-sm rounded hover:bg-gray-800 disabled:opacity-50"
                >
                  {isRunning ? "Running..." : "Re-scan"}
                </button>

                {diagnosticsResults.broken.length > 0 && (
                  <button
                    onClick={retryFailedVideos}
                    disabled={isRunning}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Retry Failed
                  </button>
                )}

                <button
                  onClick={downloadReport}
                  className="bg-gray-200 text-gray-800 px-3 py-2 text-sm rounded hover:bg-gray-300"
                >
                  📄 Report
                </button>

                <button
                  onClick={() => assetManager.clearCache()}
                  className="bg-gray-200 text-gray-800 px-3 py-2 text-sm rounded hover:bg-gray-300"
                >
                  🗑️ Clear
                </button>
              </div>

              {/* Deployment tips */}
              {diagnosticsResults.broken.length > 0 && (
                <div className="bg-blue-50 p-3 rounded text-xs">
                  <div className="font-medium text-blue-800 mb-1">Deployment Tips:</div>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Ensure videos are in public/videos/ directory</li>
                    <li>• Check video file formats (MP4 H.264 recommended)</li>
                    <li>• Verify files are included in build output</li>
                    <li>• Test on different browsers and devices</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}
