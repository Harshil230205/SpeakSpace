"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BarChart3, Calendar, Home, LogOut, MessageSquare, Settings, Users } from "lucide-react"

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Sessions",
      icon: Calendar,
      href: "/dashboard/sessions",
    },
    {
      title: "Discussion Room",
      icon: MessageSquare,
      href: "/dashboard/discussion-room",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ]

  // Role-specific menu items
  if (user?.role === "moderator") {
    menuItems.splice(2, 0, {
      title: "Manage Users",
      icon: Users,
      href: "/dashboard/manage-users",
    })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-primary">Speak</span>
              <span>Space</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <div className="mb-2 text-sm font-medium">
                {user?.name} ({user?.role})
              </div>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4 lg:px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
