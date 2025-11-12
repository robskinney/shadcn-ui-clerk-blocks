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
import { getExternalAccount } from "@/registry/lib/external-accounts-map";
import { OAuthStrategy, SessionVerificationLevel } from "@clerk/types";
import { EnhancedExternalAccount } from "./types";
import { DotIcon } from "lucide-react";
import { SocialAccountActionsDropdown } from "./actions-dropdown";
import { useClerk, useReverification, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { VerificationComponent } from "@/registry/blocks/verification-component";
import {
  isClerkRuntimeError,
  isReverificationCancelledError,
} from "@clerk/nextjs/errors";
import { Spinner } from "@/components/ui/spinner";

export function SocialAccounts1Inner({
  accounts,
  enabledStrategies,
  redirectUrl,
}: {
  accounts: Partial<EnhancedExternalAccount>[];
  enabledStrategies: OAuthStrategy[];
  redirectUrl: string;
}) {
  const linkedAccounts = new Map(accounts.map((a) => [a.providerName, a]));

  const [linkingProvider, setLinkingProvider] = useState<OAuthStrategy | null>(
    null
  );
  const { user, isLoaded } = useUser();

  const [verificationState, setVerificationState] = useState<
    | {
        complete: () => void;
        cancel: () => void;
        level: SessionVerificationLevel | undefined;
        inProgress: boolean;
      }
    | undefined
  >(undefined);

  const router = useRouter();

  const createExternalAccount = useReverification(
    (strategy: OAuthStrategy) =>
      user?.createExternalAccount({
        strategy,
        redirectUrl: redirectUrl,
      }),
    {
      onNeedsReverification: ({ complete, cancel, level }) => {
        setVerificationState({
          complete,
          cancel,
          level,
          inProgress: true,
        });
      },
    }
  );

  const handleLink = async (strategy: OAuthStrategy) => {
    setLinkingProvider(strategy);
    try {
      await createExternalAccount(strategy).then((res) => {
        if (res?.verification?.externalVerificationRedirectURL) {
          router.push(res.verification.externalVerificationRedirectURL.href);
        }
      });
    } catch (e) {
      console.error(e);
      // console.log(err);
      if (isClerkRuntimeError(e) && isReverificationCancelledError(e)) {
        toast.info("Verification cancelled.");
      } else {
        toast.error("Failed to connect to OAuth Provider.");
      }
    } finally {
      setLinkingProvider(null);
    }
  };
  //   if (!isLoaded) return <p>Loading...</p>;

  const { session } = useClerk();

  if (!user || !isLoaded || !session) return;

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

                  const userAccount = linkedAccounts.get(providerInfo.name);
                  const isLinked = !!userAccount;

                  return (
                    <TableRow key={providerKey}>
                      <TableCell>
                        <div className="flex flex-row items-center h-full gap-2">
                          <Icon className="size-5" />
                          <div className="flex flex-row items-center gap-1">
                            <p>{providerInfo.name}</p>
                            {isLinked && (
                              <>
                                <DotIcon className="size-4 stroke-muted-foreground" />
                                <p className="text-muted-foreground">
                                  {userAccount?.emailAddress}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        {isLinked ? (
                          <SocialAccountActionsDropdown
                            accountId={userAccount.id!}
                          />
                        ) : (
                          <Button
                            disabled={!!linkingProvider}
                            onClick={() => handleLink(providerInfo.key)}
                            variant="outline"
                            size="sm"
                          >
                            {linkingProvider === providerInfo.key ? (
                              <>
                                <Spinner />
                                <p>Linking...</p>
                              </>
                            ) : (
                              "Link"
                            )}
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
      {verificationState?.inProgress && (
        <VerificationComponent
          level={verificationState?.level}
          onComplete={() => {
            verificationState.complete();
            setVerificationState(undefined);
          }}
          onCancel={() => {
            verificationState.cancel();
            setVerificationState(undefined);
          }}
        />
      )}
    </>
  );
}
