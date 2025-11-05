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
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import Link from "next/link";

export default function OfflineSignIn1() {
  return (
    <Card className="w-full sm:w-96 p-3">
      <CardContent className="flex flex-col gap-y-6 p-5">
        <div className="flex flex-col gap-y-2">
          <CardTitle>Acme, Inc.</CardTitle>
          <CardDescription>
            Please enter your credentials to continue.
          </CardDescription>
        </div>

        <div className="grid grid-cols-2 gap-x-3 w-full items-center">
          <Button className="w-full" size="sm" variant="outline" type="button">
            <FaGoogle className="size-4.5" />
            Google
          </Button>
          <Button className="w-full" size="sm" variant="outline" type="button">
            <FaMicrosoft className="size-4.5" />
            Microsoft
          </Button>
        </div>

        <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          or
        </p>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            name="email"
            placeholder="robertskinney@outlook.com"
            autoComplete="email"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full gap-y-4">
        <Button className="w-full">Continue</Button>
        <Button variant="link" size="sm" asChild>
          <Link
            href="/sign-up"
            className="text-primary dark:text-secondary-foreground w-full text-wrap"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
