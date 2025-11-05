import SignUp1 from "@/registry/blocks/sign-up/sign-up-1";
import SignIn1 from "@/registry/blocks/sign-in/sign-in-1";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import OfflineSignIn1 from "@/components/offline/sign-in/offline-sign-in-1";
import OfflineSignUp1 from "@/components/offline/sign-up/offline-sign-up-1";
import UserDropdown1 from "@/registry/blocks/user-dropdown/user-dropdown-1";
import SessionList1 from "@/registry/blocks/session-list/session-list-1";
import { generateMockSessions, MockEmails, MockUser } from "@/lib/mock";
import UserDropdown2 from "@/registry/blocks/user-dropdown/user-dropdown-2";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EmailManagement1 from "@/registry/blocks/email-management/email-management-1";
import ProfileForm1 from "@/registry/blocks/profile-form/profile-form-1";
import CopySnippet from "@/components/copy-snippet";

const HomeComponents = [
  {
    name: "user-dropdown-1",
    description: "A simple user dropdown.",
    signedInVariant: <UserDropdown1 />,
    signedOutVariant: <UserDropdown1 user={MockUser} />,
  },
  {
    name: "user-dropdown-2",
    description: "Another user dropdown best used in a sidebar.",
    signedInVariant: <UserDropdown2 />,
    signedOutVariant: <UserDropdown2 user={MockUser} />,
  },
  {
    name: "profile-form-1",
    description: "An editable user profile form.",
    signedInVariant: <ProfileForm1 />,
    signedOutVariant: <ProfileForm1 user={MockUser} />,
  },
  {
    name: "sign-up-1",
    description: "A user registration card.",
    signedInVariant: <OfflineSignUp1 />,
    signedOutVariant: <SignUp1 />,
  },
  {
    name: "sign-in-1",
    description: "A user login card.",
    signedInVariant: <OfflineSignIn1 />,
    signedOutVariant: <SignIn1 />,
  },
  {
    name: "session-list-1",
    description: "A simple session management card.",
    signedInVariant: <SessionList1 />,
    signedOutVariant: <SessionList1 sessions={generateMockSessions()} />,
  },
  {
    name: "email-management-1",
    description: "A simple email management card.",
    signedInVariant: <EmailManagement1 />,
    signedOutVariant: <EmailManagement1 emails={MockEmails} />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Clerk UI Blocks</h1>
        <p className="text-muted-foreground">
          A registry of functional, reusable{" "}
          <Link
            href="https://ui.shadcn.com/"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "link" }),
              "inline p-0 h-auto"
            )}
          >
            shadcn/ui
          </Link>{" "}
          blocks to be used with{" "}
          <Link
            href="https://clerk.com/"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "link" }),
              "inline p-0 h-auto"
            )}
          >
            Clerk
          </Link>
          .
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        {HomeComponents.map((c, index) => (
          <div
            className="flex flex-col gap-10 border rounded-lg p-4 relative"
            key={index}
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold tracking-tight">{c.name}</h2>
              <h3 className="text-sm text-muted-foreground ">
                {c.description}
              </h3>
            </div>

            <div className="flex items-center justify-center relative">
              <SignedIn>{c.signedInVariant}</SignedIn>
              <SignedOut>{c.signedOutVariant}</SignedOut>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold tracking-tight">
                Installation
              </h2>
              <CopySnippet name={c.name} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
