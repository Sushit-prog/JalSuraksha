'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { LayoutDashboard, FileText, Bot, AlertTriangle, Settings, LifeBuoy, LogOut } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/report', label: 'New Report', icon: FileText },
  { href: '/dashboard/prediction', label: 'AI Prediction', icon: Bot },
  { href: '/dashboard/alerts', label: 'Alerts', icon: AlertTriangle },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col justify-between">
        <nav className="p-2">
            <SidebarMenu>
                {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton variant="default" size="default" isActive={pathname === item.href} tooltip={{children: item.label}}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </nav>
        <nav className="mt-auto p-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="#" passHref legacyBehavior>
                    <SidebarMenuButton tooltip={{children: "Settings"}}>
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="#" passHref legacyBehavior>
                    <SidebarMenuButton tooltip={{children: "Support"}}>
                        <LifeBuoy className="h-5 w-5" />
                        <span>Support</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </nav>
    </div>
  )
}
