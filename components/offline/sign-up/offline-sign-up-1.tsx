"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function OfflineSignUp1() {
  return (
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
            <div className="grid space-y-2">
              <Label>First Name</Label>
              <Input
                name="firstName"
                placeholder="Robert"
                autoComplete="given-name"
              />
            </div>
            <div className="grid space-y-2">
              <Label>Last Name</Label>
              <Input
                name="lastName"
                placeholder="Kinney"
                autoComplete="family-name"
              />
            </div>
          </div>
          <Label>Email</Label>
          <Input
            name="email"
            placeholder="robertskinney@outlook.com"
            autoComplete="email"
          />
          <Label>Password</Label>
          <Input
            name="password"
            placeholder="*******"
            autoComplete="new-password"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full gap-y-4">
        <Button className="w-full">Continue</Button>
        <Button variant="link" size="sm" asChild>
          <Link
            href="/sign-in"
            className="text-primary dark:text-secondary-foreground w-full text-wrap"
          >
            Already have an account? Sign in
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
