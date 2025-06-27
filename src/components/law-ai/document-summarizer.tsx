"use client";

import { useState, useCallback, DragEvent } from "react";
import { documentSummarization } from "@/ai/flows/document-summarization";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud, FileText, Sparkles } from "lucide-react";

interface DocumentSummarizerProps {
  documentText: string;
  setDocumentText: (text: string) => void;
  summary: string;
  setSummary: (summary: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  fileName: string;
  setFileName: (name: string) => void;
}

export function DocumentSummarizer({
  documentText,
  setDocumentText,
  summary,
  setSummary,
  isLoading,
  setIsLoading,
  fileName,
  setFileName,
}: DocumentSummarizerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!documentText.trim()) return;
    setIsLoading(true);
    setSummary("");
    try {
      const result = await documentSummarization({ documentText });
      setSummary(result.summary);
    } catch (error) {
      console.error("Error summarizing document:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An error occurred while summarizing the document. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileRead = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setDocumentText(text);
    };
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error reading file. Please try again.",
      });
    };
    reader.readAsText(file);
  };

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type === "text/plain" || file.name.endsWith(".txt")) {
          handleFileRead(file);
        } else {
          toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: "Please upload a .txt file.",
          });
        }
      }
    },
    [toast, handleFileRead]
  );

  return (
    <Card className="max-w-4xl mx-auto mt-6 shadow-lg border">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Summarize Your Document
        </CardTitle>
        <CardDescription>
          Paste your legal text below or drag and drop a .txt file to get a
          concise summary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-200 ${
                isDragging ? "border-primary bg-primary/10" : "border-border"
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full min-h-[150px]">
                <UploadCloud className="w-12 h-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {isDragging
                    ? "Drop the file here"
                    : "Drag & drop a .txt file"}
                </p>
                {fileName && (
                  <p className="mt-2 text-sm font-medium text-primary">
                    {fileName}
                  </p>
                )}
              </div>
            </div>
            <Textarea
              placeholder="Or paste your document text here..."
              value={documentText}
              onChange={(e) => {
                setDocumentText(e.target.value);
                if (e.target.value === "") setFileName("");
              }}
              className="h-48 resize-none"
              aria-label="Document text input"
            />
          </div>

          <div className="relative">
            <Card className="h-full bg-background/50">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  AI-Generated Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-full min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">
                    {summary || "Your summary will appear here."}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <Button
          onClick={handleSummarize}
          disabled={isLoading || !documentText.trim()}
          className="w-full md:w-auto bg-accent hover:bg-accent/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Summarize Document
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
