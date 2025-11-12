"use client";

import {
  BarChart3,
  Bell,
  LayoutDashboard,
  PenSquare,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, tooltip: "Dashboard" },
  { href: "/alerts", label: "Alerts", icon: Bell, tooltip: "Alerts" },
  { href: "/reports", label: "Reports", icon: BarChart3, tooltip: "Reports" },
  { href: "/analysis", label: "Analysis", icon: Search, tooltip: "Analysis" },
];

export function SidebarNav() {
  const pathname = usePathname();
  
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="h-16 justify-center p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 md:justify-start md:p-4">
        <PenSquare className="h-8 w-8 shrink-0 text-sidebar-primary" />
        <div className="overflow-hidden">
          <h1 className="font-headline text-2xl font-bold">OpenAssure</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {menuItems.map(({ href, label, icon: Icon, tooltip }) => (
            <SidebarMenuItem key={href}>
              <Link href={href} passHref legacyBehavior>
                <SidebarMenuButton
                  as="a"
                  tooltip={tooltip}
                  isActive={pathname === href}
                >
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <SidebarMenu>
           <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
