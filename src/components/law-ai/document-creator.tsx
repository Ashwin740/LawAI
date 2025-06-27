"use client";

import { createDocument } from "@/ai/flows/document-creation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, FileDown, FilePlus2, Loader2, Sparkles } from "lucide-react";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph } from "docx";

const documentTypes = [
  "Simple Contract",
  "Rental Agreement",
  "Affidavit",
  "Non-Disclosure Agreement (NDA)",
  "Cease and Desist Letter",
];

interface DocumentCreatorProps {
  documentType: string;
  setDocumentType: (type: string) => void;
  details: string;
  setDetails: (details: string) => void;
  generatedDocument: string;
  setGeneratedDocument: (doc: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function DocumentCreator({
  documentType,
  setDocumentType,
  details,
  setDetails,
  generatedDocument,
  setGeneratedDocument,
  isLoading,
  setIsLoading,
}: DocumentCreatorProps) {
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!documentType.trim() || !details.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a document type and provide details.",
      });
      return;
    }
    setIsLoading(true);
    setGeneratedDocument("");
    try {
      const result = await createDocument({ documentType, details });
      setGeneratedDocument(result.documentText);
    } catch (error) {
      console.error("Error creating document:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An error occurred while creating the document. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDocument);
    toast({
      title: "Copied!",
      description: "The document text has been copied to your clipboard.",
    });
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(generatedDocument, 180);
    doc.text(lines, 10, 10);
    doc.save(`${documentType.replace(/\s/g, '_') || 'document'}.pdf`);
    toast({
        title: "Downloaded!",
        description: "The PDF document has been downloaded.",
    });
  };

  const handleDownloadWord = () => {
    const doc = new Document({
      sections: [{
        children: generatedDocument.split('\n').map(text => new Paragraph({
            children: [{ text }],
        })),
      }],
    });

    Packer.toBlob(doc).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${documentType.replace(/\s/g, '_') || 'document'}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({
          title: "Downloaded!",
          description: "The Word document has been downloaded.",
      });
    });
  };


  return (
    <Card className="max-w-4xl mx-auto mt-6 shadow-lg border">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <FilePlus2 className="w-6 h-6" />
          Create a Legal Document
        </CardTitle>
        <CardDescription>
          Select a document type and provide the necessary details to generate a
          draft.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select onValueChange={setDocumentType} value={documentType}>
              <SelectTrigger aria-label="Document Type">
                <SelectValue placeholder="Select a document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Provide details for your document. For example: names of parties, addresses, PAN numbers, subject matter, terms, and witness details."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="h-48 resize-none"
              aria-label="Document details"
            />
          </div>

          <div className="relative">
            <Card className="h-full bg-background/50 flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-accent" />
                        Generated Document
                    </div>
                    {generatedDocument && (
                        <Button variant="ghost" size="icon" onClick={handleCopy} className="h-7 w-7">
                            <Copy className="w-4 h-4" />
                            <span className="sr-only">Copy</span>
                        </Button>
                    )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow h-[250px] overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <pre className="text-sm whitespace-pre-wrap font-sans">
                    {generatedDocument || "Your generated document will appear here."}
                  </pre>
                )}
              </CardContent>
               {generatedDocument && !isLoading && (
                  <CardFooter className="pt-4 flex gap-2 justify-end border-t mt-auto">
                      <Button variant="outline" size="sm" onClick={handleDownloadWord}>
                          <FileDown />
                          Word (.docx)
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
                          <FileDown />
                          PDF
                      </Button>
                  </CardFooter>
              )}
            </Card>
          </div>
        </div>
        <Button
          onClick={handleCreate}
          disabled={isLoading || !documentType.trim() || !details.trim()}
          className="w-full md:w-auto bg-accent hover:bg-accent/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Create Document
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
