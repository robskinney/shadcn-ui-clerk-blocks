"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "@clerk/nextjs";
import {
  EmailCodeFactor,
  SessionVerificationLevel,
  SessionVerificationResource,
} from "@clerk/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const verificationFormSchema = z.object({
  code: z.string().min(6, {
    message: "Please enter your full one-time password.",
  }),
});

export type VerificationFormValues = z.infer<typeof verificationFormSchema>;

export function VerificationComponent({
  level = "first_factor",
  onComplete,
  onCancel,
}: {
  level: SessionVerificationLevel | undefined;
  onComplete: () => void;
  onCancel: () => void;
}) {
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const { session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const reverificationRef = useRef<SessionVerificationResource | undefined>(
    undefined
  );

  const [determinedStartingFirstFactor, setDeterminedStartingFirstFactor] =
    useState<EmailCodeFactor | undefined>();

  useEffect(() => {
    if (reverificationRef.current) {
      return;
    }

    session?.startVerification({ level }).then(async (response) => {
      reverificationRef.current = response;
      await prepareEmailVerification(response);
    });
  }, []);

  const prepareEmailVerification = async (
    verificationResource: SessionVerificationResource
  ) => {
    // To simplify the example we will only handle the first factor verification
    if (verificationResource.status === "needs_first_factor") {
      // Determine the starting first factor from the supported first factors
      const determinedStartingFirstFactor =
        verificationResource.supportedFirstFactors?.filter(
          (factor) => factor.strategy === "email_code"
        )[0];

      if (determinedStartingFirstFactor) {
        setDeterminedStartingFirstFactor(determinedStartingFirstFactor);
        // Prepare the first factor verification with the determined starting first factor
        await session?.prepareFirstFactorVerification({
          strategy: determinedStartingFirstFactor.strategy,
          emailAddressId: determinedStartingFirstFactor?.emailAddressId,
        });
      }
    }
  };

  useEffect(() => {
    if (determinedStartingFirstFactor) {
      setOpen(true);
    }
  }, [determinedStartingFirstFactor]);

  async function onSubmit(data: VerificationFormValues) {
    setLoading(true);
    try {
      await session?.attemptFirstFactorVerification({
        strategy: "email_code",
        code: data.code,
      });
      onComplete();
      toast.success("Session verified successfully.");
    } catch (e) {
      toast.error("An error occurred verifying session.");
    } finally {
      setLoading(false);
    }
  }

  if (!determinedStartingFirstFactor) {
    return null;
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onCancel();
        }
        setOpen(isOpen);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="gap-1">
          <AlertDialogTitle>Verify your Account</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the verification code sent to{" "}
            {determinedStartingFirstFactor.safeIdentifier ||
              "your email address"}
            {"."}{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <input
          type="number"
          name="code"
          onChange={(e) => setCode(e.target.value)}
        /> */}
        <form id="verify-email-1" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor="form-email-add-1-email">Code</FieldLabel>
                {/* <FormControl> */}
                <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {/* </FormConxtrol> */}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel()}>
            Cancel
          </AlertDialogCancel>
          <Button disabled={loading} type="submit" form="verify-email-1">
            {loading ? (
              <>
                <Spinner />
                <p>Submitting...</p>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
