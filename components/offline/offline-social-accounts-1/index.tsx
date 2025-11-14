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
import { Button } from "@/components/ui/button";
import { getExternalAccount } from "@/registry/lib/format-external-accounts";
import { OAuthStrategy } from "@clerk/types";
import { DotIcon } from "lucide-react";
import { SocialAccountActionsDropdown } from "./actions-dropdown";
import { toast } from "sonner";

export type SocialAccounts1Props = {
  /**
   * A list of enabled Clerk [OAuthStrategy](https://clerk.com/docs/reference/javascript/types/sso#o-auth-strategy) strings.
   * @example ["oauth_google", "oauth_microsoft"]
   **/
  enabledStrategies: OAuthStrategy[];
  /**
   * The URL to redirect to after successfully linking an account.
   * @default "/"
   **/
  redirectUrl?: string;
};

export default function OfflineSocialAccounts1({
  enabledStrategies,
}: SocialAccounts1Props) {
  function handleLink() {
    toast.warning("You must be logged in to use this functionality.");
  }

  return (
    <>
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
                {enabledStrategies.map((providerKey) => {
                  const providerInfo = getExternalAccount(providerKey);
                  const Icon = providerInfo.icon;

                  return (
                    <TableRow key={providerKey}>
                      <TableCell>
                        <div className="flex flex-row items-center h-full gap-2">
                          <Icon className="size-5" />
                          <div className="flex flex-row items-center gap-1">
                            <p>{providerInfo.name}</p>
                            {providerInfo.alias == "microsoft" && (
                              <>
                                <DotIcon className="size-4 stroke-muted-foreground" />
                                <p className="text-muted-foreground">
                                  robertskinney@outlook.com
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-end">
                        {providerInfo.alias == "microsoft" ? (
                          <SocialAccountActionsDropdown
                            accountId={providerInfo.name}
                          />
                        ) : (
                          <Button
                            disabled={providerInfo.name == "microsoft"}
                            onClick={() => handleLink()}
                            variant="outline"
                            size="sm"
                          >
                            Link
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
