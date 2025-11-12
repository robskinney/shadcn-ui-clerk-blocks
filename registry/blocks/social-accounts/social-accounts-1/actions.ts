"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSocialAccount(externalAccountId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to remove social account");
  }

  const client = await clerkClient();
  await client.users.deleteUserExternalAccount({
    userId,
    externalAccountId,
  });

  revalidatePath("/");
}
