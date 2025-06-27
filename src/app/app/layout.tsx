
'use client';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
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
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter>
            {/* Can add footer items here later */}
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="flex items-center gap-2">
                    <Scale className="w-6 h-6 text-primary" />
                    <h1 className="text-xl font-headline font-bold text-primary hidden md:block">
                        LawAI
                    </h1>
                </div>
              </div>
              <p className="text-sm text-muted-foreground hidden lg:block">Your AI Legal Assistant</p>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              {children}
            </main>
        </SidebarInset>
      </SidebarProvider>
  );
}
