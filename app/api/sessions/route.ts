import { fetchSessions } from "@/registry/blocks/session-management/session-management-1/fetchers";

export async function GET() {
  const sessions = await fetchSessions();

  if (!sessions) {
    throw new Error("Failed to retrieve sessions.");
  }

  return Response.json({ sessions });
}
