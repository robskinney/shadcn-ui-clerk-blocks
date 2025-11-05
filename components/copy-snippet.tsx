"use client";

import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/ui/shadcn-io/snippet";
import { toast } from "sonner";
import { useInstallation } from "./installation-provider";

export default function CopySnippet({ name }: { name: string }) {
  const commands = [
    {
      label: "pnpm",
      code: `pnpm dlx shadcn@latest add ${process.env.NEXT_PUBLIC_URL}/r/${name}.json`,
    },
    {
      label: "npm",
      code: `npx shadcn@latest add ${process.env.NEXT_PUBLIC_URL}/r/${name}.json`,
    },
    {
      label: "yarn",
      code: `yarn shadcn@latest add ${process.env.NEXT_PUBLIC_URL}/r/${name}.json`,
    },
    {
      label: "bun",
      code: `bunx --bun shadcn@latest add ${process.env.NEXT_PUBLIC_URL}/r/${name}.json`,
    },
  ];

  // Use context state instead of local state
  const { installId, setInstallId } = useInstallation();
  const activeCommand =
    commands.find((command) => command.label === installId) ?? commands[0];

  return (
    <Snippet onValueChange={setInstallId} value={installId}>
      <SnippetHeader>
        <SnippetTabsList>
          {commands.map((command) => (
            <SnippetTabsTrigger key={command.label} value={command.label}>
              {command.label}
            </SnippetTabsTrigger>
          ))}
        </SnippetTabsList>
        {activeCommand && (
          <SnippetCopyButton
            className="opacity-100"
            onCopy={() => toast.info(`Copied command to clipboard.`)}
            onError={() => toast.error(`Failed to copy command to clipboard.`)}
            value={activeCommand.code}
          />
        )}
      </SnippetHeader>

      {commands.map((command) => (
        <SnippetTabsContent key={command.label} value={command.label}>
          {command.code}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
}
