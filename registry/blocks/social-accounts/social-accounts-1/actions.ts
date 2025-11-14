"use server";

import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSocialAccount(externalAccountId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to remove social account");
  }

  const client = await clerkClient();

  try {
    await client.users.deleteUserExternalAccount({
      userId,
      externalAccountId,
    });

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    if (isClerkAPIResponseError(err)) {
      throw new Error(err.errors[0].longMessage);
    } else {
      throw new Error("An unknown error occured removing the social account.");
    }
  }
}
