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
import { fetchSocialAccounts } from "./fetchers";
import { EnhancedExternalAccount } from "./types";
import { Button } from "@/components/ui/button";
import { DotIcon } from "lucide-react";

export type SocialAccounts1Props = {
  accounts?: EnhancedExternalAccount[] | null;
};

export default function SocialAccounts1({ accounts }: SocialAccounts1Props) {
  if (accounts) {
    return <SocialAccounts1Inner accounts={accounts} />;
  }

  return <SocialAccounts1WithClerk />;
}

async function SocialAccounts1WithClerk() {
  const accounts = await fetchSocialAccounts();

  if (!accounts || accounts.length === 0) return <p>No Accounts found.</p>;

  return <SocialAccounts1Inner accounts={accounts} />;
}

function SocialAccounts1Inner({
  accounts,
}: {
  accounts: Partial<EnhancedExternalAccount>[];
}) {
  return (
    <Card className="w-full p-3">
      <CardContent className="flex flex-col gap-y-4 p-5">
        <CardTitle className="flex flex-row">
          <h1>Social Accounts</h1>
        </CardTitle>
        <ScrollArea>
          <Table className="mb-3">
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="flex flex-row items-center h-full gap-2">
                      {a.providerIcon && <a.providerIcon className="size-5" />}

                      <div className="flex flex-row items-center gap-0">
                        <p>{a.providerName}</p>
                        <DotIcon className="size-4 stroke-muted-foreground" />
                        <p className="text-muted-foreground">
                          {a.emailAddress}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Link
                    </Button>
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
