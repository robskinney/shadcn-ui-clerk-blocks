import { Session } from "@clerk/nextjs/server";
import { fetchSessions } from "./fetchers";
import SessionManagement1Inner from "./inner";

export type SessionManagement1Props = {
  /**
  * A list of the Clerk [Session](https://clerk.com/docs/reference/javascript/session) object retrieved from the Clerk SDK.
  **/
  sessions?: Partial<Session>[];
};

export default function SessionManagement1({
  sessions,
}: SessionManagement1Props) {
  if (sessions) {
    return <SessionManagement1Inner sessions={sessions} />;
  }

  return <SessionManagement1WithClerk />;
}

async function SessionManagement1WithClerk() {
  const sessions = await fetchSessions();

  if (!sessions || sessions.length === 0) return <p>No sessions found.</p>;

  return (
    <SessionManagement1Inner sessions={JSON.parse(JSON.stringify(sessions))} />
  );
}
