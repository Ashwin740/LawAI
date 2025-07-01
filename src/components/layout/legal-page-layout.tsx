import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Scale, ChevronLeft } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">LawAI</span>
            </Link>
          </div>
          <Button asChild variant="outline">
              <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <Card className="max-w-4xl mx-auto shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl font-headline">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              {children}
            </CardContent>
          </Card>
        </div>
      </main>

       <footer className="py-6 md:px-8 md:py-4 border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-xs text-muted-foreground">
                © {currentYear} LawAI. All rights reserved.
            </p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:gap-x-4">
                <Link href="/terms-and-conditions" className="text-xs hover:underline underline-offset-4">
                    Terms & Conditions
                </Link>
                <Link href="/privacy-policy" className="text-xs hover:underline underline-offset-4">
                    Privacy Policy
                </Link>
                <Link href="/cancellation-and-refund" className="text-xs hover:underline underline-offset-4">
                    Cancellation & Refund
                </Link>
                <Link href="/shipping-and-delivery" className="text-xs hover:underline underline-offset-4">
                    Shipping & Delivery
                </Link>
                <Link href="/contact" className="text-xs hover:underline underline-offset-4">
                    Contact Us
                </Link>
            </nav>
        </div>
      </footer>
    </div>
  );
}
