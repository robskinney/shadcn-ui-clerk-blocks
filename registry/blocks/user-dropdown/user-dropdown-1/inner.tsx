"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

export default function UserDropdown1Inner({
  user,
  dropdownMenuContentProps
}: {
  user: Partial<UserResource> | Partial<User>;
  dropdownMenuContentProps: DropdownMenuContentProps
}) {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex flex-row w-20 h-11 items-center justify-between rounded-3xl py-1.5 px-3 gap-1 transition-all hover:shadow-md duration-100"
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
        className="w-full"
        {...dropdownMenuContentProps}
      >
        <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
          <LogOut className="mr-1 " size={20} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
