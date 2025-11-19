"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { usePathname } from "next/navigation";
import { OAuthStrategy } from "@clerk/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
import SignInStart from "@/registry/blocks/sign-in/sign-in-1/_components/steps/sign-in-start";
import SignInChooseStrategy from "@/registry/blocks/sign-in/sign-in-1/_components/steps/sign-in-choose-strategy";
import SignInVerifications from "@/registry/blocks/sign-in/sign-in-1/_components/steps/sign-in-verifications";
import { SignInRequiredFields } from "@/registry/blocks/sign-in/sign-in-1/_components/types";

export type SignIn1Props = {
  /**
   * The required to show on the main page of the component.
   * @default ["emailAddress", "password"]
   **/
  requiredFields?: SignInRequiredFields;
  /**
   * A list of enabled Clerk [OAuthStrategy](https://clerk.com/docs/reference/javascript/types/sso#o-auth-strategy) strings.
   * @example ["oauth_google", "oauth_microsoft"]
   **/
  enabledOAuthStrategies?: OAuthStrategy[];
  /**
   * The route the user can navigate to for registration.
   * @default "/sign-up"
   **/
  signUpUrl?: string;
  /**
   * Disable the functionality of this component for demo purposes.
   * @default false
   **/
  exampleMode?: boolean;
};

export default function SignIn1({
  requiredFields: requiredFieldsProp = ["emailAddress", "password"],
  enabledOAuthStrategies: enabledOAuthStrategiesProp,
  signUpUrl = "/sign-up",
  exampleMode,
}: SignIn1Props) {
  const pathname = usePathname();
  const { isLoaded } = useAuth();

  // Determine final values based on autoConfig
  let requiredFields = requiredFieldsProp;
  let enabledOAuthStrategies = enabledOAuthStrategiesProp;

  // Show loading state when autoConfig is enabled and data is loading
  if (!isLoaded) {
    return <Skeleton className="h-[350px] w-96 rounded-xl" />;
  }

  return (
    <SignIn.Root path={pathname} exampleMode={exampleMode}>
      <Clerk.Loading>
        {(isGlobalLoading) => (
          <>
            <SignInStart
              isGlobalLoading={isGlobalLoading}
              enabledOAuthStrategies={enabledOAuthStrategies}
              oauthStrategyButtonVariant={"default"}
              oauthStrategyButtonSize={"sm"}
              requiredFields={requiredFields}
              signUpUrl={signUpUrl}
            />

            <SignInChooseStrategy isGlobalLoading={isGlobalLoading} />

            <SignInVerifications isGlobalLoading={isGlobalLoading} />

            <div id="clerk-captcha" />
          </>
        )}
      </Clerk.Loading>
    </SignIn.Root>
  );
}
