import { MoreVertical, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface BillsListProps {
  filterType: "all" | "pending" | "settled"
  searchQuery: string
}

export function BillsList({ filterType, searchQuery }: BillsListProps) {
  const bills = [
    {
      id: 1,
      title: "Dinner at Restaurant",
      description: "Split 3 ways",
      amount: "$45.50",
      yourShare: "$15.17",
      status: "settled",
      date: "Today",
      paidBy: "You",
      members: ["You", "Alex", "Jordan"],
    },
    {
      id: 2,
      title: "Movie Tickets",
      description: "Split 2 ways",
      amount: "$32.00",
      yourShare: "$16.00",
      status: "pending",
      date: "Yesterday",
      paidBy: "Sarah",
      members: ["You", "Sarah"],
    },
    {
      id: 3,
      title: "Groceries",
      description: "Split equally",
      amount: "$87.45",
      yourShare: "$21.86",
      status: "pending",
      date: "2 days ago",
      paidBy: "You",
      members: ["You", "Alex", "Jordan", "Sam"],
    },
    {
      id: 4,
      title: "Gas for Road Trip",
      description: "Split by percentage",
      amount: "$120.00",
      yourShare: "$30.00",
      status: "settled",
      date: "3 days ago",
      paidBy: "Jordan",
      members: ["You", "Alex", "Jordan", "Sam"],
    },
  ]

  const filteredBills = bills.filter((bill) => {
    const matchesFilter = filterType === "all" || bill.status === filterType
    const matchesSearch =
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "settled":
        return <CheckCircle size={18} className="text-success" />
      case "pending":
        return <Clock size={18} className="text-warning" />
      default:
        return <AlertCircle size={18} className="text-destructive" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "settled":
        return "bg-success/10 border-success/30 text-success"
      case "pending":
        return "bg-warning/10 border-warning/30 text-warning"
      default:
        return "bg-destructive/10 border-destructive/30 text-destructive"
    }
  }

  return (
    <div className="space-y-3">
      {filteredBills.length === 0 ? (
        <div className="glass rounded-xl p-12 border border-border text-center">
          <p className="text-muted-foreground">No bills found</p>
        </div>
      ) : (
        filteredBills.map((bill) => (
          <div
            key={bill.id}
            className="glass rounded-xl p-4 border border-border hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{bill.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(bill.status)}`}
                  >
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{bill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {bill.members.map((member, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg bg-surface-light border border-border text-xs text-foreground"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-primary mb-1">{bill.amount}</p>
                <p className="text-sm text-muted-foreground mb-3">Your share: {bill.yourShare}</p>
                <p className="text-xs text-muted-foreground mb-3">{bill.date}</p>
                <button className="p-2 rounded-lg hover:bg-surface-light transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
