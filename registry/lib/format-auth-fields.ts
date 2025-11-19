export type AuthField = {
  key: string;
  name: string;
  alias: string;
  autoComplete: string;
  placeholder: string;
};

export const AuthFieldMap: Record<string, AuthField> = {
  emailAddress: {
    key: "email",
    name: "emailAddress",
    alias: "Email",
    autoComplete: "email",
    placeholder: "robertskinney@outlook.com",
  },
  username: {
    key: "username",
    name: "username",
    alias: "Username",
    autoComplete: "username",
    placeholder: "robskinney",
  },
  firstName: {
    key: "firstName",
    name: "firstName",
    alias: "First Name",
    autoComplete: "given-name",
    placeholder: "Robert",
  },
  lastName: {
    key: "lastName",
    name: "lastName",
    alias: "Last Name",
    autoComplete: "family-name",
    placeholder: "Kinney",
  },
  password: {
    key: "password",
    name: "password",
    alias: "Password",
    autoComplete: "current_password",
    placeholder: "********",
  },
};

export function getAuthFieldInfo(key: string) {
  return AuthFieldMap[key];
}
