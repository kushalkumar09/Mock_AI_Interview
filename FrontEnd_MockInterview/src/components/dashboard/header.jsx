"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Menu } from "lucide-react"
import { useContext, useState } from "react"
import { Sidebar } from "./sidebar"
import { useResolvedPath } from "react-router"
import { AppContent } from "@/context/Appcontext"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const path = useResolvedPath();
  const {currentUser} = useContext(AppContent);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 md:px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="space-y-0.5">
              <h1 className="text-xs uppercase tracking-widest text-foreground/60">{path.pathname}</h1>
              <h1 className="text-lg font-semibold sm:text-xl">
                Welcome back, <span className="text-primary capitalize">{currentUser}</span>! <span aria-hidden>👋</span>
              </h1>
              <p className="text-sm text-foreground/60">Ready to ace your next interview?</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Start New Interview
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback>{currentUser?.slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen ? (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72">
            <Sidebar />
          </div>
        </div>
      ) : null}
    </>
  )
}
