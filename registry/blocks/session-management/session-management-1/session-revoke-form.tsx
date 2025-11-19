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
import { revokeSession } from "./actions";
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
import { useAuth, useSession } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

export function SessionRevokeForm({ sessionId }: { sessionId: string }) {
  const { signOut } = useAuth();
  const { session, isLoaded } = useSession();
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRevoke() {
    if (!session) {
      toast.warning("You must be logged in to use this functionality.");
    } else {
      try {
        if (session.id === sessionId) {
          signOut();
        } else {
          await revokeSession(sessionId);
          toast.success("Session revoked successfully.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to revoke session.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <DropdownMenu modal={false}>
        {isLoaded ? (
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="Open menu" size="icon-sm">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
        ) : (
          <Skeleton className="size-8 rounded-md ml-auto" />
        )}

        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>Session Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setShowRevokeDialog(true)}
              disabled={!isLoaded}
            >
              {session && session.id === sessionId ? "Log out" : "Revoke"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {session && session.id === sessionId
                ? "Sign out this device?"
                : "Revoke this session?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This device will be logged out immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleRevoke} disabled={loading}>
                {loading
                  ? session && session.id === sessionId
                    ? "Logging out..."
                    : "Revoking..."
                  : "Confirm"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
