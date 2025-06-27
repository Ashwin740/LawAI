'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';
import { Scale } from 'lucide-react';

function LoginPageContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mb-8 text-center">
        <Link href="/" className="flex items-center justify-center gap-4 mb-6">
          <Scale className="w-12 h-12 text-primary" />
          <h1 className="text-5xl font-headline font-bold text-primary">
            LawAI
          </h1>
        </Link>
        <p className="text-muted-foreground">
          Welcome back! Please sign in to continue.
        </p>
      </div>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <p className="mt-4 text-sm text-center text-muted-foreground">
        Changed your mind about your role?{' '}
        <Link href="/" className="underline hover:text-primary">
          Go back
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  )
}
