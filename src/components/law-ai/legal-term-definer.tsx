"use client";

import { useState } from "react";
import { legalTermDefinition } from "@/ai/flows/legal-term-definition";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, BookOpen, Sparkles } from "lucide-react";

export function LegalTermDefiner() {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDefine = async () => {
    if (!term.trim()) return;
    setIsLoading(true);
    setDefinition("");
    try {
      const result = await legalTermDefinition({ term });
      setDefinition(result.definition);
    } catch (error) {
      console.error("Error defining term:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An error occurred while defining the term. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleDefine();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto mt-6 shadow-lg border">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Define a Legal Term
        </CardTitle>
        <CardDescription>
          Enter a legal term to receive a clear, AI-generated definition.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="e.g., 'Habeas Corpus'"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
            aria-label="Legal term input"
          />
          <Button
            onClick={handleDefine}
            disabled={isLoading || !term.trim()}
            className="bg-accent hover:bg-accent/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Defining...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Define Term
              </>
            )}
          </Button>
        </div>
        <Card className="min-h-[200px] bg-background/50">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Definition
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && !definition ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">
                {definition || "Your definition will appear here."}
              </p>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
