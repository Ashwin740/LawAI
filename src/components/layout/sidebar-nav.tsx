'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/auth';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, LayoutDashboard, FileText, User, Users, FolderKanban, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, role, setRole } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setRole(null); // Clear role from context and localStorage
      router.push('/');
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Logout Failed', description: 'An error occurred during logout.' });
    }
  };

  if (!currentUser) {
    return (
        <div className="p-2 space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
        </div>
    );
  }
  
  const menuItems = [
    { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/app/tools', label: 'Legal Tools', icon: FileText },
    { href: '/app/documents', label: 'Saved Documents', icon: FolderKanban },
    { href: '/app/clients', label: 'Clients', icon: Users, role: 'professional' },
    { href: '/app/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      <div className="flex-1 p-2">
        <SidebarMenu>
          {menuItems.map((item) => {
            if (item.role && item.role !== role) {
              return null;
            }
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </div>
      <div className='p-2'>
        <SidebarSeparator />
        <div className="flex items-center gap-2 p-2 mt-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.photoURL || undefined} />
            <AvatarFallback>{currentUser.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="font-medium truncate">{currentUser.displayName || currentUser.email}</span>
            {role && <span className="text-xs text-muted-foreground capitalize flex items-center gap-1"><Briefcase className="w-3 h-3"/>{role}</span>}
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Log Out">
              <LogOut />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </>
  );
}
