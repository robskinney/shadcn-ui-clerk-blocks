export type SignInIdentifier = "emailAddress" | "username";
export type SignInAdditionalField = "password";

export type SignInRequiredFields = [
  SignInIdentifier,
  ...SignInAdditionalField[]
];
