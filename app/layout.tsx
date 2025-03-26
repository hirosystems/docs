import "./global.css";
import { aeonik, aeonikFono, aeonikMono, inter } from "@/app/fonts";
import type { Viewport } from "next";
import { baseUrl, createMetadata } from "@/utils/metadata";
import { Provider } from "./provider";
import { GoogleTagManager } from "@next/third-parties/google";
import { Banner } from "@/components/ui/banner";
import { Discord, Github, HiroSVG, Youtube, X } from "@/components/ui/icon";

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
      className={`${aeonik.variable} ${aeonikFono.variable} ${aeonikMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="flex min-h-screen flex-col">
        <Provider>
          <Banner
            id="hacks"
            cta="Start hacking"
            url="/stacks/hacks/build-with-sbtc"
            startDate="2025-03-26"
            endDate="2025-04-01"
            mobileText="Compete for a scholarship to Bitcoin 2025 in Las Vegas."
          >
            Compete for a scholarship to Bitcoin 2025
          </Banner>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

function Footer(): JSX.Element {
  return (
    <footer className="mt-auto border-t border-accent bg-background py-12 text-secondary-foreground">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-6">
            <div className="bg-primary w-fit rounded-[4px] p-1.5 text-muted-foreground [&_svg]:size-4">
              <HiroSVG className="text-card" />
            </div>
            <a
              className="text-sm text-primary transition-colors hover:text-accent-foreground max-lg:hidden after:content-[''] after:block after:h-[1px] after:mt-0.5 after:border after:border-1 after:border-border hover:after:border-primary/50"
              href="https://hiro.so/"
              target="_blank"
            >
              hiro.so
            </a>
            <a
              className="text-sm text-primary transition-colors hover:text-accent-foreground max-lg:hidden after:content-[''] after:block after:h-[1px] after:mt-0.5 after:border after:border-1 after:border-border hover:after:border-primary/50"
              href="/guides"
            >
              Guides
            </a>
            <a
              className="text-sm text-primary transition-colors hover:text-accent-foreground max-lg:hidden after:content-[''] after:block after:h-[1px] after:mt-0.5 after:border after:border-1 after:border-border hover:after:border-primary/50"
              href="https://platform.hiro.so/"
              target="_blank"
            >
              Hiro Platform
            </a>
            <a
              className="text-sm text-primary transition-colors hover:text-accent-foreground max-lg:hidden after:content-[''] after:block after:h-[1px] after:mt-0.5 after:border after:border-1 after:border-border hover:after:border-primary/50"
              href="https://status.hiro.so/"
              target="_blank"
            >
              Status
            </a>
            <a
              className="text-sm text-primary transition-colors hover:text-accent-foreground max-lg:hidden after:content-[''] after:block after:h-[1px] after:mt-0.5 after:border after:border-1 after:border-border hover:after:border-primary/50"
              href="https://hackerone.com/hiro?type=team"
              target="_blank"
            >
              Bounty Program
            </a>
          </div>
          <div className="flex flex-col space-y-3 items-end">
            <div className="flex flex-row items-center gap-6">
              <a
                href="https://x.com/hirosystems"
                target="_blank"
                className="transition-colors"
              >
                <X />
              </a>
              <a
                href="https://stacks.chat/"
                target="_blank"
                className="transition-colors"
              >
                <Discord />
              </a>
              <a
                href="https://github.com/hirosystems"
                target="_blank"
                className="transition-colors"
              >
                <Github />
              </a>
              <a
                href="https://www.youtube.com/c/hirosystems/"
                target="_blank"
                className="transition-colors"
              >
                <Youtube />
              </a>
            </div>
            <p className="text-sm text-[#b7ac9f] font-aeonikFono">
              Copyright &copy; {new Date().getFullYear()} Hiro Systems, PBC.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
