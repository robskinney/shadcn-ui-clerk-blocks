import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
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
import { cva, VariantProps } from "class-variance-authority";
import { OAuthStrategy } from "@clerk/types";
import OAuthStrategyList, {
  OAuthStrategyButtonVariants,
} from "@/registry/blocks/sign-up/sign-up-1/_components/oauth-strategy-list";
import { SignUpRequiredFields } from "@/registry/blocks/sign-up/sign-up-1/_components/types";
import AuthSectionSeparator from "@/registry/blocks/sign-up/sign-up-1/_components/auth-section-separator";
import AuthField from "@/registry/blocks/sign-up/sign-up-1/_components/auth-field";

const signUpStartVariants = cva(
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

export type SignUpStartVariants = VariantProps<typeof signUpStartVariants>;

export type SignUpStartProps = {
  enabledOAuthStrategies?: OAuthStrategy[];
  oauthStrategyButtonVariant?: OAuthStrategyButtonVariants["variant"];
  oauthStrategyButtonSize?: OAuthStrategyButtonVariants["size"];
  variant?: SignUpStartVariants["variant"];
  isGlobalLoading: boolean;
  requiredFields: SignUpRequiredFields;
  signInUrl: string;
};

export default function SignUpStart({
  enabledOAuthStrategies,
  oauthStrategyButtonVariant = "default",
  oauthStrategyButtonSize = "sm",
  variant = "default",
  isGlobalLoading,
  requiredFields,
  signInUrl,
}: SignUpStartProps) {
  const nameFields = requiredFields.filter((f) => f.includes("Name"));
  const otherFields = requiredFields.filter((f) => !f.includes("Name"));
  return (
    <SignUp.Step name="start">
      <Card className="w-full sm:w-96 p-3">
        <CardContent className="flex flex-col gap-y-6 p-5">
          <div className="flex flex-col gap-y-2">
            <CardTitle>Acme, Inc.</CardTitle>
            <CardDescription>
              Please fill out the form to create your account.
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

          {nameFields && (
            <div className="flex flex-col sm:flex-row gap-x-6">
              {nameFields.map((f) => (
                <AuthField field={f} key={f} />
              ))}
            </div>
          )}

          {otherFields.map((f) => (
            <AuthField field={f} key={f} />
          ))}
        </CardContent>

        <CardFooter className="flex flex-col w-full gap-y-4">
          <SignUp.Captcha className="empty:hidden" />
          <SignUp.Action submit asChild>
            <Clerk.Loading>
              {(isLoading) => (
                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <p>Continue</p>
                      <ArrowRight />
                    </>
                  )}
                </Button>
              )}
            </Clerk.Loading>
          </SignUp.Action>

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
              href={signInUrl}
              className="text-primary dark:text-secondary-foreground w-full text-wrap"
            >
              Already have an account? Sign in
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </SignUp.Step>
  );
}
