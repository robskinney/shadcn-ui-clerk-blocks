import { ExternalAccountsMap } from "@/registry/lib/external-accounts-map";
import { currentUser, EmailAddress } from "@clerk/nextjs/server";
import { EnhancedEmailAddress } from "./types";

export async function fetchEmailAddresses() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Failed to retrieve email addresses");
  }

  const primaryEmailId = user.primaryEmailAddressId;

  const emails = user.emailAddresses.map((email: EmailAddress) => {
    const linkedTo = email.linkedTo.map((link) => ({
      id: link.id,
      type: link.type,
      providerName: ExternalAccountsMap[link.type].name ?? undefined,
      providerIcon: ExternalAccountsMap[link.type].icon ?? undefined,
    }));

    return {
      ...email,
      isPrimary: email.id === primaryEmailId,
      linkedTo,
    };
  });

  return emails as EnhancedEmailAddress[];
}
