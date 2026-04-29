import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import { aeonik, aeonikFono, aeonikMono, inter } from '@/fonts';
import { KeyboardShortcutsProvider } from '@/hooks/use-keyboard-shortcuts';
import { ApiCredentialsProvider } from '@/providers/api-credentials-provider';
import { QueryProvider } from '@/providers/query-provider';
import { Banner } from '@/components/ui/banner';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${aeonik.variable} ${aeonikFono.variable} ${aeonikMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <Banner id="chainhooks-deprecation">
          Hosted Chainhooks v1 and L1 APIs (Ordinals, Runes, BRC20) deprecated March 9th, please migrate now!
        </Banner>
        <QueryProvider>
          <ApiCredentialsProvider>
            <KeyboardShortcutsProvider>
              <RootProvider
                search={{
                  enabled: true,
                }}
              >
                {children}
              </RootProvider>
            </KeyboardShortcutsProvider>
          </ApiCredentialsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
