import { UserResource } from "@clerk/types";
import { currentUser, User } from "@clerk/nextjs/server";
import UserDropdown1Inner from "./inner";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

export type UserDropdown1Props = {
  /**
  * A Clerk [User](https://clerk.com/docs/reference/javascript/user) object retrieved from either the frontend or backend SDK.
  **/
  user?: Partial<UserResource> | Partial<User>;
  /**
  * [DropdownMenuContent](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#content)
  * props that drill down to the content of the UserDropdown.
  * @default {side: "bottom", align: "end"}
  **/
  dropdownMenuContentProps?: DropdownMenuContentProps
};

export default function UserDropdown1({
  user,
  dropdownMenuContentProps = {side: "bottom", align: "end"}
}: UserDropdown1Props) {
  if (user) {
    return (
      <UserDropdown1Inner
        user={JSON.parse(JSON.stringify(user))}
        dropdownMenuContentProps={dropdownMenuContentProps}
      />
    );
  }

  return <UserDropdown1WithClerk dropdownMenuContentProps={dropdownMenuContentProps} />;
}

async function UserDropdown1WithClerk(
  {dropdownMenuContentProps}: {dropdownMenuContentProps: DropdownMenuContentProps}
) {
  const user = await currentUser();

  if (!user) return;

  return (
    <UserDropdown1Inner
      user={JSON.parse(JSON.stringify(user))}
      dropdownMenuContentProps={dropdownMenuContentProps}
    />
  );
}
