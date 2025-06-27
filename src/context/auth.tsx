"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Scale } from 'lucide-react';

type Role = 'professional' | 'user' | null;

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  role: Role;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRoleState] = useState<Role>(null);
  const router = useRouter();
  const pathname = usePathname();

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      if (newRole) {
        localStorage.setItem('userRole', newRole);
      } else {
        localStorage.removeItem('userRole');
      }
    }
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRole = localStorage.getItem('userRole') as Role;
      if(savedRole) setRoleState(savedRole);
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
    <AuthContext.Provider value={{ currentUser, loading, role, setRole }}>
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
