import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DocumentSummarizer } from "@/components/law-ai/document-summarizer";
import { LegalTermDefiner } from "@/components/law-ai/legal-term-definer";
import { Scale } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b bg-card">
        <div className="container mx-auto flex items-center gap-3">
          <Scale className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-headline font-bold text-primary">
            LawAI
          </h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          <Tabs defaultValue="summarize" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="summarize">Document Summarization</TabsTrigger>
              <TabsTrigger value="define">Legal Term Definition</TabsTrigger>
            </TabsList>
            <TabsContent value="summarize">
              <DocumentSummarizer />
            </TabsContent>
            <TabsContent value="define">
              <LegalTermDefiner />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="p-4 border-t bg-card text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} LawAI. All rights reserved.</p>
        <p className="text-xs mt-1">
          Disclaimer: AI-generated content may be inaccurate. Please consult a
          legal professional.
        </p>
      </footer>
    </div>
  );
}
