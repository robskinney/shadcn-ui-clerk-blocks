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
import { useUser } from "@clerk/nextjs";
import { deleteEmailAddress, setEmailPrimary } from "./actions";

export function EmailActionsDropdown({
  emailId,
  isPrimary,
  isLinked,
  handleRefresh,
}: {
  emailId: string;
  isPrimary: boolean;
  isLinked: boolean;
  handleRefresh: () => void;
}) {
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    if (!user) {
      toast.warning("You must be logged in to use this functionality.");
    } else {
      setLoading(true);
      try {
        await deleteEmailAddress(emailId);
        handleRefresh();

        toast.success("Email removed successfully.");
        setShowRemoveDialog(false);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occured removing the email.");
        }
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleSetPrimary() {
    if (!user) {
      toast.warning("You must be logged in to use this functionality.");
    } else {
      setLoading(true);
      try {
        await setEmailPrimary(emailId);
        handleRefresh();

        toast.success("Email updated successfully.");
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occured updating the email.");
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <DropdownMenu
        modal={false}
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
      >
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
              onClick={() => handleSetPrimary()}
              disabled={isPrimary}
            >
              Set as primary
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              disabled={isPrimary || isLinked}
              onClick={() => setShowRemoveDialog(true)}
            >
              Remove email
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent aria-describedby="A popup requesting confirmation on removal of an email address.">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this email address?</AlertDialogTitle>
            <AlertDialogDescription>
              This email address will no longer be associated with your account
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
