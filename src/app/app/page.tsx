'use client';

import { useAuth } from '@/context/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderKanban, Users, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { role } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <section className="text-center bg-card border rounded-lg p-8 shadow-sm">
        <h1 className="text-4xl font-bold font-headline text-primary tracking-tight">
          Welcome to LawAI
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your intelligent legal assistant designed for the Indian legal landscape. Streamline your workflow with powerful AI tools for document analysis, creation, and research.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/app/tools">
            <Wrench className="mr-2 h-5 w-5" />
            Explore Legal Tools
          </Link>
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Your Workspace</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-6 h-6 text-accent" />
                Legal Tools
              </CardTitle>
              <CardDescription>
                Access AI-powered document summarization, creation, and legal search.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/app/tools">Go to Tools</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderKanban className="w-6 h-6 text-accent" />
                Saved Documents
              </CardTitle>
              <CardDescription>
                Review, manage, and download all your previously generated documents.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Button asChild variant="outline" className="w-full">
                  <Link href="/app/documents">View Documents</Link>
              </Button>
            </CardContent>
          </Card>
          
          {role === 'professional' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-accent" />
                    Client Management
                </CardTitle>
                <CardDescription>
                  Organize client information and link them to cases and documents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                    <Link href="/app/clients">Manage Clients</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
