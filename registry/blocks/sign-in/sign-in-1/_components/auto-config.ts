import { AuthConfig } from "@/components/clerk-ui-provider";
import { SignInRequiredFields } from "./types";

export default function getSignInConfig(authConfig: AuthConfig) {
  let identifier = "emailAddress";
  if (authConfig.emailAddress === "off" && authConfig.username !== "off") {
    identifier = "username";
  }

  return {
    enabledOAuthStrategies: authConfig.enabledOAuthStrategies,
    requiredFields: [identifier, "password"] as SignInRequiredFields,
  };
}
