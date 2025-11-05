import Link from "next/link";
import { Separator } from "./ui/separator";

export default function Navbar() {
  return (
    <nav className="light:bg-white/75 inset-x-0 top-0 z-40 mx-auto w-full backdrop-blur-lg transition-all px-2 md:px-8 lg:px-16 xl:px-28 space-y-0.5">
      <div className="flex flex-row h-14 mt-2 justify-between items-center space-x-0.5 mx-1">
        <Link href="/">
          <h1 className="text-xl font-bold tracking-tight">Clerk Blocks</h1>
        </Link>
      </div>
      <Separator />
    </nav>
  );
}
