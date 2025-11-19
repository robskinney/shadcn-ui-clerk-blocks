import * as SignUp from "@clerk/elements/sign-up";
import SignUpStrategyEmailCode from "./sign-up-strategy-email_code";
import SignUpStrategyEmailLink from "./sign-up-strategy-email_link";

export type SignUpVerificationsProps = {
  isGlobalLoading: boolean;
};

export default function SignUpVerifications({
  isGlobalLoading,
}: SignUpVerificationsProps) {
  return (
    <SignUp.Step name="verifications">
      <SignUpStrategyEmailCode isGlobalLoading={isGlobalLoading} />

      <SignUpStrategyEmailLink />
    </SignUp.Step>
  );
}
