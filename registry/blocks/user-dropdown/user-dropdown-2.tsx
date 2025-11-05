"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";

type UserDropdown2Props = {
  user?: Partial<UserResource> | Partial<User> | null;
};

export default function UserDropdown2({ user }: UserDropdown2Props) {
  if (user) {
    return <UserDropdown2Inner user={user} />;
  }

  return <UserDropdown2WithClerk />;
}

function UserDropdown2WithClerk() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <Skeleton className="w-20" />;
  if (!isSignedIn || !user)
    return (
      <p className="text-primary dark:text-secondary-foreground">Sign in</p>
    );

  return <UserDropdown2Inner user={user} />;
}

function UserDropdown2Inner({
  user,
}: {
  user: Partial<UserResource> | Partial<User>;
}) {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-row items-center gap-2 p-2 w-64 h-12 transition-all duration-100 hover:shadow-md"
        >
          <Avatar className="size-8 rounded-full bg-slate-400">
            <AvatarImage
              src={user.imageUrl}
              alt={user.fullName ? user.fullName : user.username!}
            />

            <AvatarFallback className="outline-1 outline-primary bg-linear-to-tr from-pink-300 to-primary/75" />
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.fullName}</span>
            <span className="truncate text-xs text-muted-foreground">
              {String(user.primaryEmailAddress)}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={8}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck className="mr-1 " size={20} />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-1 " size={20} />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
          <LogOut className="mr-1 " size={20} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
