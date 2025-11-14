import { Session } from "@clerk/nextjs/server";
import SessionManagement1Inner from "./inner";
import { formatSessions } from "./utils";
import { fetchSessions } from "./fetchers";

export type SessionManagement1Props = {
  /**
   * A Clerk [User](https://clerk.com/docs/reference/javascript/user) object retrieved from either the frontend or backend SDK.
   **/
  sessions?: Partial<Session>[];
};

export default function SessionManagement1({
  sessions,
}: SessionManagement1Props) {
  if (sessions) {
    return <SessionManagement1Inner sessions={formatSessions(sessions)} />;
  }

  return <SessionManagement1WithClerk />;
}

async function SessionManagement1WithClerk() {
  const sessions = await fetchSessions();

  if (!sessions || sessions.length === 0) return <p>No sessions found.</p>;

  return <SessionManagement1Inner sessions={formatSessions(sessions)} />;
}
