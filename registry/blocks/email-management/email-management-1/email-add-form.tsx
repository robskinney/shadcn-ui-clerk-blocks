"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { createEmailAddress } from "./actions";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@clerk/nextjs";

const emailAddFormSchema = z.object({
  email: z.email(),
  isPrimary: z.boolean(),
});

export type OrganizationCreateFormValues = z.infer<typeof emailAddFormSchema>;

export function EmailAddForm() {
  const { isSignedIn } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof emailAddFormSchema>>({
    resolver: zodResolver(emailAddFormSchema),
    defaultValues: {
      email: "",
      isPrimary: false,
    },
  });

  async function handleAdd(data: OrganizationCreateFormValues) {
    if (!isSignedIn) {
      toast.warning("You must be logged in to use this functionality.");
    } else {
      setLoading(true);
      try {
        await createEmailAddress(data);
        setShowAddDialog(false);
        toast.success("Email created successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to create email");
      } finally {
        setLoading(false);
      }
    }
  }

  function onSubmit(data: OrganizationCreateFormValues) {
    handleAdd(data);
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus />
          Add email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new email address</DialogTitle>
        </DialogHeader>
        <form id="form-email-add-1" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="form-email-add-1-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-email-add-1-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="robertskinney@outlook.com"
                    type="email"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="isPrimary"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    id="form-email-add-1-isPrimary"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel
                    htmlFor="form-email-add-1-isPrimary"
                    className="font-normal"
                  >
                    Is Primary
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="form-email-add-1" disabled={loading}>
            {loading ? (
              <>
                <Spinner />
                <p>Adding...</p>
              </>
            ) : (
              "Add Email"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
