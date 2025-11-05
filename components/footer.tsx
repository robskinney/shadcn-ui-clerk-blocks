import { DarkModeToggle } from "./dark-mode-toggle";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export default function Footer() {
  return (
    <nav className="light:bg-white/75 z-40 mx-auto w-full backdrop-blur-lg transition-all px-2 md:px-8 lg:px-16 xl:px-28 space-y-0.5">
      <Separator />
      <div className="flex flex-row h-14 mb-2 items-center justify-between mx-1 gap-4">
        <p className="text-muted-foreground text-wrap">
          {`Built with ❤️ by `}
          <Link
            href="https://github.com/robskinney"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "link" }),
              "inline p-0 h-auto"
            )}
          >
            robskinney.
          </Link>
          {` The source code is available on `}
          <Link
            href="https://github.com/robskinney/shadcn-ui-clerk-blocks"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "link" }),
              "inline p-0 h-auto"
            )}
          >
            GitHub.
          </Link>
        </p>

        <DarkModeToggle />
      </div>
    </nav>
  );
}
