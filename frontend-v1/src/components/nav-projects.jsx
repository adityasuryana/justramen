"use client"

import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function NavProjects({
  projects,
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {projects.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem className={""}>
              <Link to={item.url}>
                <SidebarMenuButton tooltip={item.name} className={"active:bg-white hover:bg-white text-md font-product text-green-pastel hover:text-green-pastel font-medium py-6"}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </Link>

            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
