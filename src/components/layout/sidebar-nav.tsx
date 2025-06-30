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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, LayoutDashboard, User, FolderKanban, ChevronDown, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
    { href: '/app/tools', label: 'Legal Tools', icon: Wrench },
    { href: '/app/documents', label: 'Saved Documents', icon: FolderKanban },
  ];

  const isDashboardActive = pathname === '/app' || pathname === '/app/profile';

  return (
    <>
      <div className="flex-1 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <SidebarMenuButton isActive={isDashboardActive} tooltip="Dashboard" className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </div>
                    <ChevronDown className="h-4 w-4 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/app">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Overview</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/app/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

          {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
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
          </div>
        </div>
      </div>
    </>
  );
}
