import { MoreVertical, MessageCircle, Send } from "lucide-react"

interface FriendsListProps {
  searchQuery: string
}

export function FriendsList({ searchQuery }: FriendsListProps) {
  const friends = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 123-4567",
      balance: "+$120.50",
      status: "settled",
      avatar: "SJ",
      lastTransaction: "2 days ago",
    },
    {
      id: 2,
      name: "Alex Kim",
      email: "alex@example.com",
      phone: "+1 (555) 234-5678",
      balance: "-$45.00",
      status: "pending",
      avatar: "AK",
      lastTransaction: "Today",
    },
    {
      id: 3,
      name: "Jordan Martinez",
      email: "jordan@example.com",
      phone: "+1 (555) 345-6789",
      balance: "+$32.75",
      status: "settled",
      avatar: "JM",
      lastTransaction: "1 week ago",
    },
    {
      id: 4,
      name: "Sam Wilson",
      email: "sam@example.com",
      phone: "+1 (555) 456-7890",
      balance: "-$120.00",
      status: "pending",
      avatar: "SW",
      lastTransaction: "3 days ago",
    },
    {
      id: 5,
      name: "Taylor Brown",
      email: "taylor@example.com",
      phone: "+1 (555) 567-8901",
      balance: "+$85.25",
      status: "settled",
      avatar: "TB",
      lastTransaction: "5 days ago",
    },
  ]

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    return status === "settled" ? "text-success" : "text-warning"
  }

  return (
    <div className="space-y-3">
      {filteredFriends.length === 0 ? (
        <div className="glass rounded-xl p-12 border border-border text-center">
          <p className="text-muted-foreground">No friends found</p>
        </div>
      ) : (
        filteredFriends.map((friend) => (
          <div
            key={friend.id}
            className="glass rounded-xl p-4 border border-border hover:border-primary/50 transition-all group"
          >
            <div className="flex items-start justify-between">
              {/* Friend Info */}
              <div className="flex gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{friend.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground mb-1">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{friend.email}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-lg bg-surface-light border border-border text-muted-foreground">
                      {friend.phone}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-lg bg-surface-light border border-border text-muted-foreground">
                      Last: {friend.lastTransaction}
                    </span>
                  </div>
                </div>
              </div>

              {/* Balance & Actions */}
              <div className="text-right ml-4">
                <p className={`text-2xl font-bold mb-3 ${getStatusColor(friend.status)}`}>{friend.balance}</p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                    <Send size={16} className="text-accent" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                    <MessageCircle size={16} className="text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                    <MoreVertical size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
