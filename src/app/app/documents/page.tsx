import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DocumentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Saved Documents</h1>
      <p className="text-muted-foreground mt-2">
        Manage and review your generated legal documents.
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center gap-4 py-16">
            <FolderKanban className="w-16 h-16 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">No Documents Yet</h3>
            <p className="text-muted-foreground max-w-sm">
                When you create and save documents using our legal tools, you'll find them right here for easy access.
            </p>
            <Button asChild>
                <Link href="/app/tools?tab=create">
                    <FilePlus2 className="mr-2 h-4 w-4"/>
                    Create a Document
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
