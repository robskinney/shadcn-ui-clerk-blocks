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
import { Button } from "@/components/ui/button";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/backend";
import { Skeleton } from "@/components/ui/skeleton";

export type UserDropdown2Props = {
  /**
   * A Clerk [User](https://clerk.com/docs/reference/javascript/user) object retrieved from either the frontend or backend SDK.
   **/
  user?: Partial<UserResource> | Partial<User>;
  /**
   * [DropdownMenuContent](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#content)
   * props that drill down to the content of the UserDropdown.
   * @default {side: "bottom", align: "end", sideOffset: 8}
   **/
  dropdownMenuContentProps?: DropdownMenuContentProps;
};

export default function UserDropdown2({
  user: propUser,
  dropdownMenuContentProps = { side: "bottom", align: "end", sideOffset: 8 },
}: UserDropdown2Props) {
  const { signOut } = useAuth();

  const { user: hookUser, isLoaded: hookLoaded } = useUser();

  const user = propUser ?? hookUser;
  const isLoaded = propUser ? true : hookLoaded;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-row items-center gap-2 p-2 w-full max-w-64 h-12 transition-all duration-100 hover:shadow-md"
        >
          {isLoaded && user ? (
            <Avatar className="aspect-square size-8 rounded-full bg-slate-400">
              <AvatarImage
                src={user.imageUrl}
                className="object-cover"
                alt="User profile picture"
              />
              <AvatarFallback />
            </Avatar>
          ) : (
            <Skeleton className={`size-8 rounded-full`} />
          )}

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {isLoaded && user ? (
                user.fullName
              ) : (
                <Skeleton className="w-24 h-4" />
              )}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {isLoaded && user ? (
                user.primaryEmailAddress?.emailAddress
              ) : (
                <Skeleton className="w-32 h-3 mt-1" />
              )}
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
