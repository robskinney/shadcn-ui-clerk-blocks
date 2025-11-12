"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { usePathname } from "next/navigation";

export type SignUp1Props = {
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
  exampleMode = false,
  signInUrl = "/sign-in",
}: SignUp1Props) {
  const pathname = usePathname();

  return (
    <SignUp.Root path={pathname} exampleMode={exampleMode}>
      <Clerk.Loading>
        {(isGlobalLoading) => (
          <>
            <SignUp.Step name="start">
              <Card className="w-full sm:w-96 p-3">
                <CardContent className="flex flex-col gap-y-6 p-5">
                  <div className="flex flex-col gap-y-2">
                    <CardTitle>Acme, Inc.</CardTitle>
                    <CardDescription>
                      Please fill out the form to create your account.
                    </CardDescription>
                  </div>

                  <div className="flex flex-col gap-y-3">
                    <div className="grid grid-cols-2 gap-x-3">
                      <Clerk.Field name="firstName" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>First Name</Label>
                        </Clerk.Label>
                        <Clerk.Input
                          type="text"
                          autoComplete="given-name"
                          placeholder="Robert"
                          required
                          asChild
                        >
                          <Input name="firstName" autoComplete="given-name" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                      <Clerk.Field name="lastName" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Last Name</Label>
                        </Clerk.Label>
                        <Clerk.Input
                          type="text"
                          placeholder="Kinney"
                          autoComplete="family-name"
                          required
                          asChild
                        >
                          <Input name="lastName" autoComplete="family-name" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </div>
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input placeholder="robertskinney@outlook.com" />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                    <Clerk.Field name="password" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Password</Label>
                      </Clerk.Label>
                      <Clerk.Input type="password" required asChild>
                        <Input placeholder="*******" />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full gap-y-4">
                  <SignUp.Captcha className="empty:hidden" />
                  <SignUp.Action submit asChild>
                    <Button className="w-full" disabled={isGlobalLoading}>
                      <Clerk.Loading>
                        {(isLoading) => {
                          return isLoading ? <Spinner /> : "Continue";
                        }}
                      </Clerk.Loading>
                    </Button>
                  </SignUp.Action>
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
                      <Button disabled={isGlobalLoading}>
                        <Clerk.Loading>
                          {(isLoading) => {
                            return isLoading ? <Spinner /> : "Continue";
                          }}
                        </Clerk.Loading>
                      </Button>
                    </SignUp.Action>
                  </div>
                </CardFooter>
              </Card>
            </SignUp.Step>

            <SignUp.Step name="verifications">
              <SignUp.Strategy name="email_code">
                <Card className="w-full sm:w-96">
                  <CardHeader>
                    <CardTitle>Verify your email</CardTitle>
                    <CardDescription>
                      Use the verification link sent to your email address
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <div className="grid items-center justify-center gap-y-2">
                      <Clerk.Field name="code" className="space-y-2">
                        <Clerk.Label className="sr-only">
                          Email address
                        </Clerk.Label>
                        <div className="flex justify-center text-center">
                          <Clerk.Input
                            type="otp"
                            className="flex justify-center has-disabled:opacity-50"
                            autoSubmit
                            render={({ value, status }) => {
                              return (
                                <div
                                  data-status={status}
                                  className={cn(
                                    "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                    {
                                      "z-10 ring-2 ring-ring ring-offset-background":
                                        status === "cursor" ||
                                        status === "selected",
                                    }
                                  )}
                                >
                                  {value}
                                  {status === "cursor" && (
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                      <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                    </div>
                                  )}
                                </div>
                              );
                            }}
                          />
                        </div>
                        <Clerk.FieldError className="block text-center text-sm text-destructive" />
                      </Clerk.Field>
                      <SignUp.Action
                        asChild
                        resend
                        className="text-muted-foreground"
                        fallback={({ resendableAfter }) => (
                          <Button variant="link" size="sm" disabled>
                            Didn&apos;t receive a code? Resend (
                            <span className="tabular-nums">
                              {resendableAfter}
                            </span>
                            )
                          </Button>
                        )}
                      >
                        <Button type="button" variant="link" size="sm">
                          Didn&apos;t receive a code? Resend
                        </Button>
                      </SignUp.Action>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? <Spinner /> : "Continue";
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Strategy>
            </SignUp.Step>

            <div id="clerk-captcha" />
          </>
        )}
      </Clerk.Loading>
    </SignUp.Root>
  );
}
