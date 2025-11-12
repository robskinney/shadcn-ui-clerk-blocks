import { ExternalAccountsMap } from "@/registry/lib/external-accounts-map";
import { ExternalAccount } from "@clerk/backend";

export type EnhancedExternalAccount = Partial<ExternalAccount> & {
  /**
  * The formatted name of the OAuth provider.
  **/
  providerName?: string;
  /**
  * An icon component for the OAuth provider.
  **/
  providerIcon?: React.ComponentType<{ className?: string }>;
};

export type AvailableExternalProviders = (keyof typeof ExternalAccountsMap)[];
