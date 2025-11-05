"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface InstallationContextType {
  installId: string;
  setInstallId: (id: string) => void;
}

export const InstallationContext =
  createContext<InstallationContextType | null>(null);

export const useInstallation = (): InstallationContextType => {
  const context = useContext(InstallationContext);
  if (!context) {
    throw new Error(
      "useInstallation must be used within an InstallationProvider"
    );
  }
  return context;
};

export const InstallationProvider = ({
  children,
  installId: initialInstallId,
}: PropsWithChildren<{
  installId: string | undefined;
}>) => {
  const [installId, setInstallId] = useState(initialInstallId || "");

  const providerValue = useMemo(
    () => ({
      installId,
      setInstallId,
    }),
    [installId]
  );

  return (
    <InstallationContext.Provider value={providerValue}>
      {children}
    </InstallationContext.Provider>
  );
};
