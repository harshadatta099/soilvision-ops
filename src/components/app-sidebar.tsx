import { useState } from "react"
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  Cpu, 
  FlaskConical, 
  HeadphonesIcon, 
  CreditCard, 
  Package, 
  FileText, 
  Settings,
  Sprout,
  ChevronDown
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Estates & Farms", url: "/estates", icon: MapPin },
  { title: "Devices", url: "/devices", icon: Cpu },
  { title: "NPK Analytics", url: "/analytics", icon: FlaskConical },
  { title: "Support Tickets", url: "/support", icon: HeadphonesIcon },
  { title: "Subscriptions", url: "/subscriptions", icon: CreditCard },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Reports", url: "/reports", icon: FileText },
]

const adminItems = [
  { title: "Admin Users", url: "/admin/users", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [adminOpen, setAdminOpen] = useState(false)
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Sprout className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-sidebar-foreground">FarmFuture</h1>
              <p className="text-xs text-sidebar-foreground/70">IoT Backoffice</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClasses}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="text-sidebar-foreground/70 cursor-pointer hover:text-sidebar-foreground flex items-center justify-between">
                Administration
                {!isCollapsed && <ChevronDown className="h-3 w-3" />}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.url} className={getNavClasses}>
                          <item.icon className="h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}