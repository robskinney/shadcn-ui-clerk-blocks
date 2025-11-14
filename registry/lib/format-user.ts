import { User } from "@clerk/backend";
import { EmailAddressResource, UserResource } from "@clerk/types";

export function formatUser(user: Partial<UserResource> | Partial<User>) {
  return {
    imageUrl: user.imageUrl,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    primaryEmailAddressId: user.primaryEmailAddressId,
    emailAddresses: user.emailAddresses?.map((e) => ({
      id: e.id,
      emailAddress: e.emailAddress,
      verification: {
        status: e.verification?.status,
      },
      linkedTo: e.linkedTo?.map((l) => ({
        id: l.id,
        type: l.type,
      })),
    })) as EmailAddressResource[],
  };
}
