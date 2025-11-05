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
import { Mail, Verified } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EmailAddForm } from "./email-add-form";
import { EnhancedEmailAddress, EnhancedLinkedTo } from "./types";
import { EmailActionsDropdown } from "./email-actions-dropdown";
import { fetchEmailAddresses } from "./fetchers";

export type EmailManagement1Props = {
  emails?: EnhancedEmailAddress[] | null;
};

export default function EmailManagement1({ emails }: EmailManagement1Props) {
  if (emails) {
    return <EmailManagement1Inner emails={emails} />;
  }

  return <EmailManagement1WithClerk />;
}

async function EmailManagement1WithClerk() {
  const emails = await fetchEmailAddresses();

  if (!emails || emails.length === 0) return <p>No Emails found.</p>;

  return <EmailManagement1Inner emails={emails} />;
}

function EmailManagement1Inner({
  emails,
}: {
  emails: Partial<EnhancedEmailAddress>[];
}) {
  return (
    <Card className="w-full p-3">
      <CardContent className="flex flex-col gap-y-4 p-5">
        <CardTitle className="flex flex-row justify-between items-center">
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
                <TableRow key={e.id} className="flex my-auto">
                  <TableCell className="flex flex-row gap-2 items-center">
                    <Mail className="size-4 stroke-muted-foreground" />

                    <p>{e.emailAddress}</p>

                    {e.verification?.status == "verified" && (
                      <Verified className="size-4 stroke-green-700 dark:stroke-green-400" />
                    )}
                    {e.isPrimary && (
                      <Badge className="font-bold text-[0.6rem] bg-green-50 text-green-700 dark:bg-green-900/15 dark:text-green-400 dark:border-green-200/15">
                        Primary
                      </Badge>
                    )}
                    {e.linkedTo && e.linkedTo.length > 0 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="secondary" className="text-[0.6rem]">
                            Linked
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          {`Linked via ${e.linkedTo
                            ?.map(
                              (l: EnhancedLinkedTo) => l.linkedToDisplayName
                            )
                            .filter(Boolean)
                            .join(", ")}`}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <EmailActionsDropdown
                      emailId={e.id!}
                      isPrimary={e.isPrimary!}
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
