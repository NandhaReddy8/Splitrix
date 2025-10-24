"use client"

import { useState, useEffect } from "react"
import { X, Download, Copy, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QrCodeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QrCodeModal({ isOpen, onClose }: QrCodeModalProps) {
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Generate a mock wallet address for demo
      const mockWalletAddress = "ALGORAND_WALLET_ADDRESS_1234567890ABCDEF"
      setQrData(mockWalletAddress)
    }
  }, [isOpen])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleDownload = () => {
    // In a real implementation, this would generate and download a QR code image
    console.log("Download QR code for:", qrData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-xl border border-border w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Your QR Code</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-light rounded-lg transition-colors">
            <X size={24} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* QR Code Display */}
          <div className="p-8 rounded-lg bg-white flex items-center justify-center">
            <div className="w-48 h-48 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Mock QR Code Pattern */}
              <div className="absolute inset-4 bg-white rounded-lg p-2">
                <div className="w-full h-full bg-black rounded grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-center text-white">
                <p className="text-xs font-semibold">QR Code</p>
                <p className="text-xs opacity-80">Scan to add friend</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 rounded-lg bg-surface-light border border-border">
            <p className="text-xs text-muted-foreground mb-2">Your Profile</p>
            <p className="text-lg font-bold text-foreground mb-1">You</p>
            <p className="text-sm text-muted-foreground">you@example.com</p>
            <p className="text-xs text-muted-foreground mt-2 font-mono break-all">
              {qrData}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              onClick={handleCopy}
              className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground flex items-center justify-center gap-2"
            >
              <Copy size={18} />
              {copied ? "Copied!" : "Copy Address"}
            </Button>
            <Button 
              onClick={handleDownload}
              className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download
            </Button>
          </div>

          {/* Close */}
          <Button
            onClick={onClose}
            className="w-full bg-surface-light hover:bg-surface border border-border text-foreground"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
