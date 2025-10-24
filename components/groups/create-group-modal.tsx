"use client"

import { useState } from "react"
import { X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [groupType, setGroupType] = useState<"expense" | "fund">("expense")
  const [members, setMembers] = useState([{ id: 1, name: "You", email: "you@example.com" }])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-black/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-foreground">Create Group</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-light rounded-lg transition-colors">
            <X size={24} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Group Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Group Name</label>
              <input
                type="text"
                placeholder="e.g., Roommates, Vegas Trip"
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
              <textarea
                placeholder="What is this group for?"
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Group Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Group Type</label>
            <div className="grid grid-cols-2 gap-3">
              {(["expense", "fund"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setGroupType(type)}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    groupType === type
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-surface-light border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold mb-1">{type === "expense" ? "Expense Group" : "Fund Group"}</p>
                  <p className="text-xs text-muted-foreground">
                    {type === "expense" ? "Split shared expenses" : "Collect funds with voting"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Fund Settings (if Fund type) */}
          {groupType === "fund" && (
            <div className="space-y-4 p-4 rounded-lg bg-accent/5 border border-accent/30">
              <h3 className="font-semibold text-foreground">Fund Settings</h3>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Target Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Fund Manager</label>
                <select className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:border-primary">
                  <option>You</option>
                </select>
              </div>
            </div>
          )}

          {/* Members */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-foreground">Members</label>
              <button className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors">
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
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                  {member.id !== 1 && (
                    <button className="p-1 hover:bg-surface rounded transition-colors">
                      <Minus size={16} className="text-destructive" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              onClick={onClose}
              className="flex-1 bg-surface-light hover:bg-surface border border-border text-foreground"
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground">Create Group</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
