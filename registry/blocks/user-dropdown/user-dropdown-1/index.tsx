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
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export type UserDropdown1Props = {
  /**
   * A Clerk [User](https://clerk.com/docs/reference/javascript/user) object retrieved from either the frontend or backend SDK.
   **/
  user?: Partial<UserResource> | Partial<User>;
  /**
   * [DropdownMenuContent](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#content)
   * props that drill down to the content of the UserDropdown.
   * @default {side: "bottom", align: "end"}
   **/
  dropdownMenuContentProps?: DropdownMenuContentProps;
};

export default function UserDropdown1({
  user: propUser,
  dropdownMenuContentProps = { side: "bottom", align: "end" },
}: UserDropdown1Props) {
  const { signOut } = useAuth();

  const { user: hookUser, isLoaded } = !propUser
    ? useUser()
    : { user: null, isLoaded: true };

  const user = propUser || hookUser;

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
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full" {...dropdownMenuContentProps}>
        <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
          <LogOut className="mr-1" size={20} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
