import { ArrowDown, ArrowUp, User } from 'lucide-react'

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      type: "expense",
      description: "Dinner at Restaurant",
      amount: "$45.50",
      user: "You paid",
      date: "Today",
      avatar: "JD",
    },
    {
      id: 2,
      type: "settlement",
      description: "Settled with Alex",
      amount: "$120.00",
      user: "You received",
      date: "Yesterday",
      avatar: "AK",
    },
    {
      id: 3,
      type: "expense",
      description: "Movie tickets",
      amount: "$32.00",
      user: "You paid",
      date: "2 days ago",
      avatar: "SM",
    },
    {
      id: 4,
      type: "settlement",
      description: "Settled with Jordan",
      amount: "$85.75",
      user: "You paid",
      date: "3 days ago",
      avatar: "JM",
    },
  ]

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <h3 className="text-lg font-bold text-foreground mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 rounded-lg bg-surface-light border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{tx.avatar}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.user}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-foreground">{tx.amount}</p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
