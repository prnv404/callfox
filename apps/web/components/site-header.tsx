"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { data } from "./app-sidebar"
import { usePathname } from "next/navigation"
import { IconSparkles, IconMessage, IconBell, IconBook } from "@tabler/icons-react"

export function SiteHeader() {
  const pathname = usePathname()

  const activeItem =
    data.navMain.find((item) => item.url === pathname || pathname.startsWith(item.url + "/")) ||
    data.navSecondary.find((item) => item.url === pathname || pathname.startsWith(item.url + "/"))

  return (
    <header className="sticky top-0 z-50 bg-background flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-sm font-medium ml-2">
          {activeItem?.title || "Knowledge Base"}
        </h1>

        <div className="ml-auto flex items-center gap-2">
          {/* What's new button with gradient border */}
          <div className="relative p-[1px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
            <Button
              variant="default"
              size="sm"
              className="relative h-7 rounded-full bg-background hover:bg-background/90 text-foreground border-0 px-3 shadow-none text-xs"
            >
              <IconSparkles className="mr-1.5 h-3.5 w-3.5" />
              What's new
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-normal border border-border/40 hover:bg-muted/50 hidden md:inline-flex">
            Feedback
          </Button>

          <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-normal border border-border/40 hover:bg-muted/50 hidden md:inline-flex">
            Docs
          </Button>

          <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-normal border border-border/40 hover:bg-muted/50 hidden sm:inline-flex">
            <IconMessage className="mr-2 h-3.5 w-3.5" />
            Talk to El
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border/40 hover:bg-muted/50">
            <IconBell className="h-4 w-4" />
          </Button>

          {/* Keeping ModeToggle but styled minimally if possible, or usually it's a dropdown so standard is fine */}
          <div className="ml-1">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
