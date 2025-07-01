'use client';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { AlertCircle, Scale } from "lucide-react";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function TrialExpiredBanner() {
    const { trialEndDate } = useAuth();
    if (!trialEndDate) return null;

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(trialEndDate);
    
    return (
        <Alert variant="destructive" className="rounded-none border-x-0 border-t-0 sticky top-0 z-20">
            <AlertCircle className="h-4 w-4" />
            <div className="flex items-center justify-between w-full">
                <div>
                    <AlertTitle>Your Free Trial Has Ended</AlertTitle>
                    <AlertDescription>
                        Your trial ended on {formattedDate}. Please upgrade to Pro to continue using all features.
                    </AlertDescription>
                </div>
                <Button asChild size="sm">
                    <Link href="/app/pricing">Upgrade to Pro</Link>
                </Button>
            </div>
        </Alert>
    )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, loading, isTrialActive } = useAuth();
  
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
            {!isTrialActive && <TrialExpiredBanner />}
            <header className="p-4 border-b flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Link href="/app" className="flex items-center gap-2">
                    <Scale className="w-6 h-6 text-primary" />
                    <h1 className="text-xl font-headline font-bold text-primary hidden md:block">
                        LawAI
                    </h1>
                </Link>
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
