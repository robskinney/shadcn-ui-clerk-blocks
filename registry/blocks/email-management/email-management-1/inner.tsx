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
import { EnhancedEmailAddress, EnhancedLinkedTo } from "./types";
import { EmailActionsDropdown } from "./email-actions-dropdown";

export default function EmailManagement1Inner({
  emails,
}: {
  emails: Partial<EnhancedEmailAddress>[];
}) {
  return (
    <Card className="w-full p-3">
      <CardContent className="flex flex-col gap-y-4 p-5">
        <CardTitle className="flex flex-row justify-between items-center gap-3">
          <h1>Email Addresses</h1>
          <EmailAddForm />
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
              {emails.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <div className="flex flex-row items-center h-full gap-2">
                      <Mail className="size-4 stroke-muted-foreground" />

                      <p>{e.emailAddress}</p>

                      {!e.verification ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <TriangleAlert className="size-4 stroke-orange-400 dark:stroke-orange-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            This email address is not verified.
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Verified className="size-4 stroke-green-700 dark:stroke-green-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            This email address is verified.
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
                              ?.map((l: EnhancedLinkedTo) => l.providerName)
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
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
