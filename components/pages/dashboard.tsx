"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Plus, Eye, EyeOff, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BalanceCard } from "@/components/dashboard/balance-card"
import { DustPoolWidget } from "@/components/dashboard/dust-pool-widget"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { CreateBillModal } from "@/components/bills/create-bill-modal"

export function Dashboard() {
  const [showBalance, setShowBalance] = useState(true)
  const [isCreateBillOpen, setIsCreateBillOpen] = useState(false)
  const [balanceData] = useState({
    totalBalance: 2847.5,
    youOwe: 342.0,
    youAreOwed: 156.75,
    dustPool: 89.25,
  })

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-foreground-muted mt-1">Welcome back! Here's your expense overview.</p>
        </div>
        <Button 
          onClick={() => setIsCreateBillOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary-dark w-full md:w-auto"
        >
          <Plus size={20} />
          New Bill
        </Button>
      </div>

      {/* Balance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BalanceCard
          title="Total Balance"
          amount={balanceData.totalBalance}
          icon={TrendingUp}
          color="primary"
          showBalance={showBalance}
        />
        <BalanceCard
          title="You Owe"
          amount={balanceData.youOwe}
          icon={ArrowUpRight}
          color="destructive"
          showBalance={showBalance}
        />
        <BalanceCard
          title="You Are Owed"
          amount={balanceData.youAreOwed}
          icon={ArrowDownLeft}
          color="accent"
          showBalance={showBalance}
        />
        <BalanceCard
          title="Dust Pool"
          amount={balanceData.dustPool}
          icon={TrendingDown}
          color="secondary"
          showBalance={showBalance}
        />
      </div>

      {/* Toggle Balance Visibility */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBalance(!showBalance)}
          className="border-border hover:bg-surface-light"
        >
          {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
          <span className="ml-2">{showBalance ? "Hide" : "Show"} Balance</span>
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Transactions & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <RecentTransactions />
          <QuickActions />
        </div>

        {/* Right Column - Dust Pool */}
        <div>
          <DustPoolWidget />
        </div>
      </div>

      {/* Create Bill Modal */}
      <CreateBillModal isOpen={isCreateBillOpen} onClose={() => setIsCreateBillOpen(false)} />
    </div>
  )
}
