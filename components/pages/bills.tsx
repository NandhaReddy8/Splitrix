"use client"

import { useState } from "react"
import { Plus, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BillCard } from "@/components/bills/bill-card"
import { CreateBillModal } from "@/components/bills/create-bill-modal"

export function BillsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [bills] = useState([
    {
      id: 1,
      title: "Dinner at Restaurant",
      amount: 120.0,
      date: "2024-01-15",
      participants: 4,
      status: "pending",
      splitType: "equal",
      yourShare: 30.0,
    },
    {
      id: 2,
      title: "Movie Tickets",
      amount: 60.0,
      date: "2024-01-14",
      participants: 3,
      status: "settled",
      splitType: "equal",
      yourShare: 20.0,
    },
    {
      id: 3,
      title: "Groceries",
      amount: 85.5,
      date: "2024-01-13",
      participants: 2,
      status: "pending",
      splitType: "custom",
      yourShare: 45.0,
    },
  ])

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Bills</h1>
          <p className="text-foreground-muted mt-1">Manage and track all your expenses</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-primary-foreground hover:bg-primary-dark w-full md:w-auto"
        >
          <Plus size={20} />
          Create Bill
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
          <input
            type="text"
            placeholder="Search bills..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface border border-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary"
          />
        </div>
        <Button variant="outline" className="border-border hover:bg-surface-light bg-transparent">
          <Filter size={18} />
          Filter
        </Button>
      </div>

      {/* Bills List */}
      <div className="space-y-3">
        {bills.map((bill) => (
          <BillCard key={bill.id} bill={bill} />
        ))}
      </div>

      {/* Create Bill Modal */}
      {showCreateModal && <CreateBillModal onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}
