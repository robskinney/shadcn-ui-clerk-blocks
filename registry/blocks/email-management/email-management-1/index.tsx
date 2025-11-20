"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, TriangleAlert, Verified } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EmailAddForm } from "./email-add-form";
import { EmailActionsDropdown } from "./email-actions-dropdown";
import { IdentificationLinkJSON, UserResource } from "@clerk/types";
import { getExternalAccount } from "@/registry/lib/format-external-accounts";
import { User } from "@clerk/backend";
import { formatUserEmails } from "./utils";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { FormattedEmailAddress } from "./types";

export type EmailManagement1Props = {
  /**
   * A Clerk [User](https://clerk.com/docs/reference/javascript/user) object retrieved from either the frontend or backend SDK.
   **/
  user?: Partial<UserResource> | Partial<User>;
};

export default function EmailManagement1({
  user: propUser,
}: EmailManagement1Props) {
  const { user: hookUser, isLoaded: hookLoaded } = useUser();

  const user = propUser ?? hookUser;
  const isLoaded = propUser ? true : hookLoaded;

  const [emails, setEmails] = useState<FormattedEmailAddress[]>([]);

  useEffect(() => {
    if (user && isLoaded) {
      setEmails(formatUserEmails(user));
    }
  }, [user, isLoaded]);

  return (
    <Card className="w-full p-3 transition-all duration-300 ease-out">
      <CardContent className="flex flex-col gap-y-4 p-5">
        <CardTitle className="flex flex-row justify-between items-center gap-3">
          <h1>Email Addresses</h1>
          <EmailAddForm setEmails={setEmails} />
        </CardTitle>
        <ScrollArea>
          <Table className="mb-3">
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoaded ? (
                emails.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="flex flex-row items-center h-full gap-2">
                        <Mail className="size-4 stroke-muted-foreground" />

                        <p>{e.emailAddress}</p>

                        {e.isVerified ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Verified className="size-4 stroke-green-700 dark:stroke-green-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              This email address is verified.
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <TriangleAlert className="size-4 stroke-orange-400 dark:stroke-orange-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              This email address is not verified.
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {e.isPrimary && (
                          <Badge className="font-bold text-[0.6rem] bg-green-50 text-green-700 dark:bg-green-900/15 dark:text-green-400 dark:border-green-200/15">
                            Primary
                          </Badge>
                        )}

                        {e.linkedTo && e.linkedTo.length > 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="secondary"
                                className="text-[0.6rem]"
                              >
                                Linked
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              {`Linked via ${e.linkedTo
                                ?.map(
                                  (l: IdentificationLinkJSON) =>
                                    getExternalAccount(l.type).name
                                )
                                .filter(Boolean)
                                .join(", ")}`}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <EmailActionsDropdown
                        emailId={e.id!}
                        isPrimary={e.isPrimary!}
                        isLinked={!!(e.linkedTo && e.linkedTo.length)}
                        setEmails={setEmails}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>
                    <div className="flex flex-row items-center h-full gap-2">
                      <Mail className="size-4 stroke-muted-foreground" />

                      <Skeleton className="h-5 w-36" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="size-8 rounded-md ml-auto" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
