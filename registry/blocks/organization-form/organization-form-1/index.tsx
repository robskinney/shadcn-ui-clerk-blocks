"use client";

import { Upload } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import imageCompression from "browser-image-compression";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Organization } from "@clerk/backend";
import { Skeleton } from "@/components/ui/skeleton";
import { updateOrganization } from "./actions";
import { OrganizationResource } from "@clerk/types";

export type OrganizationForm1Props = {
  /**
   * A Clerk [Organization](https://clerk.com/docs/reference/javascript/organization) object retrieved from either the frontend or backend SDK.
   **/
  organization?: Partial<OrganizationResource> | Partial<Organization>;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const organizationUpdateFormSchema = z.object({
  id: z.string(),
  picture: z
    .file()
    .min(1)
    .max(MAX_FILE_SIZE, "Image must be less than 8MB.")
    .mime(ACCEPTED_IMAGE_TYPES, "Image must be .jpeg, .jpg, .png, or .webp.")
    .optional(),
  name: z.string(),
  slug: z.string(),
});

export type OrganizationUpdateFormValues = z.infer<
  typeof organizationUpdateFormSchema
>;

export default function OrganizationForm1({
  organization: propOrganization,
}: OrganizationForm1Props) {
  const { isSignedIn } = useAuth();

  const { organization: hookOrganization, isLoaded: hookLoaded } =
    useOrganization();

  const organization = propOrganization ?? hookOrganization;
  const isLoaded = propOrganization ? true : hookLoaded;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    organization?.imageUrl ?? null
  );

  const form = useForm<z.infer<typeof organizationUpdateFormSchema>>({
    resolver: zodResolver(organizationUpdateFormSchema),
    defaultValues: {
      id: organization?.id,
      picture: undefined,
      name: organization?.name ?? "",
      slug: organization?.slug ?? "",
    },
  });

  const enteredName = form.watch("name");

  useEffect(() => {
    form.setValue(
      "name",
      enteredName
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .replace(/[:\-\.]{2,}/g, (match) => match[0]) // Replace multiple ":" or "-" or "." with a single instance
    );
    form.setValue(
      "slug",
      enteredName.toLowerCase().replace(/[:.']/g, "").replace(/\s+/g, "-")
    );
  }, [form, enteredName]);

  useEffect(() => {
    if (isLoaded && organization) {
      form.reset({
        id: organization?.id,
        picture: undefined,
        name: organization?.name ?? "",
        slug: organization?.slug ?? "",
      });
      setPreviewUrl(organization.imageUrl ?? null);
    }
  }, [isLoaded, organization, form]);

  async function handleUpdate(data: OrganizationUpdateFormValues) {
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

        await updateOrganization(processedData);
        toast.success("Organization updated successfully.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update organization.");
      } finally {
        setLoading(false);
      }
    }
  }

  function onSubmit(data: OrganizationUpdateFormValues) {
    handleUpdate(data);
  }

  return (
    <Card className="w-full">
      <CardContent className="mx-auto w-full lg:max-w-4/5 xl:max-w-3/4">
        <form
          id="form-organization-update-1"
          className="flex flex-col gap-y-8 px-3 sm:px-5 py-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {isLoaded && organization ? (
              <Avatar className="aspect-square size-24 rounded-full bg-slate-400">
                <AvatarImage
                  src={previewUrl ?? organization?.imageUrl ?? undefined}
                  className="object-cover"
                  alt="Organization profile picture"
                />
                <AvatarFallback />
              </Avatar>
            ) : (
              <Skeleton className={`size-24 rounded-full`} />
            )}

            <div>
              <Controller
                name="picture"
                control={form.control}
                render={({ field: { onChange }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={inputRef}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          onChange(file);
                          const objectUrl = URL.createObjectURL(file);
                          setPreviewUrl(objectUrl);
                        }
                      }}
                    />

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      type="button"
                      disabled={!isLoaded}
                      onClick={() => inputRef.current?.click()}
                    >
                      <span className="flex items-center gap-2">
                        <Upload />
                        Replace Image
                      </span>
                    </Button>

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
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="form-organization-update-1-name">
                    Name
                  </FieldLabel>
                  <InputGroup>
                    {isLoaded ? (
                      <InputGroupInput
                        {...field}
                        id="form-organization-update-1-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Acme, Inc."
                        autoComplete="organization"
                        disabled={!isLoaded}
                      />
                    ) : (
                      <Skeleton className="w-20 h-5 ml-1.5" />
                    )}
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="form-organization-update-1-name">
                    Slug
                  </FieldLabel>
                  <InputGroup>
                    {isLoaded ? (
                      <InputGroupInput
                        {...field}
                        id="form-organization-update-1-slug"
                        aria-invalid={fieldState.invalid}
                        placeholder="acme-inc"
                        disabled
                      />
                    ) : (
                      <Skeleton className="w-20 h-5 ml-1.5" />
                    )}
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
