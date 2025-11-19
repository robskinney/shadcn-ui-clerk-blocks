import * as SignIn from "@clerk/elements/sign-in";
import SignInStrategyPassword from "./sign-in-strategy-password";
import SignInStrategyEmailCode from "./sign-in-strategy-email_code";
import SignInStrategyEmailLink from "./sign-in-strategy-email_link";

export type SignInVerificationsProps = {
  isGlobalLoading: boolean;
};

export default function SignInVerifications({
  isGlobalLoading,
}: SignInVerificationsProps) {
  return (
    <SignIn.Step name="verifications">
      <SignInStrategyPassword isGlobalLoading={isGlobalLoading} />

      <SignInStrategyEmailCode isGlobalLoading={isGlobalLoading} />

      <SignInStrategyEmailLink />
    </SignIn.Step>
  );
}
