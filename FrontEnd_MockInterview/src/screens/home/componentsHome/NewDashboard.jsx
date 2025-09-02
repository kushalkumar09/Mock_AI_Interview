
import {Header} from "@/components/dashboard/header.jsx"
import { OverviewCards } from "@/components/dashboard/overview.jsx"
import { ActivityChart } from "@/components/dashboard/activity-chart.jsx"
import { RecentTable } from "@/components/dashboard/recent-table.jsx"
import { Sidebar } from "@/components/dashboard/sidebar.jsx"

export default function NewDashboard() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl flex">
        <aside className="hidden md:block w-64 shrink-0">
          <Sidebar />
        </aside>
        <section className="flex-1 min-w-0">
          <Header/>
          <div className="p-4 md:p-6 space-y-6">
            <OverviewCards />
              <div className="">
                <RecentTable />
              </div>
          </div>
        </section>
      </div>
    </main>
  )
}
