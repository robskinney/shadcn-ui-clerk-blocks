import { ExternalAccount } from "@clerk/backend";

export type EnhancedExternalAccount = Partial<ExternalAccount> & {
  providerName?: string;
  providerIcon?: React.ComponentType<{ className?: string }>;
};
