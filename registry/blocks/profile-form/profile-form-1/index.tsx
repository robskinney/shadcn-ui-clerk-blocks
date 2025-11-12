import { UserResource } from "@clerk/types";
import { currentUser, User } from "@clerk/nextjs/server";
import ProfileForm1Inner from "./inner";

export type ProfileForm1Props = {
  /**
  * A Clerk [User](https://clerk.com/docs/reference/javascript/user) object retrieved from either the frontend or backend SDK.
  **/
  user?: Partial<UserResource> | Partial<User>;
};

export default function ProfileForm1({ user }: ProfileForm1Props) {
  if (user) {
    return <ProfileForm1Inner user={user} />;
  }

  return <ProfileForm1WithClerk />;
}

async function ProfileForm1WithClerk() {
  const user = await currentUser();

  if (!user) return;

  return <ProfileForm1Inner user={JSON.parse(JSON.stringify(user))} />;
}
