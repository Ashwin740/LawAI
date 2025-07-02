'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { CheckCircle, Gem, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { differenceInDays } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

export default function PricingPage() {
  const { isTrialActive, trialEndDate, currentUser } = useAuth();
  const { toast } = useToast();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const proFeatures = [
    "Unlimited document summarizations",
    "Unlimited document creations",
    "Unlimited legal searches",
    "Access to advanced AI models",
    "Priority email support",
    "Save and manage all documents",
  ];

  const trialFeatures = [
    "10 document summarizations",
    "10 document creations",
    "25 legal searches",
    "Standard AI models",
    "14-day free trial",
  ];

  const getDaysLeft = () => {
    if (!isTrialActive || !trialEndDate) return null;
    const daysLeft = differenceInDays(trialEndDate, new Date());
    
    if (daysLeft < 0) return "Your trial has ended.";
    if (daysLeft === 0) return "Your trial ends today.";
    if (daysLeft === 1) return "You have 1 day left in your trial.";
    return `You have ${daysLeft} days left in your trial.`;
  };

  const daysLeftText = getDaysLeft();

  const handleUpgradeClick = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Not Logged In",
        description: "You must be logged in to upgrade.",
      });
      return;
    }

    setIsUpgrading(true);
    try {
      const response = await fetch('https://buildingnew.app.n8n.cloud/webhook-test/payment%20request%20from%20LawAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          upgradeRequestTime: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Webhook request failed');
      }

      toast({
        title: "Upgrade Request Sent!",
        description: "Your request has been received. Please allow some time for processing.",
      });
    } catch (error) {
      console.error('Error sending upgrade webhook:', error);
      toast({
        variant: "destructive",
        title: "Upgrade Failed",
        description: "Could not process your upgrade request. Please try again later.",
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary tracking-tight">
          Choose Your Plan
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Start with a 14-day free trial and unlock the full power of LawAI with our Pro plan. No credit card required for the trial.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto w-full mt-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Star className="w-6 h-6 text-accent" />
                Free Trial
            </CardTitle>
            <CardDescription>
                A 14-day trial to explore the core features of LawAI.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <p className="text-4xl font-bold">₹0 <span className="text-sm font-normal text-muted-foreground">/ for 14 days</span></p>
            <ul className="space-y-2 mt-4">
              {trialFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex-col items-stretch">
            <Button variant="outline" className="w-full" disabled>
                Your Current Plan
            </Button>
            {daysLeftText && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                {daysLeftText}
              </p>
            )}
          </CardFooter>
        </Card>

        <Card className="border-primary border-2 flex flex-col relative shadow-xl">
           <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    Most Popular
                </div>
            </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Gem className="w-6 h-6 text-primary" />
                LawAI Pro
            </CardTitle>
            <CardDescription>
              For professionals who need unlimited access and advanced features.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
             <p className="text-4xl font-bold">₹599 <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
            <ul className="space-y-2 mt-4">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" onClick={handleUpgradeClick} disabled={isUpgrading}>
              {isUpgrading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Upgrade to Pro'
              )}
            </Button>
          </CardFooter>
        </Card>
      </section>
        <div className="text-center text-muted-foreground text-sm mt-4">
            <p>For enterprise solutions or custom requirements, please <Link href="mailto:support@lawai.com" className="underline text-primary">contact us</Link>.</p>
        </div>
    </div>
  );
}
