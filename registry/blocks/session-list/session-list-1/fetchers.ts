import { clerkClient, auth, Session } from "@clerk/nextjs/server";

export async function fetchSessions() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Failed to retrieve email addresses");
  }

  const client = await clerkClient();
  const sessions: Session[] = (
    await client.sessions.getSessionList({ userId, status: "active" })
  ).data;

  return sessions;
}
