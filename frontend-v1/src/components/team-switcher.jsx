"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent">
              <div
                className="bg-white text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <img src="./favicon.png" alt="" className=""  />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium font-cotta text-2xl text-green-pastel text-center">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
