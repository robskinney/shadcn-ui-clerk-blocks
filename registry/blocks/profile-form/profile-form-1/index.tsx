"use client";

import { Upload } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import imageCompression from "browser-image-compression";
import { useAuth, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { updateUserProfile } from "./actions";
import { Spinner } from "@/components/ui/spinner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

type ProfileForm1Props = {
  user?: Partial<UserResource> | Partial<User> | null;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const userProfileUpdateFormSchema = z.object({
  picture: z
    .file()
    .min(1)
    .max(MAX_FILE_SIZE, "Image must be less than 8MB.")
    .mime(ACCEPTED_IMAGE_TYPES, "Image must be .jpeg, .jpg, .png, or .webp.")
    .optional(),
  username: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
});

export type UserProfileUpdateFormValues = z.infer<
  typeof userProfileUpdateFormSchema
>;

export default function ProfileForm1({ user }: ProfileForm1Props) {
  if (user) {
    return <ProfileForm1Inner user={user} />;
  }

  return <ProfileForm1WithClerk />;
}

function ProfileForm1WithClerk() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <Skeleton className="w-20" />;
  if (!isSignedIn || !user)
    return (
      <p className="text-primary dark:text-secondary-foreground">Sign in</p>
    );

  return <ProfileForm1Inner user={user} />;
}

function ProfileForm1Inner({
  user,
}: {
  user: Partial<UserResource> | Partial<User>;
}) {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.imageUrl ?? null
  );

  const form = useForm<z.infer<typeof userProfileUpdateFormSchema>>({
    resolver: zodResolver(userProfileUpdateFormSchema),
    defaultValues: {
      picture: undefined,
      username: user.username ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    },
  });

  async function handleUpdate(data: UserProfileUpdateFormValues) {
    if (!isSignedIn) {
      toast.warning("You must be logged in to use this functionality.");
    } else {
      setLoading(true);
      try {
        const processedData = { ...data };

        if (data.picture) {
          const compressedFile = await imageCompression(data.picture, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          });

          processedData.picture = compressedFile;
        }

        await updateUserProfile(processedData);
        toast.success("Profile updated successfully.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update profile.");
      } finally {
        setLoading(false);
      }
    }
  }

  function onSubmit(data: UserProfileUpdateFormValues) {
    handleUpdate(data);
  }

  return (
    <Card className="w-full sm:w-96">
      <CardContent>
        <form
          id="form-profile-update-1"
          className="flex flex-col gap-y-8 px-3 sm:px-5 py-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="aspect-square size-24 rounded-full bg-slate-400">
              <AvatarImage
                src={previewUrl ?? user.imageUrl ?? undefined}
                className="object-cover"
                alt="User profile picture"
              />
              <AvatarFallback className="outline-1 outline-primary bg-linear-to-tr from-pink-300 to-primary/75" />
            </Avatar>

            <div>
              <Controller
                name="picture"
                control={form.control}
                render={({
                  field: { value, onChange, ...fieldProps },
                  fieldState,
                }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="form-profile-update-1-picture"
                      {...fieldProps}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          onChange(file);
                          const objectUrl = URL.createObjectURL(file);
                          setPreviewUrl(objectUrl);
                        }
                      }}
                    />

                    <label htmlFor="form-profile-update-1-picture">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <span className="flex items-center gap-2">
                          <Upload />
                          Replace Image
                        </span>
                      </Button>
                    </label>

                    <FieldDescription className="text-center sm:text-start text-xs">
                      Recommend size 1:1, up to 8MB
                    </FieldDescription>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="form-profile-update-1-username">
                    Username
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="form-profile-update-1-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="robskinney"
                      autoComplete="username"
                    />
                    <InputGroupAddon>
                      <Label htmlFor="email">@</Label>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-profile-update-1-firstName">
                      First Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-profile-update-1-firstName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Robert"
                      autoComplete="given-name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-profile-update-1-lastName">
                      Last Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-profile-update-1-lastName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Kinney"
                      autoComplete="family-name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner />
                <p>Saving...</p>
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
