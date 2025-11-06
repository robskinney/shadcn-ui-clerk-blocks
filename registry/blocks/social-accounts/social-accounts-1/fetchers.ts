import { ExternalAccountsMap } from "@/registry/lib/external-accounts-map";
import { currentUser, ExternalAccount } from "@clerk/nextjs/server";
import { EnhancedExternalAccount } from "./types";

export async function fetchSocialAccounts() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Failed to retrieve social accounts.");
  }

  const accounts = user.externalAccounts.map((account: ExternalAccount) => {
    return {
      ...account,
      providerName: ExternalAccountsMap[account.provider].name ?? null,
      providerIcon: ExternalAccountsMap[account.provider].icon ?? null,
    };
  });

  return accounts as EnhancedExternalAccount[];
}
