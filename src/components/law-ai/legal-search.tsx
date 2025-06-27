"use client";

import { legalSearch } from "@/ai/flows/legal-search";
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
import { Loader2, Search, Sparkles } from "lucide-react";

interface LegalSearchProps {
  query: string;
  setQuery: (query: string) => void;
  insight: string;
  setInsight: (insight: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function LegalSearch({
  query,
  setQuery,
  insight,
  setInsight,
  isLoading,
  setIsLoading,
}: LegalSearchProps) {
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setInsight("");
    try {
      const result = await legalSearch({ query });
      setInsight(result.insight);
    } catch (error) {
      console.error("Error performing legal search:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An error occurred during the search. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto mt-6 shadow-lg border">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Search className="w-6 h-6" />
          Legal Search & Insights
        </CardTitle>
        <CardDescription>
          Ask any legal question to get an AI-powered insight based on Indian law.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="e.g., 'What are the elements of a contract under the Indian Contract Act, 1872?'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
            aria-label="Legal search query"
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="bg-accent hover:bg-accent/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
        <Card className="min-h-[200px] bg-background/50">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Legal Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && !insight ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">
                {insight || "Your legal insight will appear here."}
              </p>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
