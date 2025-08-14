import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import { aeonik, aeonikFono, aeonikMono, inter } from '@/fonts';
import { KeyboardShortcutsProvider } from '@/hooks/use-keyboard-shortcuts';
import { QueryProvider } from '@/providers/query-provider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${aeonik.variable} ${aeonikFono.variable} ${aeonikMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <QueryProvider>
          <KeyboardShortcutsProvider>
            <RootProvider
              search={{
                enabled: true,
              }}
            >
              {children}
            </RootProvider>
          </KeyboardShortcutsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
