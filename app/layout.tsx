import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { aeonik, aeonikFono, aeonikMono, inter } from "@/fonts";
import { SearchProvider } from "@/hooks/use-search";
// import SearchDialog from "@/components/search-dialog";
import { KeyboardShortcutsProvider } from "@/hooks/use-keyboard-shortcuts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${aeonik.variable} ${aeonikFono.variable} ${aeonikMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <KeyboardShortcutsProvider>
          <SearchProvider>
            <RootProvider
              search={{
                enabled: true,
              }}
            >
              {children}
            </RootProvider>
            {/* <SearchDialog /> TODO: this is new new dialog */}
          </SearchProvider>
        </KeyboardShortcutsProvider>
      </body>
    </html>
  );
}
