
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const GoogleIcon = () => <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"></path><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path></svg>;

export function LoginForm({ isSignUpInitial = false }: { isSignUpInitial?: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(isSignUpInitial);
  const { toast } = useToast();
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const performAuth = isSignUp 
      ? createUserWithEmailAndPassword(auth, email, password)
      : signInWithEmailAndPassword(auth, email, password);

    try {
      await performAuth;
      toast({ title: 'Success!', description: `You have successfully ${isSignUp ? 'signed up' : 'logged in'}.` });
      router.push('/app');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Authentication Failed', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast({ title: "Login Successful", description: "Welcome!" });
      router.push('/app');
    } catch (error: any) {
      let description = error.message;
      if (error.code === 'auth/configuration-not-found') {
        description = 'Google Sign-In is not configured for this project. Please enable it in your Firebase Authentication console settings.';
      }
      toast({ variant: "destructive", title: "Login Failed", description });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleAuth} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSignUp ? 'Sign Up' : 'Sign In'} with Email
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
        Google
      </Button>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <button onClick={() => setIsSignUp(!isSignUp)} className="underline underline-offset-4 hover:text-primary">
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </p>
    </div>
  );
}
