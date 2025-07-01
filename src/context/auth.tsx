"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Scale } from 'lucide-react';

const TRIAL_PERIOD_DAYS = 14;

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isTrialActive: boolean;
  trialEndDate: Date | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTrialActive, setIsTrialActive] = useState(true);
  const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.metadata.creationTime) {
        const creationDate = new Date(user.metadata.creationTime);
        const endDate = new Date(creationDate);
        endDate.setDate(creationDate.getDate() + TRIAL_PERIOD_DAYS);
        setTrialEndDate(endDate);
        setIsTrialActive(new Date() < endDate);
      } else {
        // No user, so trial is not active. Or user has no creationTime (unlikely).
        setIsTrialActive(false);
        setTrialEndDate(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (!loading) {
      const isAppRoute = pathname.startsWith('/app');
      const isAuthRoute = pathname === '/login';

      if (!currentUser && isAppRoute) {
        router.push('/login');
      } else if (currentUser && isAuthRoute) {
        router.push('/app');
      }
    }
  }, [currentUser, loading, pathname, router]);


  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <Scale className="w-12 h-12 text-primary animate-pulse" />
            <p className="mt-4 text-muted-foreground">Loading LawAI...</p>
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, isTrialActive, trialEndDate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
