import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, CalendarDays, Medal, Wallet } from "lucide-react"

const stats = [
  { label: "Total Interviews", value: "12", sub: "37.8% this month", up: true, icon: Wallet },
  { label: "Recent Interviews", value: "3", sub: "2% this month", up: false, icon: CalendarDays },
  { label: "Average Score", value: "70", sub: "11% this week", up: true, icon: Medal },
]

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <Card key={s.label} className="rounded-2xl border-white/5 bg-card/60 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl ${
                    s.up ? "bg-emerald-400/10" : "bg-rose-400/10"
                  }`}
                >
                  <Icon className={`${s.up ? "text-emerald-400" : "text-rose-400"}`} aria-hidden="true" />
                </div>
                <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                  s.up ? "bg-emerald-400/10 text-emerald-400" : "bg-rose-400/10 text-rose-400"
                }`}
              >
                {s.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {s.sub}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{s.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
