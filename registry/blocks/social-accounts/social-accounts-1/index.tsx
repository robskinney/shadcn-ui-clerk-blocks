import { fetchSocialAccounts } from "./fetchers";
import { SocialAccounts1Inner } from "./inner";
import { EnhancedExternalAccount } from "./types";
import { OAuthStrategy } from "@clerk/types";

export type SocialAccounts1Props = {
  /**
  * A list of enabled Clerk [OAuthStrategy](https://clerk.com/docs/reference/javascript/types/sso#o-auth-strategy) strings.
  * @example ["oauth_google", "oauth_microsoft"]
  **/
  enabledStrategies: OAuthStrategy[];
  /**
  * A list of Clerk's [ExternalAccount](https://clerk.com/docs/reference/javascript/types/external-account) object
  * enhanced with a frontend-ready `providerName` and `providerIcon`.
  **/
  accounts?: EnhancedExternalAccount[];
  /**
  * The URL to redirect to after successfully linking an account.
  * @default "/"
  **/
  redirectUrl?: string;
};

export default function SocialAccounts1({
  enabledStrategies,
  accounts,
  redirectUrl = "/",
}: SocialAccounts1Props) {
  if (accounts) {
    return (
      <SocialAccounts1Inner
        accounts={JSON.parse(JSON.stringify(accounts))}
        enabledStrategies={enabledStrategies}
        redirectUrl={redirectUrl}
      />
    );
  }

  return (
    <SocialAccounts1WithClerk
      enabledStrategies={enabledStrategies}
      redirectUrl={redirectUrl}
    />
  );
}

async function SocialAccounts1WithClerk({
  enabledStrategies,
  redirectUrl,
}: {
  enabledStrategies: OAuthStrategy[];
  redirectUrl: string;
}) {
  const accounts = await fetchSocialAccounts();

  return (
    <SocialAccounts1Inner
      accounts={JSON.parse(JSON.stringify(accounts))}
      enabledStrategies={enabledStrategies}
      redirectUrl={redirectUrl}
    />
  );
}
