import * as SignUp from "@clerk/elements/sign-up";
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

export default function SignUpStrategyEmailLink() {
  return (
    <SignUp.Strategy name="email_link">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            Click the magic link your email to authenticate.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="grid w-full gap-y-4">
            <div className="flex w-full h-24 items-center justify-center">
              <Spinner />
            </div>

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
