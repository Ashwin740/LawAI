import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
      <p className="text-muted-foreground mt-2">
        A list of your clients for easy reference.
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Clients</CardTitle>
          <CardDescription>
            This feature is under construction. Your client list will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center gap-4 py-16">
            <Users className="w-16 h-16 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">No Clients Added</h3>
            <p className="text-muted-foreground max-w-sm">
                This space is dedicated for you to manage your client information, linking them to specific documents and cases.
            </p>
            <Button disabled>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Client
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
