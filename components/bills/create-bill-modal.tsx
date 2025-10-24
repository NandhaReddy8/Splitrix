"use client"

import { useState } from "react"
import { X, Plus, Minus, Wallet, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAlgorandWallet } from "@/hooks/useAlgorandWallet"
import { BillSplittingService, BillParticipant } from "@/services/billSplittingService"

interface CreateBillModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateBillModal({ isOpen, onClose }: CreateBillModalProps) {
  const [splitType, setSplitType] = useState<"equal" | "custom" | "percentage" | "itemized">("equal")
  const [members, setMembers] = useState([
    { id: 1, name: "You", amount: 0, address: "" },
    { id: 2, name: "Alex", amount: 0, address: "" },
  ])
  const [billData, setBillData] = useState({
    title: "",
    totalAmount: 0,
    category: "Food & Dining",
    description: "",
    paidBy: "You"
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionResult, setTransactionResult] = useState<any>(null)
  
  const { activeAddress, isActive, signer } = useAlgorandWallet()
  const billService = new BillSplittingService('testnet')

  const handleCreateBill = async () => {
    if (!isActive || !signer || !activeAddress) {
      alert('Please connect your wallet first')
      return
    }

    if (billData.totalAmount <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setIsProcessing(true)
    try {
      // Convert members to BillParticipant format
      const participants: BillParticipant[] = members.map(member => ({
        address: member.address || activeAddress, // Use current user's address if no address provided
        name: member.name,
        amount: member.amount,
        paid: false
      }))

      const result = await billService.splitBill(
        billData.totalAmount,
        participants,
        activeAddress,
        signer,
        `Bill: ${billData.title}`
      )

      setTransactionResult(result)
      
      if (result.success) {
        console.log('Bill created successfully:', result.transactionIds)
        // Here you would typically save to your database
      } else {
        console.error('Failed to create bill:', result.error)
      }
    } catch (error) {
      console.error('Error creating bill:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const addMember = () => {
    const newId = Math.max(...members.map(m => m.id)) + 1
    setMembers([...members, { id: newId, name: "", amount: 0, address: "" }])
  }

  const removeMember = (id: number) => {
    if (members.length > 1) {
      setMembers(members.filter(m => m.id !== id))
    }
  }

  const updateMember = (id: number, field: string, value: string | number) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-black/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-foreground">Create Bill</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-light rounded-lg transition-colors">
            <X size={24} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Bill Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Bill Title</label>
              <input
                type="text"
                placeholder="e.g., Dinner at Restaurant"
                value={billData.title}
                onChange={(e) => setBillData({...billData, title: e.target.value})}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Total Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">ALGO</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={billData.totalAmount}
                    onChange={(e) => setBillData({...billData, totalAmount: parseFloat(e.target.value) || 0})}
                    className="w-full pl-12 pr-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                <select 
                  value={billData.category}
                  onChange={(e) => setBillData({...billData, category: e.target.value})}
                  className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                >
                  <option>Food & Dining</option>
                  <option>Entertainment</option>
                  <option>Travel</option>
                  <option>Utilities</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
              <textarea
                placeholder="Add notes about this bill..."
                value={billData.description}
                onChange={(e) => setBillData({...billData, description: e.target.value})}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Split Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Split Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(["equal", "custom", "percentage", "itemized"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSplitType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    splitType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-light border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Members */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-foreground">Members</label>
              <button 
                onClick={addMember}
                className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors"
              >
                <Plus size={16} />
                <span className="text-sm">Add Member</span>
              </button>
            </div>
            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 bg-surface-light border border-border rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Member name"
                      value={member.name}
                      onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                      className="w-full px-3 py-1 bg-surface border border-border rounded text-foreground text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="Algorand address (optional)"
                      value={member.address}
                      onChange={(e) => updateMember(member.id, 'address', e.target.value)}
                      className="w-full px-3 py-1 bg-surface border border-border rounded text-foreground text-sm focus:outline-none focus:border-primary font-mono"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">ALGO</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={member.amount}
                      onChange={(e) => updateMember(member.id, 'amount', parseFloat(e.target.value) || 0)}
                      className="w-24 pr-8 pl-2 py-1 bg-surface border border-border rounded text-foreground text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  {member.id !== 1 && (
                    <button 
                      onClick={() => removeMember(member.id)}
                      className="p-1 hover:bg-surface rounded transition-colors"
                    >
                      <Minus size={16} className="text-destructive" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Paid By */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Paid By</label>
            <select className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:border-primary">
              <option>You</option>
              <option>Alex</option>
              <option>Jordan</option>
              <option>Sarah</option>
            </select>
          </div>

          {/* Wallet Status */}
          {!isActive && (
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-warning" />
                <p className="text-sm text-warning">Please connect your wallet to create bills</p>
              </div>
            </div>
          )}

          {/* Transaction Result */}
          {transactionResult && (
            <div className={`p-4 rounded-lg border ${
              transactionResult.success 
                ? 'bg-success/10 border-success/30' 
                : 'bg-destructive/10 border-destructive/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {transactionResult.success ? (
                  <CheckCircle size={16} className="text-success" />
                ) : (
                  <AlertCircle size={16} className="text-destructive" />
                )}
                <p className={`text-sm font-semibold ${
                  transactionResult.success ? 'text-success' : 'text-destructive'
                }`}>
                  {transactionResult.success ? 'Bill Created Successfully!' : 'Transaction Failed'}
                </p>
              </div>
              {transactionResult.success && transactionResult.transactionIds.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Transaction IDs:</p>
                  {transactionResult.transactionIds.map((txId: string, index: number) => (
                    <p key={index} className="text-xs font-mono text-foreground">{txId}</p>
                  ))}
                </div>
              )}
              {transactionResult.error && (
                <p className="text-xs text-destructive">{transactionResult.error}</p>
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
              onClick={handleCreateBill}
              disabled={!isActive || isProcessing}
              className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Wallet size={16} />
                  Create Bill
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
