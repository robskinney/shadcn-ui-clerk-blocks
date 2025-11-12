import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          {/* <IdCardIcon className="text-foreground/70 fill-foreground/10" /> */}
          <span className="text-lg font-bold">Clerk Blocks</span>
        </div>
      ),
    },
    githubUrl: "https://github.com/robskinney/shadcn-ui-clerk-blocks",
  };
}
