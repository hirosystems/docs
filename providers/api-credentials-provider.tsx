'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CredentialMap = Record<string, string>;

type ApiCredentialsContextValue = {
  getCredential: (id: string) => string;
  setCredential: (id: string, value: string) => void;
  clearCredential: (id: string) => void;
};

const ApiCredentialsContext = createContext<ApiCredentialsContextValue | undefined>(undefined);
const STORAGE_KEY = 'hiro-api-playground-credentials';

export function ApiCredentialsProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<CredentialMap>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as CredentialMap;
      if (parsed && typeof parsed === 'object') {
        setCredentials(parsed);
      }
    } catch (error) {
      console.warn('Failed to load stored API credentials:', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (Object.keys(credentials).length === 0) {
        window.sessionStorage.removeItem(STORAGE_KEY);
        return;
      }
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
    } catch (error) {
      console.warn('Failed to persist API credentials:', error);
    }
  }, [credentials]);

  const value = useMemo<ApiCredentialsContextValue>(
    () => ({
      getCredential: (id) => credentials[id] ?? '',
      setCredential: (id, value) => {
        const trimmedValue = value.trim();
        setCredentials((prev) => {
          if (!trimmedValue) {
            if (!(id in prev)) return prev;
            const updated = { ...prev };
            delete updated[id];
            return updated;
          }
          return { ...prev, [id]: trimmedValue };
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
