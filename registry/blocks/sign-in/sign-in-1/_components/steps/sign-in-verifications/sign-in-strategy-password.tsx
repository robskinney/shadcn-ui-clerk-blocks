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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, RotateCcw } from "lucide-react";

export type SignInStrategyPasswordProps = {
  isGlobalLoading: boolean;
};

export default function SignInStrategyPassword({
  isGlobalLoading,
}: SignInStrategyPasswordProps) {
  return (
    <SignIn.Strategy name="password">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Almost there!</CardTitle>
          <CardDescription>
            Please enter your password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4">
          <Clerk.Field name="password" className="space-y-2">
            <Clerk.Label asChild>
              <Label>Password</Label>
            </Clerk.Label>
            <Clerk.Input type="password" placeholder="*******" asChild>
              <Input />
            </Clerk.Input>
            <Clerk.FieldError className="block text-sm text-destructive" />
          </Clerk.Field>
        </CardContent>
        <CardFooter>
          <div className="grid w-full gap-y-4">
            <SignIn.Action submit asChild>
              <Button disabled={isGlobalLoading}>
                <Clerk.Loading>
                  {(isLoading) => {
                    return isLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <p>Continue</p> <ArrowRight />
                      </>
                    );
                  }}
                </Clerk.Loading>
              </Button>
            </SignIn.Action>
            <SignIn.Action navigate="start" asChild>
              <Button type="button" variant="outline">
                <RotateCcw />
                <p>Restart</p>
              </Button>
            </SignIn.Action>
            <SignIn.Action navigate="choose-strategy" asChild>
              <Button type="button" size="sm" variant="link">
                Use another method
              </Button>
            </SignIn.Action>
          </div>
        </CardFooter>
      </Card>
    </SignIn.Strategy>
  );
}
