import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function fetchSessions() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Failed to retrieve session information.");
  }

  const client = await clerkClient();

  const sessions = (
    await client.sessions.getSessionList({
      userId: user.id,
      status: "active",
    })
  ).data;

  return sessions;
}
