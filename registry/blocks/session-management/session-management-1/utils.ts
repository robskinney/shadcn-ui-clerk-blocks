import { Session } from "@clerk/nextjs/server";
import { FormattedSession } from "./types";

export function formatSessions(sessions: Partial<Session>[]) {
  return sessions.map((session) => ({
    id: session.id,
    isMobile: session.latestActivity?.isMobile,
    deviceType: session.latestActivity?.deviceType,
    status: session.status,
    browserName: session.latestActivity?.browserName,
    browserVersion: session.latestActivity?.browserVersion,
    ipAddress: session.latestActivity?.ipAddress,
    city: session.latestActivity?.city,
    updatedAt: session.updatedAt,
  })) as FormattedSession[];
}
