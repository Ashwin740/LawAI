'use client';

import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus2, FolderKanban, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { currentUser, role } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        Welcome back, {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}!
      </h1>
      <p className="text-muted-foreground mt-2">
        Here's a quick overview of your legal workspace.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Generated Documents
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 this month
            </p>
             <Button asChild variant="link" className="px-0">
                <Link href="/app/documents">View Saved Documents</Link>
            </Button>
          </CardContent>
        </Card>
        
        {role === 'professional' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Clients Managed
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                +1 new client this week
              </p>
              <Button asChild variant="link" className="px-0">
                  <Link href="/app/clients">Manage Clients</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quick Actions
            </CardTitle>
             <FilePlus2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Jump right into your legal tasks.
            </p>
            <Button asChild className="w-full">
                <Link href="/app/tools">Go to Legal Tools</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
