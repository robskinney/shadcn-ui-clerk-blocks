"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@clerk/nextjs";
import imageCompression from "browser-image-compression";
import {
  CreateOrganizationParams,
  OrganizationResource,
  SetActiveParams,
} from "@clerk/types";
import { updateOrganizationPicture } from "./actions";
import { Camera, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const organizationAddFormSchema = z.object({
  picture: z
    .file()
    .min(1)
    .max(MAX_FILE_SIZE, "Image must be less than 8MB.")
    .mime(ACCEPTED_IMAGE_TYPES, "Image must be .jpeg, .jpg, .png, or .webp.")
    .optional(),
  name: z.string(),
  slug: z.string(),
});

export type OrganizationCreateFormValues = z.infer<
  typeof organizationAddFormSchema
>;

export function OrganizationCreateForm({
  createOrganization,
  setActive,
  revalidate,
  children,
}: {
  createOrganization: (
    params: CreateOrganizationParams
  ) => Promise<OrganizationResource>;
  setActive: (params: SetActiveParams) => void;
  revalidate: () => void;
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof organizationAddFormSchema>>({
    resolver: zodResolver(organizationAddFormSchema),
    defaultValues: {
      picture: undefined,
      name: "",
      slug: "",
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

  async function handleAdd(data: OrganizationCreateFormValues) {
    if (!user) {
      toast.warning("You must be logged in to use this functionality.");
    } else {
      setLoading(true);
      try {
        const organization = await createOrganization({
          name: data.name,
          slug: data.slug,
        });

        if (data.picture) {
          const compressedPicture = await imageCompression(data.picture, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          });

          await updateOrganizationPicture(organization.id, {
            file: compressedPicture,
            uploaderUserId: user.id,
          });
        }

        setActive({ organization: organization.id });
        revalidate();

        toast.success("Organization created successfully.");
        setShowAddDialog(false);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occured creating the organization.");
        }
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="A popup form requesting information on an organization to add."
      >
        <DialogHeader>
          <DialogTitle>Create an organization</DialogTitle>
        </DialogHeader>
        <form
          id="form-organization-create-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-4">
            <Avatar className="aspect-square size-24 rounded-full bg-slate-400">
              <AvatarImage
                src={previewUrl ?? undefined}
                className="object-cover"
                alt="Organization picture"
              />
              <AvatarFallback>
                <Camera />
              </AvatarFallback>
            </Avatar>

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
                    disabled={loading}
                    onClick={() => inputRef.current?.click()}
                  >
                    <span className="flex items-center gap-2">
                      <Upload />
                      Select Image
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
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="form-organization-create-1-name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-organization-create-1-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Acme, Inc."
                    type="text"
                    autoComplete="organization"
                  />
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
                  <FieldLabel htmlFor="form-organization-create-1-name">
                    Slug
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-organization-create-1-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="acme-inc"
                    type="text"
                    disabled
                  />
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
          <Button
            type="submit"
            form="form-organization-create-1"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner />
                <p>Creating...</p>
              </>
            ) : (
              "Create organization"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
