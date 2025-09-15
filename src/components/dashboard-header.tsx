'use client'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserNav } from '@/components/user-nav'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Globe, Bell } from 'lucide-react'
import { Button } from './ui/button'

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-16 sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        {/* Placeholder for Breadcrumbs or Page Title */}
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Select defaultValue="en">
          <SelectTrigger className="w-auto border-none bg-transparent shadow-none [&_svg]:hidden">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div className="hidden md:block">
                <SelectValue placeholder="Language" />
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="as">Assamese</SelectItem>
            <SelectItem value="kha">Khasi</SelectItem>
            <SelectItem value="bn">Bengali</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
        <UserNav />
      </div>
    </header>
  )
}
