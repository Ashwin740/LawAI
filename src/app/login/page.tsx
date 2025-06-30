import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';
import { Scale } from 'lucide-react';

export default function LoginPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const isSignUp = searchParams?.mode === 'signup';

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
          {isSignUp ? 'Create an account to begin.' : 'Welcome back! Please sign in.'}
        </p>
      </div>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{isSignUp ? 'Create Account' : 'Login'}</CardTitle>
          <CardDescription>
            {isSignUp ? "Enter your details to create your account." : "Enter your email below to login to your account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm isSignUpInitial={isSignUp} />
        </CardContent>
      </Card>
    </div>
  );
}
