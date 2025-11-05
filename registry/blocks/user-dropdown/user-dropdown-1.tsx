"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Menu } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";

type SIDE_OPTIONS = ["top", "right", "bottom", "left"];
type ALIGN_OPTIONS = ["start", "center", "end"];
type Side = SIDE_OPTIONS[number];
type Align = ALIGN_OPTIONS[number];

type UserDropdown1Props = {
  user?: Partial<UserResource> | Partial<User> | null;
  dropdownAlign?: Align;
  dropdownSide?: Side;
};

export default function UserDropdown1({
  user,
  dropdownAlign,
  dropdownSide,
}: UserDropdown1Props) {
  if (user) {
    return (
      <UserDropdown1Inner
        user={user}
        dropdownAlign={dropdownAlign}
        dropdownSide={dropdownSide}
      />
    );
  }

  return <UserDropdown1WithClerk />;
}

function UserDropdown1WithClerk() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <Skeleton className="w-20" />;
  if (!isSignedIn || !user)
    return (
      <p className="text-primary dark:text-secondary-foreground">Sign in</p>
    );

  return <UserDropdown1Inner user={user} />;
}

function UserDropdown1Inner({
  user,
  dropdownAlign = "end",
  dropdownSide = "bottom",
}: {
  user: Partial<UserResource> | Partial<User>;
  dropdownAlign?: Align;
  dropdownSide?: Side;
}) {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex flex-row w-20 h-11 items-center justify-between rounded-3xl py-1.5 px-3 gap-1 transition-all hover:shadow-md duration-100 cursor-pointer"
          variant="outline"
        >
          <div className="w-1/2">
            <Menu className="size-5" />
          </div>

          <div className="w-1/2">
            <Avatar className="aspect-square size-8 rounded-full bg-slate-400">
              <AvatarImage
                src={user.imageUrl}
                className="object-cover"
                alt="User profile picture"
              />
              <AvatarFallback className="outline-1 outline-primary bg-linear-to-tr from-pink-300 to-primary/75" />
            </Avatar>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={dropdownAlign}
        side={dropdownSide}
        className="w-full"
      >
        <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
          <LogOut className="mr-1 " size={20} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
