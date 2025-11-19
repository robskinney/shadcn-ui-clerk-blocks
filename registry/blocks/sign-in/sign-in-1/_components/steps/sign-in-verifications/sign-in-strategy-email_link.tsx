import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { RotateCcw } from "lucide-react";

export default function SignInStrategyEmailLink() {
  return (
    <SignIn.Strategy name="email_link">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            Click the magic link your email (
            <SignIn.SafeIdentifier />) to authenticate.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="grid w-full gap-y-4">
            <div className="flex w-full h-24 items-center justify-center">
              <Spinner />
            </div>

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
