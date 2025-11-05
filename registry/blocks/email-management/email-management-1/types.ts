import { EmailAddress } from "@clerk/backend";

export type EnhancedLinkedTo = {
  id: string;
  type: string;
  linkedToDisplayName?: string | null;
};

export type EnhancedEmailAddress = Partial<EmailAddress> & {
  isPrimary?: boolean;
  linkedTo?: EnhancedLinkedTo[];
};
