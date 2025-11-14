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
import { OAuthStrategy, SessionVerificationLevel } from "@clerk/types";
import { DotIcon } from "lucide-react";
import { SocialAccountActionsDropdown } from "./actions-dropdown";
import { useReverification, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { VerificationComponent } from "@/registry/blocks/verification-component";
import {
  isClerkRuntimeError,
  isReverificationCancelledError,
} from "@clerk/nextjs/errors";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function SocialAccounts1({
  enabledStrategies,
  redirectUrl = "/",
}: SocialAccounts1Props) {
  const router = useRouter();

  const { user, isLoaded } = useUser();

  const [linkingProvider, setLinkingProvider] = useState<OAuthStrategy | null>(
    null
  );

  const linkedAccounts = useMemo(() => {
    if (!user?.externalAccounts) return new Map();

    return new Map(
      user.externalAccounts.map((account) => [account.provider, account])
    );
  }, [user]);

  const [verificationState, setVerificationState] = useState<
    | {
        complete: () => void;
        cancel: () => void;
        level: SessionVerificationLevel | undefined;
        inProgress: boolean;
      }
    | undefined
  >(undefined);

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
      // user?.reload();
    }
  };

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

                  const userAccount = linkedAccounts.get(providerInfo.alias);
                  const isLinked = !!userAccount;

                  return (
                    <TableRow key={providerKey}>
                      <TableCell>
                        <div className="flex flex-row items-center h-full gap-2">
                          <Icon className="size-5" />
                          <div className="flex flex-row items-center gap-1">
                            <p>{providerInfo.name}</p>
                            {isLoaded ? (
                              isLinked && (
                                <>
                                  <DotIcon className="size-4 stroke-muted-foreground" />
                                  <p className="text-muted-foreground">
                                    {userAccount?.emailAddress}
                                  </p>
                                </>
                              )
                            ) : (
                              <div className="pl-2">
                                <Skeleton className="h-5 w-40" />
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-end">
                        {isLoaded && user ? (
                          isLinked ? (
                            <SocialAccountActionsDropdown
                              accountId={userAccount.id!}
                              user={user}
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
                          )
                        ) : (
                          <Skeleton className="size-8 rounded-md ml-auto" />
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
