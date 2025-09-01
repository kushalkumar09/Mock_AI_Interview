"use client"

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const data = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 11 },
  { name: "Thu", value: 22 },
  { name: "Fri", value: 17 },
  { name: "Sat", value: 14 },
  { name: "Sun", value: 20 },
]

export function ActivityChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-pretty">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" className="text-muted-foreground/20" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb" // blue-600
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 1, fill: "#2563eb" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
