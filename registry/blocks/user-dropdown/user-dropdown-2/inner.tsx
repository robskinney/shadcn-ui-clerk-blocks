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
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

export default function UserDropdown2Inner({
  imageUrl,
  fullName,
  username,
  primaryEmailAddress,
  dropdownMenuContentProps,
}: {
  imageUrl?: string;
  fullName?: string | null;
  username?: string | null;
  primaryEmailAddress?: string | null;
  dropdownMenuContentProps: DropdownMenuContentProps
}) {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-row items-center gap-2 p-2 w-full max-w-64 h-12 transition-all duration-100 hover:shadow-md"
        >
          <Avatar className="size-8 rounded-full bg-slate-400">
            <AvatarImage
              src={imageUrl}
              alt={
                fullName
                  ? fullName
                  : username
                  ? username
                  : "User profile picture"
              }
            />

            <AvatarFallback className="outline-1 outline-primary bg-linear-to-tr from-pink-300 to-primary/75" />
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{fullName}</span>
            <span className="truncate text-xs text-muted-foreground">
              {primaryEmailAddress}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) rounded-lg"
        {...dropdownMenuContentProps}
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
