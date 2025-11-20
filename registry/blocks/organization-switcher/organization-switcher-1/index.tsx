"use client";

import { Building, Check, ChevronsUpDown, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { OrganizationCreateForm } from "./organization-add-form";

export type OrganizationSwitcher1Props = {
  /**
   * [DropdownMenuContent](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#content)
   * props that drill down to the content of the UserDropdown.
   * @default {side: "bottom", align: "end", sideOffset: 8}
   **/
  dropdownMenuContentProps?: DropdownMenuContentProps;
};

export default function OrganizationSwitcher1({
  dropdownMenuContentProps = { side: "bottom", align: "end", sideOffset: 8 },
}: OrganizationSwitcher1Props) {
  const { isSignedIn } = useAuth();
  const { organization, isLoaded: isOrganizationLoaded } = useOrganization();

  const {
    userMemberships,
    setActive,
    createOrganization,
    isLoaded: isOrganizationListLoaded,
  } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex flex-row items-center gap-2 p-2 w-full max-w-64 h-12 transition-all duration-100 hover:shadow-md"
          >
            {isOrganizationLoaded ? (
              <Avatar className="aspect-square size-8 rounded-full bg-slate-400">
                <AvatarImage
                  src={organization?.imageUrl}
                  className="object-cover"
                  alt="User profile picture"
                />
                <AvatarFallback>
                  <Building />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className={`size-8 rounded-full`} />
            )}

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {!isOrganizationLoaded ? (
                  <Skeleton className="w-24 h-4" />
                ) : organization ? (
                  organization.name
                ) : (
                  <p>Organization</p>
                )}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {!isOrganizationLoaded ? (
                  <Skeleton className="w-24 h-4" />
                ) : organization ? (
                  organization.slug
                ) : (
                  <p>No organization selected.</p>
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
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Organizations
          </DropdownMenuLabel>

          {!isSignedIn ? (
            <DropdownMenuItem disabled>
              You must be authenticated to change organizations.
            </DropdownMenuItem>
          ) : !isOrganizationListLoaded ? (
            <DropdownMenuItem disabled>
              <Spinner />
            </DropdownMenuItem>
          ) : userMemberships ? (
            userMemberships.data?.map((mem) => (
              <DropdownMenuItem
                key={mem.organization.id}
                disabled={mem.organization.id === organization?.id}
                onClick={async () => {
                  setActive({ organization: mem.organization.id });
                }}
              >
                <Avatar className="aspect-square size-8 rounded-full bg-slate-400">
                  <AvatarImage
                    src={mem.organization.imageUrl}
                    className="object-cover"
                    alt="User profile picture"
                  />
                  <AvatarFallback>
                    <Building />
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold">{mem.organization.name}</p>

                <Check
                  className={cn(
                    "ml-auto",
                    mem.organization.id === organization?.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>No organizations.</DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <OrganizationCreateForm
            createOrganization={createOrganization!}
            setActive={setActive!}
            revalidate={userMemberships.revalidate!}
          >
            <Button
              variant="ghost"
              className="w-full justify-start items-center gap-2 p-2"
              disabled={!isOrganizationListLoaded}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Create Organization
              </div>
            </Button>
          </OrganizationCreateForm>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
