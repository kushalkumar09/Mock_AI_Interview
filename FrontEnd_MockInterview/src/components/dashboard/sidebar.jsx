"use client"

import { Home, BarChart2, Users, Receipt, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, NavLink, useNavigate, useResolvedPath } from "react-router"

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Results", href: "/analytics", icon: BarChart2 },
  { label: "Billing", href: "/billing", icon: Receipt },
]

export function Sidebar() {
  const {pathname} = useResolvedPath();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    window.location.href = "";    
  };
  return (
    <nav className="h-screen sticky top-0 p-4 md:p-6 flex flex-col gap-3 rounded-r-2xl bg-gradient-to-b from-gray-600 to-gray-600 text-white">
      {/* Brand */}
      <div className="mb-2 flex items-center gap-3 px-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-background font-semibold">S</div>
        <Link to="/dashboard" className="block text-lg font-semibold tracking-wide">
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
              <NavLink
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-white/10 text-white font-semibold"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={cn("h-4 w-4", active ? "text-white" : "text-white/80")} />
                <span className="text-pretty">{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>

      {/* Footer actions */}
      <div className="mt-2 space-y-2 px-2">
        <Link
          to="/settings"
          className="w-full inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          type="button"
          className="w-full inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </nav>
  )
}
