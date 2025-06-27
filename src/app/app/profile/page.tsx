'use client';
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
      <p className="text-muted-foreground mt-2">
        Manage your account settings.
      </p>

      <Card className="mt-8 max-w-2xl">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            This information is linked to your authentication provider.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={currentUser.photoURL || undefined} />
                    <AvatarFallback>{currentUser.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold">{currentUser.displayName || "No display name"}</h3>
                    <p className="text-sm text-muted-foreground">Profile picture and name.</p>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={currentUser.email || ''} readOnly disabled />
            </div>
             <div className="space-y-2">
                <Label htmlFor="uid">User ID</Label>
                <Input id="uid" value={currentUser.uid} readOnly disabled />
            </div>
            <div>
                 <Button disabled>Update Profile</Button>
                 <p className="text-xs text-muted-foreground mt-2">Profile updates are not yet enabled.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
