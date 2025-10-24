import { Users, TrendingUp, Settings } from "lucide-react"

interface GroupsListProps {
  searchQuery: string
}

export function GroupsList({ searchQuery }: GroupsListProps) {
  const groups = [
    {
      id: 1,
      name: "Roommates",
      description: "Shared apartment expenses",
      members: 3,
      totalBalance: "$450.75",
      yourBalance: "+$120.50",
      fundManager: "Sarah Johnson",
      fundAmount: "$0.00",
      type: "expense",
    },
    {
      id: 2,
      name: "Vegas Trip 2024",
      description: "Group fund for vacation",
      members: 5,
      totalBalance: "$2,340.00",
      yourBalance: "-$45.00",
      fundManager: "Alex Kim",
      fundAmount: "$1,200.00",
      type: "fund",
    },
    {
      id: 3,
      name: "Office Lunch Club",
      description: "Weekly lunch expenses",
      members: 8,
      totalBalance: "$890.50",
      yourBalance: "+$32.75",
      fundManager: "Jordan Martinez",
      fundAmount: "$0.00",
      type: "expense",
    },
    {
      id: 4,
      name: "Project Budget",
      description: "Shared project expenses",
      members: 4,
      totalBalance: "$1,560.00",
      yourBalance: "-$120.00",
      fundManager: "Sam Wilson",
      fundAmount: "$500.00",
      type: "fund",
    },
  ]

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredGroups.length === 0 ? (
        <div className="md:col-span-2 glass rounded-xl p-12 border border-border text-center">
          <p className="text-muted-foreground">No groups found</p>
        </div>
      ) : (
        filteredGroups.map((group) => (
          <div
            key={group.id}
            className="glass rounded-xl p-6 border border-border hover:border-primary/50 transition-all cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">{group.name}</h3>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-surface-light transition-colors opacity-0 group-hover:opacity-100">
                <Settings size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Members */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
              <Users size={16} className="text-accent" />
              <span className="text-sm text-muted-foreground">{group.members} members</span>
            </div>

            {/* Balances */}
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Balance</p>
                <p className="text-xl font-bold text-primary">{group.totalBalance}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Your Balance</p>
                <p
                  className={`text-lg font-bold ${group.yourBalance.startsWith("+") ? "text-success" : "text-warning"}`}
                >
                  {group.yourBalance}
                </p>
              </div>
            </div>

            {/* Fund Info */}
            {group.type === "fund" && (
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/30 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-accent" />
                  <p className="text-xs font-semibold text-accent">Group Fund</p>
                </div>
                <p className="text-sm font-bold text-foreground mb-1">{group.fundAmount}</p>
                <p className="text-xs text-muted-foreground">Managed by {group.fundManager}</p>
              </div>
            )}

            {/* Manager Info */}
            <div className="p-3 rounded-lg bg-surface-light border border-border">
              <p className="text-xs text-muted-foreground mb-1">Group Manager</p>
              <p className="text-sm font-semibold text-foreground">{group.fundManager}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
