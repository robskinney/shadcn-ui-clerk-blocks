import { User } from "@clerk/nextjs/server";
import { FormattedEmailAddress } from "./types";
import { UserResource } from "@clerk/types";

export function formatUserEmails(user?: Partial<UserResource> | Partial<User>) {
  if (!user || !user.emailAddresses) return [];

  const primaryEmailId = user.primaryEmailAddressId;

  const emails = user.emailAddresses.map((email) => {
    const linkedTo = email.linkedTo.map((link) => ({
      id: link.id,
      type: link.type,
    }));

    return {
      id: email.id,
      emailAddress: email.emailAddress,
      isVerified: email.verification?.status === "verified",
      isPrimary: email.id === primaryEmailId,
      linkedTo,
    };
  });

  return emails as FormattedEmailAddress[];
}
