'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

type CredentialMap = Record<string, string>;

type ApiCredentialsContextValue = {
  getCredential: (id: string) => string;
  setCredential: (id: string, value: string) => void;
  clearCredential: (id: string) => void;
};

const ApiCredentialsContext = createContext<ApiCredentialsContextValue | undefined>(undefined);

export function ApiCredentialsProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<CredentialMap>({});

  const value = useMemo<ApiCredentialsContextValue>(
    () => ({
      getCredential: (id) => credentials[id] ?? '',
      setCredential: (id, value) => {
        setCredentials((prev) => {
          if (!value.trim()) {
            const updated = { ...prev };
            delete updated[id];
            return updated;
          }
          return { ...prev, [id]: value.trim() };
        });
      },
      clearCredential: (id) => {
        setCredentials((prev) => {
          if (!(id in prev)) return prev;
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      },
    }),
    [credentials],
  );

  return <ApiCredentialsContext.Provider value={value}>{children}</ApiCredentialsContext.Provider>;
}

export function useApiCredentials() {
  const context = useContext(ApiCredentialsContext);
  if (!context) {
    throw new Error('useApiCredentials must be used within an ApiCredentialsProvider');
  }
  return context;
}
