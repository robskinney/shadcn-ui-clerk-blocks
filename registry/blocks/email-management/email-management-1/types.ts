import { EmailAddress } from "@clerk/backend";

export type EnhancedLinkedTo = {
  id: string;
  type: string;
  providerName?: string | null;
  providerIcon?: React.ComponentType<{ className?: string }>;
};

export type EnhancedEmailAddress = Partial<EmailAddress> & {
  isPrimary?: boolean;
  linkedTo?: EnhancedLinkedTo[];
};
