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
import InstallationCopySnippet from "@/components/installation-copy-snippet";
// import SocialAccounts1 from "@/registry/blocks/social-accounts/social-accounts-1";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UsageCodeBlock from "@/components/usage-code-block";

const HomeComponents = [
  {
    name: "user-dropdown-1",
    description: "A simple user dropdown.",
    signedInVariant: <UserDropdown1 />,
    signedOutVariant: <UserDropdown1 user={MockUser} />,
    props: [
      {
        prop: "user?",
        type: "Partial<UserResource> | Partial<User>",
        default: "n/a",
        description: "The currently logged in user.",
        required: false,
      },
      {
        prop: "dropdownAlign?",
        type: '"start" | "center" | "end"',
        default: "end",
        description: "The alignment in which the dropdown should adhere to.",
        required: false,
      },
      {
        prop: "dropdownSide?",
        type: '"top" | "right" | "bottom" | "left"',
        default: "bottom",
        description: "The side in which the dropdown should adhere to.",
        required: false,
      },
    ],
    code: [
      {
        language: "tsx",
        filename: "page.tsx",
        code: `import UserDropdown2 from "@/components/user-dropdown-1";
import { currentUser } from "@clerk/nextjs/server";

async function Page() {
  const user = await currentUser();

  return (
    <div>
        <UserDropdown1 user={user} />
    </div>
  );
};`,
      },
    ],
  },
  {
    name: "user-dropdown-2",
    description: "Another user dropdown best used in a sidebar.",
    signedInVariant: <UserDropdown2 />,
    signedOutVariant: <UserDropdown2 user={MockUser} />,
    props: [
      {
        prop: "user?",
        type: "Partial<UserResource> | Partial<User>",
        default: "n/a",
        description: "The currently logged in user.",
        required: false,
      },
      {
        prop: "dropdownAlign?",
        type: '"start" | "center" | "end"',
        default: "end",
        description: "The alignment in which the dropdown should adhere to.",
        required: false,
      },
      {
        prop: "dropdownSide?",
        type: '"top" | "right" | "bottom" | "left"',
        default: "bottom",
        description: "The side in which the dropdown should adhere to.",
        required: false,
      },
    ],
    code: [
      {
        language: "tsx",
        filename: "page.tsx",
        code: `import UserDropdown2 from "@/components/user-dropdown-2";
import { currentUser } from "@clerk/nextjs/server";

async function Page() {
  const user = await currentUser();

  return (
    <div>
        <UserDropdown2 user={user} />
    </div>
  );
};`,
      },
    ],
  },
  {
    name: "profile-form-1",
    description: "An editable user profile form.",
    signedInVariant: <ProfileForm1 />,
    signedOutVariant: <ProfileForm1 user={MockUser} />,
    props: [
      {
        prop: "user?",
        type: "Partial<UserResource> | Partial<User>",
        default: "n/a",
        description: "The currently logged in user.",
        required: false,
      },
    ],
    code: [
      {
        language: "tsx",
        filename: "page.tsx",
        code: `import ProfileForm1 from "@/components/profile-form-1";
import { currentUser } from "@clerk/nextjs/server";

async function Page() {
  const user = await currentUser();

  return (
    <div>
        <ProfileForm1 user={user} />
    </div>
  );
};`,
      },
    ],
  },
  {
    name: "sign-up-1",
    description: "A user registration card.",
    signedInVariant: <OfflineSignUp1 />,
    signedOutVariant: <SignUp1 />,
    code: [
      {
        language: "tsx",
        filename: "app/sign-up/[[...sign-up]]/page.tsx",
        code: `import SignUp1 from "@/components/sign-up-1";

function Page() {
  return <SignUp1 />;
};`,
      },
    ],
  },
  {
    name: "sign-in-1",
    description: "A user login card.",
    signedInVariant: <OfflineSignIn1 />,
    signedOutVariant: <SignIn1 />,
    code: [
      {
        language: "tsx",
        filename: "app/sign-in/[[...sign-in]]/page.tsx",
        code: `import SignIn1 from "@/components/sign-in-1";

function Page() {
  return <SignIn1 />;
};`,
      },
    ],
  },
  {
    name: "session-list-1",
    description: "A simple session management card.",
    signedInVariant: <SessionList1 />,
    signedOutVariant: <SessionList1 sessions={generateMockSessions()} />,
    props: [
      {
        prop: "sessions?",
        type: "Partial<Session>[]",
        default: "n/a",
        description: "The active sessions for the logged in user.",
        required: false,
      },
    ],
    code: [
      {
        language: "tsx",
        filename: "page.tsx",
        code: `import SessionList1 from "@/components/session-list-1";

function Page() {
  return <SessionList1 />;
};`,
      },
    ],
  },
  {
    name: "email-management-1",
    description: "A simple email management card.",
    signedInVariant: <EmailManagement1 />,
    signedOutVariant: <EmailManagement1 emails={MockEmails} />,
    props: [
      {
        prop: "emails?",
        type: "Partial<EnhancedEmailAddress>[]",
        default: "n/a",
        description: "The available email addresses for the logged in user.",
        required: false,
      },
    ],
    code: [
      {
        language: "tsx",
        filename: "page.tsx",
        code: `import EmailManagement1 from "@/components/email-management-1";

function Page() {
  return <EmailManagement1 />;
};`,
      },
    ],
  },
  //   {
  //     name: "social-accounts-1",
  //     description: "A simple external account management card.",
  //     signedInVariant: <SocialAccounts1 />,
  //     signedOutVariant: <p>Work in progress.</p>,
  //     props: [
  //       {
  //         prop: "accounts?",
  //         type: "Partial<EnhancedExternalAccount>[]",
  //         default: "n/a",
  //         description: "The available external accounts for the logged in user.",
  //         required: false,
  //       },
  //     ],
  //     code: [
  //       {
  //         language: "tsx",
  //         filename: "page.tsx",
  //         code: `import SocialAccounts1 from "@/components/social-accounts-1";

  // function Page() {
  //   return <SocialAccounts1 />;
  // };`,
  //       },
  //     ],
  //   },
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
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {c.name}
              </h2>
              <h3 className="text-sm text-muted-foreground ">
                {c.description}
              </h3>
            </div>

            <div className="flex items-center justify-center">
              <SignedIn>{c.signedInVariant}</SignedIn>
              <SignedOut>{c.signedOutVariant}</SignedOut>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold tracking-tight">
                Installation
              </h2>
              <InstallationCopySnippet name={c.name} />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold tracking-tight">Props</h2>
              {c.props ? (
                <Table className="mb-5">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prop</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Default</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Required</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {c.props.map((p) => (
                      <TableRow key={p.prop}>
                        <TableCell className="font-medium">
                          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                            {p.prop}
                          </code>
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            {p.type}
                          </code>
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            {p.default}
                          </code>
                        </TableCell>
                        <TableCell>{p.description}</TableCell>
                        <TableCell className="text-end">
                          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            {String(p.required)}
                          </code>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground mb-3">
                  No props available for this component.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
              {c.code ? (
                <UsageCodeBlock code={c.code} />
              ) : (
                <p className="text-muted-foreground mb-3">
                  No usage snippet available for this component.
                </p>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
