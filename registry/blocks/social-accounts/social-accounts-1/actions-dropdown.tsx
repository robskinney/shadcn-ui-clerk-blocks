"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@clerk/nextjs";
import { deleteSocialAccount } from "./actions";
import { UserResource } from "@clerk/types";

export function SocialAccountActionsDropdown({
  accountId,
  user,
}: {
  accountId: string;
  user: UserResource;
}) {
  const { isSignedIn } = useAuth();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    if (!isSignedIn) {
      toast.warning("You must be logged in to use this functionality.");
    } else {
      setLoading(true);
      try {
        await deleteSocialAccount(accountId);
        user.reload();
        toast.success("Account removed successfully.");
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occured removing the social account.");
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>Email Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setShowRemoveDialog(true)}
              disabled={accountId.startsWith("idn")}
            >
              Remove account
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this account?</AlertDialogTitle>
            <AlertDialogDescription>
              This social account will no longer be associated with your account
              immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleRemove} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner />
                    <p>Removing...</p>
                  </>
                ) : (
                  "Remove"
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
