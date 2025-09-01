"use client"

import { Home, BarChart2, Users, Receipt, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useResolvedPath } from "react-router"

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Results", href: "/dashboard/analytics", icon: BarChart2 },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Billing", href: "/dashboard/billing", icon: Receipt },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = useResolvedPath();
  return (
    <nav className="h-screen sticky top-0 p-4 md:p-6 flex flex-col gap-3 rounded-r-2xl bg-gradient-to-b from-indigo-600 to-purple-600 text-white">
      {/* Brand */}
      <div className="mb-2 flex items-center gap-3 px-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/20 font-semibold">S</div>
        <Link href="/dashboard" className="block text-lg font-semibold tracking-wide">
          SkillMateAI
          <span className="sr-only">Go to dashboard home</span>
        </Link>
      </div>

      {/* Nav */}
      <ul className="flex-1 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-white/15 text-white ring-1 ring-white/20"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={cn("h-4 w-4", active ? "text-white" : "text-white/80")} />
                <span className="text-pretty">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Footer actions */}
      <div className="mt-2 space-y-2 px-2">
        <Link
          href="/dashboard/settings"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          type="button"
          className="w-full inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
        <div className="text-[11px] text-white/60 pt-1">v1.0</div>
      </div>
    </nav>
  )
}
