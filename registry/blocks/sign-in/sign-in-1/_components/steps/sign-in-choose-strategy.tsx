import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
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
import { ArrowLeft, Key, Mail, MessageSquare } from "lucide-react";

export type SignInChooseStrategyProps = {
  isGlobalLoading: boolean;
};

export default function SignInChooseStrategy({
  isGlobalLoading,
}: SignInChooseStrategyProps) {
  return (
    <SignIn.Step name="choose-strategy">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Use another method</CardTitle>
          <CardDescription>
            Facing issues? You can use any of these methods to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4">
          <SignIn.SupportedStrategy name="email_link" asChild>
            <Button
              type="button"
              variant="secondary"
              disabled={isGlobalLoading}
            >
              <Mail />
              Magic link
            </Button>
          </SignIn.SupportedStrategy>
          <SignIn.SupportedStrategy name="email_code" asChild>
            <Button
              type="button"
              variant="secondary"
              disabled={isGlobalLoading}
            >
              <MessageSquare />
              Email code
            </Button>
          </SignIn.SupportedStrategy>
          <SignIn.SupportedStrategy name="password" asChild>
            <Button
              type="button"
              variant="secondary"
              disabled={isGlobalLoading}
            >
              <Key />
              Password
            </Button>
          </SignIn.SupportedStrategy>
        </CardContent>
        <CardFooter>
          <div className="grid w-full gap-y-4">
            <SignIn.Action navigate="previous" asChild>
              <Button disabled={isGlobalLoading}>
                <Clerk.Loading>
                  {(isLoading) => {
                    return isLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <ArrowLeft />
                        Go back
                      </>
                    );
                  }}
                </Clerk.Loading>
              </Button>
            </SignIn.Action>
          </div>
        </CardFooter>
      </Card>
    </SignIn.Step>
  );
}
