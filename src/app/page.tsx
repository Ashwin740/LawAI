'use client';

import { useAuth } from '@/context/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Scale } from 'lucide-react';

export default function LandingPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        router.push('/app');
      } else {
        router.push('/login');
      }
    }
  }, [currentUser, loading, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Scale className="w-12 h-12 text-primary animate-pulse" />
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  );
}
