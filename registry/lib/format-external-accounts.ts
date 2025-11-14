import { OAuthProvider, OAuthStrategy } from "@clerk/types";
import {
  FaGoogle,
  FaMicrosoft,
  FaGithub,
  FaApple,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

export type ExternalProviderInfo = {
  key: OAuthStrategy;
  alias: OAuthProvider;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const ExternalAccountsMap: Record<string, ExternalProviderInfo> = {
  oauth_google: {
    key: "oauth_google",
    alias: "google",
    name: "Google",
    icon: FaGoogle,
  },
  oauth_microsoft: {
    key: "oauth_microsoft",
    alias: "microsoft",
    name: "Microsoft",
    icon: FaMicrosoft,
  },
  oauth_github: {
    key: "oauth_github",
    alias: "github",
    name: "GitHub",
    icon: FaGithub,
  },
  oauth_apple: {
    key: "oauth_apple",
    alias: "apple",
    name: "Apple",
    icon: FaApple,
  },
  oauth_facebook: {
    key: "oauth_facebook",
    alias: "facebook",
    name: "Facebook",
    icon: FaFacebook,
  },
  oauth_linkedin: {
    key: "oauth_linkedin",
    alias: "linkedin",
    name: "LinkedIn",
    icon: FaLinkedin,
  },
};

export function getExternalAccount(provider: string) {
  const key = provider.startsWith("oauth_") ? provider : `oauth_${provider}`;
  return ExternalAccountsMap[key];
}
