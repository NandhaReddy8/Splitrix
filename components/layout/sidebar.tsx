"use client"

import { useState } from "react"
import { LayoutDashboard, Receipt, Users, UserPlus, Vote, Settings, Shield, ChevronDown, Wallet, Menu, X, Copy, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAlgorandWallet } from "@/hooks/useAlgorandWallet"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: any) => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showWalletDetails, setShowWalletDetails] = useState(false)
  
  const { 
    activeAddress, 
    isActive, 
    isConnecting, 
    connectWallet, 
    disconnectWallet, 
    getShortAddress, 
    getWalletProvider 
  } = useAlgorandWallet()

  const handleConnectWallet = async () => {
    try {
      await connectWallet('pera') // Default to Pera Wallet
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const handleDisconnectWallet = async () => {
    try {
      await disconnectWallet()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  const copyAddress = async () => {
    if (activeAddress) {
      try {
        await navigator.clipboard.writeText(activeAddress)
        // You could add a toast notification here
        console.log('Address copied to clipboard')
      } catch (error) {
        console.error('Failed to copy address:', error)
      }
    }
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "bills", label: "Bills", icon: Receipt },
    { id: "groups", label: "Groups", icon: Users },
    { id: "friends", label: "Friends", icon: UserPlus },
    { id: "voting", label: "Voting", icon: Vote },
    { id: "admin", label: "Admin", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-surface border border-border hover:bg-surface-light transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-40 h-screen w-64 bg-surface border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <Wallet size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Splitrix</h1>
              <p className="text-xs text-muted-foreground">Web3 Expense Manager</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-foreground hover:bg-surface-light"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          {isActive ? (
            <div className="px-4 py-3 rounded-lg bg-success/10 border border-success/30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">Wallet Connected</p>
                <button 
                  onClick={() => setShowWalletDetails(!showWalletDetails)}
                  className="p-1 hover:bg-surface rounded transition-colors"
                >
                  <ChevronDown size={16} className={`transition-transform ${showWalletDetails ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold text-success">{getWalletProvider()}</p>
                <p className="text-xs font-mono text-foreground">{getShortAddress(activeAddress)}</p>
                
                {showWalletDetails && (
                  <div className="space-y-2 pt-2 border-t border-success/20">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={copyAddress}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Copy size={12} />
                        Copy Address
                      </button>
                    </div>
                    <Button 
                      onClick={handleDisconnectWallet}
                      size="sm"
                      className="w-full bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/30"
                    >
                      Disconnect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 rounded-lg bg-surface-light border border-border">
              <p className="text-xs text-muted-foreground mb-2">Wallet Status</p>
              <p className="text-sm font-semibold text-muted-foreground">Not Connected</p>
              <Button 
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="w-full mt-3 bg-primary hover:bg-primary-dark text-primary-foreground disabled:opacity-50"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Wallet size={16} />
                    Connect Wallet
                  </div>
                )}
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
