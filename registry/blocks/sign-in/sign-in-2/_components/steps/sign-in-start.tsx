import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";
import AuthSectionSeparator from "@/registry/blocks/sign-in/sign-in-2/_components/auth-section-separator";
import AuthField from "@/registry/blocks/sign-in/sign-in-2/_components/auth-field";
import { OAuthStrategy } from "@clerk/types";
import OAuthStrategyList, {
  OAuthStrategyButtonVariants,
} from "@/registry/blocks/sign-in/sign-in-2/_components/oauth-strategy-list";
import { SignInRequiredFields } from "@/registry/blocks/sign-in/sign-in-2/_components/types";
import { cva, VariantProps } from "class-variance-authority";

const signInStartVariants = cva(
  "flex w-full justify-center items-center mx-auto gap-2",
  {
    variants: {
      variant: {
        default: "",
        concise: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type SignInStartVariants = VariantProps<typeof signInStartVariants>;

export type SignInStartProps = {
  enabledOAuthStrategies?: OAuthStrategy[];
  oauthStrategyButtonVariant?: OAuthStrategyButtonVariants["variant"];
  oauthStrategyButtonSize?: OAuthStrategyButtonVariants["size"];
  variant?: SignInStartVariants["variant"];
  isGlobalLoading: boolean;
  requiredFields: SignInRequiredFields;
  signUpUrl: string;
};

export default function SignInStart({
  enabledOAuthStrategies,
  oauthStrategyButtonVariant = "default",
  oauthStrategyButtonSize = "sm",
  variant = "default",
  isGlobalLoading,
  requiredFields,
  signUpUrl,
}: SignInStartProps) {
  return (
    <SignIn.Step name="start">
      <Card className="w-full sm:w-96 p-3">
        <CardContent className="flex flex-col gap-y-6 p-5">
          <div className="flex flex-col gap-y-2">
            <CardTitle>Acme, Inc.</CardTitle>
            <CardDescription>
              Please enter your credentials to continue.
            </CardDescription>
          </div>

          {variant == "default" && enabledOAuthStrategies && (
            <>
              <OAuthStrategyList
                enabledOAuthStrategies={enabledOAuthStrategies}
                isGlobalLoading={isGlobalLoading}
                variant={oauthStrategyButtonVariant}
                size={oauthStrategyButtonSize}
              />

              <AuthSectionSeparator />
            </>
          )}

          {requiredFields.map((f) => (
            <AuthField field={f} key={f} />
          ))}
        </CardContent>

        <CardFooter className="flex flex-col w-full gap-y-4">
          <SignIn.Action submit asChild>
            <Button className="w-full" disabled={isGlobalLoading}>
              <Clerk.Loading>
                {(isLoading) => {
                  return isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <p>Continue</p>
                      <ArrowRight />
                    </>
                  );
                }}
              </Clerk.Loading>
            </Button>
          </SignIn.Action>

          {variant == "concise" && enabledOAuthStrategies && (
            <div className="w-full">
              <OAuthStrategyList
                enabledOAuthStrategies={enabledOAuthStrategies}
                isGlobalLoading={isGlobalLoading}
                variant={oauthStrategyButtonVariant}
                size={oauthStrategyButtonSize}
              />
            </div>
          )}

          <Button variant="link" size="sm" asChild>
            <Link
              href={signUpUrl}
              className="text-primary dark:text-secondary-foreground w-full text-wrap"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </SignIn.Step>
  );
}
