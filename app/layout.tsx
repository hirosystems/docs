import "./global.css";
import "fumadocs-ui/twoslash.css";
import { aeonikFono, aeonikMono, inter } from "@/app/fonts/fonts";
import type { Viewport } from "next";
import { baseUrl, createMetadata } from "@/utils/metadata";
import { Provider } from "./provider";
import { GoogleTagManager } from "@next/third-parties/google";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID as string;

export const metadata = createMetadata({
  title: {
    template: "%s | Hiro Docs",
    default: "Hiro Documentation",
  },
  description: "Hiro Documentation",
  metadataBase: baseUrl,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "var(--background)" },
    { media: "(prefers-color-scheme: light)", color: "var(--background)" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html
      lang="en"
      className={`${aeonikFono.variable} ${aeonikMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="flex min-h-screen flex-col">
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

function Footer(): JSX.Element {
  return (
    <footer className="mt-auto border-t bg-card py-12 text-secondary-foreground">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold">Hiro Docs</p>
        </div>

        {/* <div className="flex flex-row flex-wrap items-center gap-12">
          <Link
            href="/guides"
            className="flex flex-row items-center text-sm text-muted-foreground transition-colors hover:text-accent-foreground"
          >
            Guides
          </Link>
        </div> */}
      </div>
    </footer>
  );
}
