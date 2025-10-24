"use client"

import { useState, useRef, useEffect } from "react"
import { X, QrCode, Camera, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddFriendModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddFriendModal({ isOpen, onClose }: AddFriendModalProps) {
  const [method, setMethod] = useState<"email" | "phone" | "qr">("email")
  const [scannedData, setScannedData] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scannedSuccessfully, setScannedSuccessfully] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (method === "qr" && isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => stopCamera()
  }, [method, isOpen])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const handleScan = () => {
    // Mock QR code scanning - in real implementation, use a QR scanner library
    const mockScannedAddress = "ALGORAND_WALLET_ADDRESS_SCANNED_1234567890"
    setScannedData(mockScannedAddress)
    setScannedSuccessfully(true)
    stopCamera()
  }

  const handleAddFriend = () => {
    if (method === "qr" && scannedData) {
      console.log("Adding friend with scanned address:", scannedData)
    } else {
      console.log("Adding friend via", method)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-xl border border-border w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Add Friend</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-light rounded-lg transition-colors">
            <X size={24} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Method Selection */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Add by</label>
            <div className="grid grid-cols-3 gap-2">
              {(["email", "phone", "qr"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    method === m
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-light border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {m === "qr" ? "QR Code" : m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          {method === "email" && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <input
                type="email"
                placeholder="friend@example.com"
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
          )}

          {method === "phone" && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
          )}

          {method === "qr" && (
            <div className="space-y-4">
              {!scannedSuccessfully ? (
                <>
                  <div className="relative p-4 rounded-lg bg-surface-light border border-border">
                    <div className="aspect-square bg-black rounded-lg overflow-hidden relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      {isScanning && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 border-2 border-primary rounded-lg bg-transparent">
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Position QR code within the frame</p>
                      <Button 
                        onClick={handleScan}
                        className="bg-primary hover:bg-primary-dark text-primary-foreground"
                      >
                        <Camera size={18} className="mr-2" />
                        Scan QR Code
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-success/20">
                      <Check size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-success">QR Code Scanned Successfully!</p>
                      <p className="text-xs text-muted-foreground">Friend's wallet address detected</p>
                    </div>
                  </div>
                  <div className="p-3 rounded bg-surface-light border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Scanned Address:</p>
                    <p className="text-sm font-mono text-foreground break-all">{scannedData}</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setScannedSuccessfully(false)
                      setScannedData("")
                      startCamera()
                    }}
                    className="w-full mt-3 bg-surface-light hover:bg-surface border border-border text-foreground"
                  >
                    Scan Again
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              onClick={onClose}
              className="flex-1 bg-surface-light hover:bg-surface border border-border text-foreground"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddFriend}
              disabled={method === "qr" && !scannedSuccessfully}
              className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Friend
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
