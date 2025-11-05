import { DarkModeToggle } from "./dark-mode-toggle";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <nav className="light:bg-white/75 z-40 mx-auto w-full backdrop-blur-lg transition-all px-2 md:px-8 lg:px-16 xl:px-28 space-y-0.5">
      <Separator />
      <div className="flex flex-wrap h-14 mb-2 items-center justify-between mx-1">
        <p className="flex-shrink-0">
          {`Built with ❤️ by `}
          <Link href="https://github.com/robskinney" className="underline">
            robskinney
          </Link>
          .
        </p>

        <DarkModeToggle />
      </div>
    </nav>
  );
}
