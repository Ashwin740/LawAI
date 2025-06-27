
'use client';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Scale } from "lucide-react";
import { useAuth } from "@/context/auth";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading || !currentUser) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <Scale className="w-12 h-12 text-primary animate-pulse" />
          <p className="mt-4 text-muted-foreground">Loading Dashboard...</p>
      </div>
    );
  }

  return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2 p-2">
                <Scale className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-headline font-bold text-primary group-data-[collapsible=icon]:hidden">
                    LawAI
                </h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter>
            {/* Can add footer items here later */}
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm z-10">
              <SidebarTrigger />
              <p className="text-sm text-muted-foreground">Your AI Legal Assistant</p>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              {children}
            </main>
        </SidebarInset>
      </SidebarProvider>
  );
}
