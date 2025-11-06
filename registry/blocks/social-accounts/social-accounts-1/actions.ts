"use server";

import { OrganizationCreateFormValues } from "./email-add-form";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createEmailAddress(data: OrganizationCreateFormValues) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to remove email");
  }

  const client = await clerkClient();
  await client.emailAddresses.createEmailAddress({
    userId,
    emailAddress: data.email,
    primary: data.isPrimary,
    verified: true,
  });

  revalidatePath("/");
}

export async function deleteEmailAddress(emailAddressId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to remove email");
  }

  const client = await clerkClient();
  await client.emailAddresses.deleteEmailAddress(emailAddressId);

  revalidatePath("/");
}

export async function setEmailPrimary(emailAddressId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to remove email");
  }

  const client = await clerkClient();
  await client.users.updateUser(userId, {
    primaryEmailAddressID: emailAddressId,
  });

  revalidatePath("/");
}
