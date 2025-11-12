"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function revokeSession(sessionId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to revoke session");
  }

  const client = await clerkClient();
  await client.sessions.revokeSession(sessionId);

  revalidatePath("/");
}
