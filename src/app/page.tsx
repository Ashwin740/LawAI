import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Scale, FileText, Search, FilePlus2, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">LawAI</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/login?mode=signup">
                Sign Up <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-6 py-12 text-center md:py-24">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
            AI-Powered Legal Assistance
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Streamline your legal workflows with intelligent document summarization,
            advanced legal research, and automated document creation.
          </p>
          <div className="flex w-full max-w-sm items-center justify-center space-x-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/login?mode=signup">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 border-t border-b">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Leverage our suite of powerful tools designed to enhance your legal practice and research.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4 text-primary">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Document Summarization</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly get concise summaries of complex legal documents, saving hours of reading.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4 text-primary">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Legal Search</h3>
                <p className="text-sm text-muted-foreground">
                  Ask legal questions and get AI-powered insights based on Indian law and statutes.
                </p>
              </div>
               <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4 text-primary">
                  <FilePlus2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Document Creation</h3>
                <p className="text-sm text-muted-foreground">
                  Generate drafts for common legal documents like contracts and affidavits in minutes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 md:px-8 md:py-4 border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LawAI. All rights reserved.
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
