"use client";

import { OAuthStrategy } from "@clerk/types";
import { createContext, useContext, useEffect, useState } from "react";

type ClerkEnvironment = any;

const EnvironmentContext = createContext<ClerkEnvironment | null>(null);

export type AuthConfig = {
  enabledOAuthStrategies: OAuthStrategy[];
  emailAddress: "on" | "off" | "required";
  firstName: "on" | "off" | "required";
  lastName: "on" | "off" | "required";
  password: "on" | "off" | "required";
  phoneNumber: "on" | "off" | "required";
  username: "on" | "off" | "required";
};

export type EnvironmentContextValue = {
  clerkEnvironmentLoading: boolean;
  authConfig: AuthConfig;
};

export function ClerkUIProvider({ children }: { children: React.ReactNode }) {
  const [clerkEnvironmentLoading, setClerkEnvironmentLoading] = useState(true);
  const [authConfig, setAuthConfig] = useState<AuthConfig | null>(null);

  useEffect(() => {
    async function loadEnvironment() {
      try {
        const res = await fetch("/api/clerk/environment");
        const env = await res.json();

        const enabledOAuthStrategies =
          env.auth_config.identification_strategies.filter((s: string) =>
            s.startsWith("oauth_")
          );

        setAuthConfig({
          enabledOAuthStrategies,
          emailAddress: env.auth_config.email_address,
          firstName: env.auth_config.first_name,
          lastName: env.auth_config.last_name,
          password: env.auth_config.password,
          phoneNumber: env.auth_config.phone_number,
          username: env.auth_config.username,
        });
      } finally {
        setClerkEnvironmentLoading(false);
      }
    }

    loadEnvironment();
  }, []);

  return (
    <EnvironmentContext.Provider
      value={{ clerkEnvironmentLoading, authConfig }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useClerkEnvironment(): EnvironmentContextValue {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error(
      "useClerkEnvironment must be used within a ClerkUIProvider"
    );
  }
  return context;
}

// type ClerkEnvironment = {
//     auth_config: {
//         object: string,
//         id: string,
//         first_name: string,
//         last_name: string,
//         email_address: string,
//         phone_number: string,
//         username: string;
//         password: string;
//         identification_requirements: {}[];
//         identification_strategies: [string];
//     }
// };
