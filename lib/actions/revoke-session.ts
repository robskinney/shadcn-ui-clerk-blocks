"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function revokeSession(sessionId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to revoke session");
  }

  const client = await clerkClient();

  await client.sessions.revokeSession(sessionId);
}
