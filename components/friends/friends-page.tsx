"use client"

import { useState } from "react"
import { Plus, Search, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FriendsList } from "./friends-list"
import { AddFriendModal } from "./add-friend-modal"
import { QrCodeModal } from "./qr-code-modal"

export function FriendsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isQrOpen, setIsQrOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Friends</h1>
          <p className="text-muted-foreground">Manage your contacts and connections</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsQrOpen(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2"
          >
            <QrCode size={20} />
            My QR Code
          </Button>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="bg-primary hover:bg-primary-dark text-primary-foreground flex items-center gap-2"
          >
            <Plus size={20} />
            Add Friend
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="glass rounded-xl p-4 border border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Friends List */}
      <FriendsList searchQuery={searchQuery} />

      {/* Modals */}
      <AddFriendModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <QrCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  )
}
