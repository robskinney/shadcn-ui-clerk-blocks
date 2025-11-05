import { currentUser, EmailAddress } from "@clerk/nextjs/server";

export async function fetchEmailAddresses() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Failed to retrieve email addresses");
  }

  const primaryEmailId = user.primaryEmailAddressId;

  const providerMap: Record<string, string> = {
    oauth_google: "Google",
    oauth_microsoft: "Microsoft",
    oauth_github: "GitHub",
    oauth_apple: "Apple",
    oauth_facebook: "Facebook",
    oauth_linkedin: "LinkedIn",
  };

  const emails = user.emailAddresses.map((email: EmailAddress) => {
    const linkedTo = email.linkedTo.map((link) => ({
      ...link,
      linkedToDisplayName: providerMap[link.type] ?? null,
    }));

    return {
      id: email.id,
      emailAddress: email.emailAddress,
      verification: email.verification,
      isPrimary: email.id === primaryEmailId,
      linkedTo,
    };
  });

  return emails;
}
