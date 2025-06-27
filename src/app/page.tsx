'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, Briefcase, User, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function LandingPage() {
    const { currentUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && currentUser) {
            router.push('/app');
        }
    }, [currentUser, loading, router]);

    if (loading || currentUser) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-background">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        );
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 font-body">
      <main className="flex flex-col items-center justify-center flex-1 p-4 text-center">
         <div className="flex items-center gap-4 mb-6">
            <Scale className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-headline font-bold text-primary">
              LawAI
            </h1>
          </div>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl">
            Your AI-powered legal assistant for document summarization, creation, and legal insights tailored for Indian law.
          </p>

        <Card className="w-full max-w-lg shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Welcome to LawAI</CardTitle>
            <CardDescription>Please select your role to continue.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/login" passHref>
              <Button size="lg" className="w-full sm:w-auto">
                <Briefcase className="mr-2 h-5 w-5" />
                Law Professional
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                 <User className="mr-2 h-5 w-5" />
                Not a Law Professional
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
       <footer className="p-4 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} LawAI. All rights reserved.</p>
        </footer>
    </div>
  );
}
