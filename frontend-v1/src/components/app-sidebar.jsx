"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardList,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  Package,
  PieChart,
  Settings2,
  SquareMenu,
  SquarePercent,
  SquareTerminal,
  User,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "justramen",
      logo: GalleryVerticalEnd,
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Account",
      url: "/account",
      icon: User,
    },
    {
      name: "Menu",
      url: "/menu",
      icon: SquareMenu,
    },
    {
      name: "Stock",
      url: "/stock",
      icon: ClipboardList,
    },
    {
      name: "Inventory",
      url: "/inventory",
      icon: Package,
    },
    {
      name: "Promo",
      url: "/promo",
      icon: SquarePercent,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar className={"bg-yellow-pastel"} collapsible="icon" {...props}>
      <SidebarHeader className={"bg-yellow-pastel"}>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className={"bg-yellow-pastel"}>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className={"bg-yellow-pastel"}>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
