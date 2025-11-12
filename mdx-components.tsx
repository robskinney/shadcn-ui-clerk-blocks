import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import ComponentContainer from "./components/component-container";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import SignIn1 from "./registry/blocks/sign-in/sign-in-1";
import SignUp1 from "./registry/blocks/sign-up/sign-up-1";
import EmailManagement1 from "./registry/blocks/email-management/email-management-1";
import SessionManagement1 from "./registry/blocks/session-management/session-management-1";
import SocialAccounts1 from "./registry/blocks/social-accounts/social-accounts-1";
import UserDropdown1 from "./registry/blocks/user-dropdown/user-dropdown-1";
import UserDropdown2 from "./registry/blocks/user-dropdown/user-dropdown-2";
import ProfileForm1 from "./registry/blocks/profile-form/profile-form-1";

const generator = createGenerator();

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    ComponentContainer,
    SignedIn,
    SignedOut,
    SignIn1,
    SignUp1,
    EmailManagement1,
    SessionManagement1,
    SocialAccounts1,
    UserDropdown1,
    UserDropdown2,
    ProfileForm1,
    ...components,
  };
}
