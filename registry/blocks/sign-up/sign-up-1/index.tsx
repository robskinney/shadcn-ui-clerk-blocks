"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
import { SignUpRequiredFields } from "./_components/types";
import { OAuthStrategy } from "@clerk/types";
import SignUpVerifications from "./_components/steps/sign-up-verifications";
import SignUpContinue from "./_components/steps/sign-up-continue";
import SignUpStart from "./_components/steps/sign-up-start";

export type SignUp1Props = {
  /**
   * The required to show on the main page of the component.
   * @default ["emailAddress", "password"]
   **/
  requiredFields?: SignUpRequiredFields;
  /**
   * A list of enabled Clerk [OAuthStrategy](https://clerk.com/docs/reference/javascript/types/sso#o-auth-strategy) strings.
   * @example ["oauth_google", "oauth_microsoft"]
   **/
  enabledOAuthStrategies?: OAuthStrategy[];
  /**
   * The route the user can login from.
   * @default "/sign-in"
   **/
  signInUrl?: string;
  /**
   * Disable the functionality of this component for demo purposes.
   * @default false
   **/
  exampleMode?: boolean;
};

export default function SignUp1({
  requiredFields = ["emailAddress", "firstName", "lastName", "password"],
  enabledOAuthStrategies = ["oauth_google", "oauth_microsoft"],
  exampleMode,
  signInUrl = "/sign-in",
}: SignUp1Props) {
  const pathname = usePathname();
  const { isLoaded } = useAuth();

  // Show loading state when autoConfig is enabled and data is loading
  if (!isLoaded) {
    return <Skeleton className="h-[350px] w-96 rounded-xl" />;
  }

  return (
    <SignUp.Root path={pathname} exampleMode={exampleMode}>
      <Clerk.Loading>
        {(isGlobalLoading) => (
          <>
            <SignUpStart
              isGlobalLoading={isGlobalLoading}
              enabledOAuthStrategies={enabledOAuthStrategies}
              oauthStrategyButtonVariant="iconOnly"
              oauthStrategyButtonSize={"sm"}
              variant="concise"
              requiredFields={requiredFields}
              signInUrl={signInUrl}
            />

            <SignUpContinue />

            <SignUpVerifications isGlobalLoading={isGlobalLoading} />

            <div id="clerk-captcha" />
          </>
        )}
      </Clerk.Loading>
    </SignUp.Root>
  );
}
