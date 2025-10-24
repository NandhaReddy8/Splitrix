"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Dashboard } from "@/components/pages/dashboard"
import { BillsPage } from "@/components/bills/bills-page"
import { GroupsPage } from "@/components/groups/groups-page"
import { FriendsPage } from "@/components/friends/friends-page"
import { VotingPage } from "@/components/voting/voting-page"
import { AdminPage } from "@/components/admin/admin-page"
import { SettingsPage } from "@/components/settings/settings-page"

type PageType = "dashboard" | "bills" | "groups" | "friends" | "voting" | "admin" | "settings"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "bills":
        return <BillsPage />
      case "groups":
        return <GroupsPage />
      case "friends":
        return <FriendsPage />
      case "voting":
        return <VotingPage />
      case "admin":
        return <AdminPage />
      case "settings":
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-auto">{renderPage()}</main>
    </div>
  )
}
