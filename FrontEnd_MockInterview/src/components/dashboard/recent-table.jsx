import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"

const items = [
  { title: "SDE 1", date: "12 Feb 2024", your: 10, max: 20 },
  { title: "Sarphens Illustration", date: "16 Mar 2024", your: 15, max: 20 },
  { title: "Landing Page 3D Max", date: "15 Apr 2024", your: 17, max: 20 },
  { title: "Collab Illustration", date: "16 Apr 2024", your: 11, max: 20 },
]

export function RecentTable() {
  return (
    <Card className="rounded-3xl border-white/5 bg-card/60 backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-pretty">Previous Interviews</CardTitle>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50"
                size={16}
                aria-hidden
              />
              <Input
                className="w-full rounded-xl border-white/10 bg-white/5 pl-9 text-sm placeholder:text-foreground/50"
                placeholder="Search"
                aria-label="Search previous interviews"
              />
            </div>
            <Button
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-xs text-foreground hover:bg-white/10"
            >
              Last 30 days
              <ChevronDown size={16} className="ml-1" aria-hidden />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-2xl border border-white/5">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-foreground/70">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Interview</th>
                <th className="px-4 py-3 font-medium">Interview Date</th>
                <th className="px-4 py-3 font-medium">Your Score</th>
                <th className="px-4 py-3 font-medium">Max Score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, idx) => (
                <tr key={idx} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src="/interview-thumbnail.png" alt="" width={64} height={40} className="rounded-md" />
                      <div>
                        <p className="font-medium">{row.title}</p>
                        <p className="text-xs text-foreground/60">Brief description of the session.</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.your}</td>
                  <td className="px-4 py-3">{row.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
