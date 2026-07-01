"use client"

import { useState, useEffect } from "react"
import { MediaAssetManager, MEDIA_ASSETS } from "@/lib/media-assets"

interface AssetVerificationPanelProps {
  showInProduction?: boolean
}

export default function AssetVerificationPanel({ showInProduction = false }: AssetVerificationPanelProps) {
  const [verificationResults, setVerificationResults] = useState<{
    verified: string[]
    missing: string[]
    total: number
  } | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const assetManager = MediaAssetManager.getInstance()

  // Only show in development unless explicitly enabled for production
  const shouldShow = process.env.NODE_ENV === "development" || showInProduction

  useEffect(() => {
    if (shouldShow) {
      verifyAssets()
    }
  }, [shouldShow])

  const verifyAssets = async () => {
    setIsVerifying(true)
    try {
      const results = await assetManager.verifyAllAssets()
      setVerificationResults(results)

      // Log results for debugging
      console.group("🎯 Media Asset Verification Results")
      console.log(`✅ Verified: ${results.verified.length}/${results.total}`)
      console.log(`❌ Missing: ${results.missing.length}/${results.total}`)
      if (results.missing.length > 0) {
        console.warn("Missing assets:", results.missing)
      }
      console.groupEnd()
    } catch (error) {
      console.error("Asset verification failed:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  if (!shouldShow) return null

  return (
    <>
      {/* Floating verification button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          verificationResults?.missing.length === 0 ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
        } text-white`}
        title="Asset Verification Status"
      >
        {isVerifying ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>

      {/* Verification panel */}
      {showPanel && (
        <div className="fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-6 max-w-md w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Asset Verification</h3>
            <button onClick={() => setShowPanel(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {verificationResults && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <span
                    className={`text-sm font-semibold ${
                      verificationResults.missing.length === 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {verificationResults.verified.length}/{verificationResults.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      verificationResults.missing.length === 0 ? "bg-green-600" : "bg-red-600"
                    }`}
                    style={{
                      width: `${(verificationResults.verified.length / verificationResults.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Missing assets */}
              {verificationResults.missing.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">
                    Missing Assets ({verificationResults.missing.length})
                  </h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {verificationResults.missing.map((assetKey) => {
                      const asset = MEDIA_ASSETS[assetKey]
                      return (
                        <div key={assetKey} className="text-xs bg-red-50 p-2 rounded border-l-2 border-red-200">
                          <div className="font-medium text-red-800">{assetKey}</div>
                          <div className="text-red-600">{asset?.path}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={verifyAssets}
                  disabled={isVerifying}
                  className="flex-1 bg-black text-white px-3 py-2 text-sm rounded hover:bg-gray-800 disabled:opacity-50"
                >
                  {isVerifying ? "Verifying..." : "Re-verify"}
                </button>
                <button
                  onClick={() => assetManager.clearCache()}
                  className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 text-sm rounded hover:bg-gray-300"
                >
                  Clear Cache
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
