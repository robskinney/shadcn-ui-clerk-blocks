"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatTimestamp } from "@/registry/lib/format-timestamp";
import { SessionRevokeForm } from "./session-revoke-form";
import { IoLaptopOutline, IoPhonePortraitOutline } from "react-icons/io5";
import { FormattedSession } from "./types";

export default function SessionManagement1Inner({
  sessions,
}: {
  sessions: FormattedSession[];
}) {
  return (
    <Card className="w-full p-3">
      <CardContent className="flex flex-col gap-y-4 p-5">
        <CardTitle>Sessions</CardTitle>
        <ScrollArea>
          <Table className="mb-3">
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Detail</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="flex flex-row gap-2.5 items-center justify-between">
                    {s.isMobile == true ? (
                      <IoPhonePortraitOutline className="size-8 stroke-muted-foreground" />
                    ) : (
                      <IoLaptopOutline className="size-8 stroke-muted-foreground" />
                    )}

                    <div className="flex flex-col w-full text-start font-medium gap-0.5">
                      <div className="flex flex-row w-full gap-1 items-center justify-start">
                        <p className="font-semibold">{s.deviceType}</p>
                        {s.status == "active" && (
                          <Badge className="font-bold text-[0.6rem] bg-green-50 text-green-700 dark:bg-green-900/15 dark:text-green-400 dark:border-green-200/15">
                            Active
                          </Badge>
                        )}

                        {/* {session && session.id == s.id && (
                          <Badge variant="secondary" className="text-[0.6rem]">
                            Current
                          </Badge>
                        )} */}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        {s.browserName} {s.browserVersion}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {`${s.ipAddress} (${s.city})`}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatTimestamp(s.updatedAt!)}
                  </TableCell>
                  <TableCell className="text-right">
                    <SessionRevokeForm sessionId={s.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
