"use server";

import { UserProfileUpdateFormValues } from "./index";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUserProfile(data: UserProfileUpdateFormValues) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to remove email");
  }

  const client = await clerkClient();

  await client.users.updateUser(userId, {
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
  });

  if (data.picture && data.picture.size > 0) {
    await client.users.updateUserProfileImage(userId, { file: data.picture });
  }
}
