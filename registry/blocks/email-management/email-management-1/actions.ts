"use server";

import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { OrganizationCreateFormValues } from "./email-add-form";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createEmailAddress(data: OrganizationCreateFormValues) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be authenticated to create an email.");
  }

  const client = await clerkClient();

  try {
    await client.emailAddresses.createEmailAddress({
      userId,
      emailAddress: data.email,
      primary: data.isPrimary,
    });

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    if (isClerkAPIResponseError(err)) {
      throw new Error(err.errors[0].longMessage);
    } else {
      throw new Error("An unknown error occured creating the email.");
    }
  }
}

export async function deleteEmailAddress(emailAddressId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be authenticated to remove an email.");
  }

  const client = await clerkClient();

  try {
    await client.emailAddresses.deleteEmailAddress(emailAddressId);

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    if (isClerkAPIResponseError(err)) {
      throw new Error(err.errors[0].longMessage);
    } else {
      throw new Error("An unknown error occured removing the email.");
    }
  }
}

export async function setEmailPrimary(emailAddressId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to remove email");
  }

  const client = await clerkClient();

  try {
    await client.users.updateUser(userId, {
      primaryEmailAddressID: emailAddressId,
    });

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    if (isClerkAPIResponseError(err)) {
      throw new Error(err.errors[0].longMessage);
    } else {
      throw new Error("An unknown error occured removing the email.");
    }
  }
}
