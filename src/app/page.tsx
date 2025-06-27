import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DocumentSummarizer } from "@/components/law-ai/document-summarizer";
import { LegalSearch } from "@/components/law-ai/legal-search";
import { DocumentCreator } from "@/components/law-ai/document-creator";
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
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="summarize">Document Summarization</TabsTrigger>
              <TabsTrigger value="search">Legal Search</TabsTrigger>
              <TabsTrigger value="create">Document Creation</TabsTrigger>
            </TabsList>
            <TabsContent value="summarize">
              <DocumentSummarizer />
            </TabsContent>
            <TabsContent value="search">
              <LegalSearch />
            </TabsContent>
            <TabsContent value="create">
              <DocumentCreator />
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
