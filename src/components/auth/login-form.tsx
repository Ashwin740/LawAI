"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/context/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2c-27.3-26.1-63.5-42.3-103.5-42.3-84.3 0-152.3 67.4-152.3 150.9s68 150.9 152.3 150.9c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
    );
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const router = useRouter();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && currentUser) {
      router.push("/app");
    }
  }, [currentUser, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // The useEffect will handle the redirect on auth state change
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError(
          "This email is already in use. Please login or use a different email."
        );
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // The useEffect will handle the redirect on auth state change
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        // This is a common case, don't show an error message.
      } else if (err.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with the same email address but different sign-in credentials. Please sign in using the original method.");
      } else {
        console.error(err);
        setError("An unexpected error occurred with Google Sign-In. Please try again.");
      }
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  if (loading || currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const anySubmitting = isSubmitting || isGoogleSubmitting;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isRegistering ? "Register" : "Login"}</CardTitle>
          <CardDescription>
            {isRegistering
              ? "Create your account to get started."
              : "Sign in to access your account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={anySubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={anySubmitting}
              />
            </div>
            {error && <p className="text-red-500 text-sm px-1">{error}</p>}
            <Button type="submit" className="w-full" disabled={anySubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : isRegistering ? (
                "Register"
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                Or continue with
                </span>
            </div>
          </div>
           <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={anySubmitting}
          >
            {isGoogleSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2 h-4 w-4" />
            )}
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center pt-4">
          <Button
            variant="link"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(null);
            }}
            disabled={anySubmitting}
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Button>
           <Button asChild variant="link" className="text-xs h-auto p-0 text-muted-foreground font-normal">
              <Link href="/">
                &larr; Back to role selection
              </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
