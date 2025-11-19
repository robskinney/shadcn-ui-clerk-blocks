import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";

export default function SignUpContinue() {
  return (
    <SignUp.Step name="continue">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Continue registration</CardTitle>
        </CardHeader>
        <CardContent>
          <Clerk.Field name="username" className="space-y-2">
            <Clerk.Label>
              <Label>Username</Label>
            </Clerk.Label>
            <Clerk.Input type="text" required asChild>
              <Input />
            </Clerk.Input>
            <Clerk.FieldError className="block text-sm text-destructive" />
          </Clerk.Field>
        </CardContent>
        <CardFooter>
          <div className="grid w-full gap-y-4">
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
          </div>
        </CardFooter>
      </Card>
    </SignUp.Step>
  );
}
