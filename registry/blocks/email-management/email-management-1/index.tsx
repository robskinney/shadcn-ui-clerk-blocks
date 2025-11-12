import { EnhancedEmailAddress } from "./types";
import { fetchEmailAddresses } from "./fetchers";
import EmailManagement1Inner from "./inner";

export type EmailManagement1Props = {
  /**
  * A list of Clerk's [EmailAddress](https://clerk.com/docs/reference/javascript/types/email-address) type
  * with a `isPrimary` boolean and an improved `linkedTo` field, with a `providerName` and `providerIcon`.
  **/
  emails?: EnhancedEmailAddress[];
};

export default function EmailManagement1({ emails }: EmailManagement1Props) {
  if (emails) {
    return <EmailManagement1Inner emails={emails} />;
  }

  return <EmailManagement1WithClerk />;
}

async function EmailManagement1WithClerk() {
  const emails = await fetchEmailAddresses();

  if (!emails || emails.length === 0) return <p>No Emails found.</p>;

  return <EmailManagement1Inner emails={JSON.parse(JSON.stringify(emails))} />;
}

