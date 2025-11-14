import { IdentificationLinkJSON } from "@clerk/types";

export type FormattedEmailAddress = {
  id: string;
  emailAddress: string;
  isVerified: boolean;
  isPrimary: boolean;
  linkedTo?: IdentificationLinkJSON[];
};
