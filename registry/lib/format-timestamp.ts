import { format, isToday, isYesterday } from "date-fns";

export function formatTimestamp(ts: number) {
  const date = new Date(ts);
  if (isToday(date)) return `Today at ${format(date, "h:mm a")}`;
  if (isYesterday(date)) return `Yesterday at ${format(date, "h:mm a")}`;
  return format(date, "MMM d, yyyy 'at' h:mm a");
}
