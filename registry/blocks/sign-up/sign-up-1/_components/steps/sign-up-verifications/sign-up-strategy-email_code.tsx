import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, RotateCcw } from "lucide-react";

export type SignUpStrategyEmailCodeProps = {
  isGlobalLoading: boolean;
};

export default function SignUpStrategyEmailCode({
  isGlobalLoading,
}: SignUpStrategyEmailCodeProps) {
  return (
    <SignUp.Strategy name="email_code">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            Enter the verification code sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4">
          <Clerk.Field name="code">
            <Clerk.Label className="sr-only">
              Email verification code
            </Clerk.Label>
            <div className="grid gap-y-2 items-center justify-center">
              <div className="flex justify-center text-center">
                <Clerk.Input
                  type="otp"
                  autoSubmit
                  className="flex justify-center has-disabled:opacity-50"
                  render={({ value, status }) => {
                    return (
                      <div
                        data-status={status}
                        className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring"
                      >
                        {value}
                      </div>
                    );
                  }}
                />
              </div>
              <Clerk.FieldError className="block text-sm text-destructive text-center" />
              <SignUp.Action
                asChild
                resend
                className="text-muted-foreground"
                fallback={({ resendableAfter }) => (
                  <Button variant="link" size="sm" disabled>
                    Didn&apos;t receive a code? Resend (
                    <span className="tabular-nums">{resendableAfter}</span>)
                  </Button>
                )}
              >
                <Button variant="link" size="sm">
                  Didn&apos;t receive a code? Resend
                </Button>
              </SignUp.Action>
            </div>
          </Clerk.Field>
        </CardContent>
        <CardFooter>
          <div className="grid w-full gap-y-4">
            <SignUp.Action submit asChild>
              <Button disabled={isGlobalLoading}>
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
            </SignUp.Action>
            <SignUp.Action navigate="start" asChild>
              <Button type="button" variant="outline">
                <RotateCcw />
                <p>Restart</p>
              </Button>
            </SignUp.Action>
          </div>
        </CardFooter>
      </Card>
    </SignUp.Strategy>
  );
}
