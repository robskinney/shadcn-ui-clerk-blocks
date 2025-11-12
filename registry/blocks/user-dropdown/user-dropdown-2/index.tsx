import { UserResource } from "@clerk/types";
import { currentUser, User } from "@clerk/nextjs/server";
import UserDropdown2Inner from "./inner";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

export type UserDropdown2Props = {
  /**
  * A Clerk [User](https://clerk.com/docs/reference/javascript/user) object retrieved from either the frontend or backend SDK.
  **/
  user?: Partial<UserResource> | Partial<User>;
  /**
  * [DropdownMenuContent](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#content)
  * props that drill down to the content of the UserDropdown.
  * @default {side: "bottom", align: "end", sideOffset: 8}
  **/
  dropdownMenuContentProps?: DropdownMenuContentProps
};

export default function UserDropdown2({
  user,
  dropdownMenuContentProps = {side: "bottom", align: "end", sideOffset: 8},
}: UserDropdown2Props) {
  if (user) {
    return (
      <UserDropdown2Inner
        imageUrl={user.imageUrl}
        fullName={user.fullName}
        username={user.username}
        primaryEmailAddress={user.primaryEmailAddress?.emailAddress}
        dropdownMenuContentProps={dropdownMenuContentProps}
      />
    );
  }

  return <UserDropdown2WithClerk dropdownMenuContentProps={dropdownMenuContentProps} />;
}

async function UserDropdown2WithClerk(
  {dropdownMenuContentProps}: {dropdownMenuContentProps: DropdownMenuContentProps}
) {
  const user = await currentUser();

  if (!user) return;

  return (
    <UserDropdown2Inner
      imageUrl={user.imageUrl}
      fullName={user.fullName}
      username={user.username}
      primaryEmailAddress={user.primaryEmailAddress?.emailAddress}
      dropdownMenuContentProps={dropdownMenuContentProps}
    />
  );
}
