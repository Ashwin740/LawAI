"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DocumentSummarizer } from "@/components/law-ai/document-summarizer";
import { LegalSearch } from "@/components/law-ai/legal-search";
import { DocumentCreator } from "@/components/law-ai/document-creator";

export default function ToolsPage() {
  // State for DocumentSummarizer
  const [documentText, setDocumentText] = useState("");
  const [summary, setSummary] = useState("");
  const [summarizerIsLoading, setSummarizerIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  // State for LegalSearch
  const [query, setQuery] = useState("");
  const [insight, setInsight] = useState("");
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  // State for DocumentCreator
  const [documentType, setDocumentType] = useState("");
  const [details, setDetails] = useState("");
  const [generatedDocument, setGeneratedDocument] = useState("");
  const [creatorIsLoading, setCreatorIsLoading] = useState(false);

  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight">Legal Tools</h1>
        <p className="text-muted-foreground mt-2">
            Use our AI-powered tools for summarization, research, and document creation.
        </p>
        <Tabs defaultValue="summarize" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="summarize">
            Document Summarization
            </TabsTrigger>
            <TabsTrigger value="search">Legal Search</TabsTrigger>
            <TabsTrigger value="create">Document Creation</TabsTrigger>
        </TabsList>
        <TabsContent value="summarize">
            <DocumentSummarizer
            documentText={documentText}
            setDocumentText={setDocumentText}
            summary={summary}
            setSummary={setSummary}
            isLoading={summarizerIsLoading}
            setIsLoading={setSummarizerIsLoading}
            fileName={fileName}
            setFileName={setFileName}
            />
        </TabsContent>
        <TabsContent value="search">
            <LegalSearch
            query={query}
            setQuery={setQuery}
            insight={insight}
            setInsight={setInsight}
            isLoading={searchIsLoading}
            setIsLoading={setSearchIsLoading}
            />
        </TabsContent>
        <TabsContent value="create">
            <DocumentCreator
            documentType={documentType}
            setDocumentType={setDocumentType}
            details={details}
            setDetails={setDetails}
            generatedDocument={generatedDocument}
            setGeneratedDocument={setGeneratedDocument}
            isLoading={creatorIsLoading}
            setIsLoading={setCreatorIsLoading}
            />
        </TabsContent>
        </Tabs>
    </div>
  );
}
