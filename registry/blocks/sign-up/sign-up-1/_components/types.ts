export type SignUpIdentifier = "emailAddress" | "username";
export type SignUpAdditionalField = "firstName" | "lastName" | "password";

export type SignUpRequiredFields = [
  SignUpIdentifier,
  ...SignUpAdditionalField[]
];
