"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BillsList } from "./bills-list"
import { CreateBillModal } from "./create-bill-modal"

export function BillsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [filterType, setFilterType] = useState<"all" | "pending" | "settled">("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bills</h1>
          <p className="text-muted-foreground">Manage and track all your expenses</p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-primary hover:bg-primary-dark text-primary-foreground flex items-center gap-2"
        >
          <Plus size={20} />
          Create Bill
        </Button>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 border border-border flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search bills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "settled"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-light border border-border text-foreground hover:border-primary/50"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bills List */}
      <BillsList filterType={filterType} searchQuery={searchQuery} />

      {/* Create Bill Modal */}
      <CreateBillModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  )
}
