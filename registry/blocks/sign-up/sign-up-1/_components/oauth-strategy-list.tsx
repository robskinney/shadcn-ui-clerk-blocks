"use client";

import * as Clerk from "@clerk/elements/common";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OAuthProvider, OAuthStrategy } from "@clerk/types";
import { getExternalAccount } from "@/registry/lib/format-external-accounts";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const oauthStrategyButtonVariants = cva(
  "flex w-full justify-center items-center mx-auto gap-2",
  {
    variants: {
      variant: {
        default: "",
        iconOnly: "",
      },
      size: {
        sm: "sm",
        default: "sm",
        lg: "lg",
        icon: "icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export type OAuthStrategyButtonVariants = VariantProps<
  typeof oauthStrategyButtonVariants
>;

export type OAuthStrategyListProps = {
  enabledOAuthStrategies: OAuthStrategy[];
  isGlobalLoading: boolean;
  variant: OAuthStrategyButtonVariants["variant"];
  size: OAuthStrategyButtonVariants["size"];
};

export default function OAuthStrategyList({
  enabledOAuthStrategies,
  isGlobalLoading,
  variant,
  size,
}: OAuthStrategyListProps) {
  return (
    <div
      className={cn(
        "gap-3",
        variant == "default"
          ? "grid grid-cols-1 sm:grid-cols-2 grid-flow-dense"
          : "flex flex-row"
      )}
    >
      {enabledOAuthStrategies.map((s) => {
        const acc = getExternalAccount(s);
        const scope: `provider:${OAuthProvider}` = `provider:${acc.alias}`;

        return (
          <Clerk.Connection name={acc.alias} key={s} asChild>
            <Button
              variant="outline"
              type="button"
              className={cn("sm:last:odd:col-span-2 flex-1", variant)}
              size={size}
              disabled={isGlobalLoading}
            >
              <Clerk.Loading scope={scope}>
                {(isLoading) =>
                  isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <acc.icon className="size-4.5" />
                      {variant == "default" && (
                        <span className="label">{acc.name}</span>
                      )}
                    </>
                  )
                }
              </Clerk.Loading>
            </Button>
          </Clerk.Connection>
        );
      })}
    </div>
  );
}
