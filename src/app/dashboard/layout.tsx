import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import { MainNav } from '@/components/main-nav';
import { Logo } from '@/components/logo';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-sidebar md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-16 lg:px-6">
                    <Logo />
                </div>
                <div className="flex-1">
                    <MainNav />
                </div>
            </div>
        </div>
        <div className="flex flex-col">
          <DashboardHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
