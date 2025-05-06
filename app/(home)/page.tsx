import Link from "fumadocs-core/link";
import { StacksCardIcon, BitcoinCardIcon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Card as LinkCard } from "@/app/(home)/components/card";

export default function HomePage() {
  return (
    <main className="container mx-auto my-6 space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-[#141312] dark:text-[#f6f5f3]">
          Welcome to Hiro Docs.
        </h1>
        <h2 className="text-2xl font-regular text-muted-foreground">
          Explore our tutorials, guides, API references, and more.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <LinkCard
          href="/stacks"
          icon={<StacksCardIcon />}
          title="Stacks Docs"
          description="Start building on Stacks."
          badges={[
            { label: "CLARINET", href: "/stacks/clarinet" },
            { label: "CHAINHOOK", href: "/stacks/chainhook" },
            { label: "APIs", href: "/stacks/api" },
            { label: "SDKs & LIBRARIES", href: "/stacks/reference" },
            { label: "HIRO PLATFORM", href: "/stacks/platform" },
            { label: "STACKS.JS", href: "/stacks/stacks.js" },
            { label: "STACKS CONNECT", href: "/stacks/connect" },
            { label: "CLARITY LANG", href: "/stacks/clarity" },
          ]}
        />
        <LinkCard
          variant="secondary"
          href="/bitcoin"
          icon={<BitcoinCardIcon />}
          title="Bitcoin Docs"
          description="Start building on Ordinals and Runes."
          badges={[
            { label: "BITCOIN INDEXER", href: "/bitcoin/indexer" },
            { label: "APIs", href: "/bitcoin/api" },
            { label: "SDKs & LIBRARIES", href: "/bitcoin/sdks" },
          ]}
        />
      </div>

      <main className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Need help getting started?</h2>
          <p className="text-xl text-muted-foreground">
            Check out these resources.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Link href="/stacks/get-started" className="block h-full">
            <Card className="p-6 border bg-neutral-100 dark:bg-neutral-700 h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-2">
                Get started with Stacks
              </h3>
              <p className="text-muted-foreground text-sm flex-grow">
                Build on Stacks with some of our most popular guides and
                tutorials.
              </p>
            </Card>
          </Link>
          <Link href="/stacks/api" className="block h-full">
            <Card className="p-6 border bg-neutral-100 dark:bg-neutral-700 h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-2">
                Stacks API Overview
              </h3>
              <p className="text-muted-foreground text-sm flex-grow">
                View the API reference for the Stacks API.
              </p>
            </Card>
          </Link>
          <Link href="/bitcoin/get-started" className="block h-full">
            <Card className="p-6 border bg-neutral-100 dark:bg-neutral-700 h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-2">
                Get started with Bitcoin
              </h3>
              <p className="text-muted-foreground text-sm flex-grow">
                Build on Bitcoin with some of our most popular guides and
                tutorials.
              </p>
            </Card>
          </Link>
          <Link href="/bitcoin/ordinals/api" className="block h-full">
            <Card className="p-6 border bg-neutral-100 dark:bg-neutral-700 h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-2 font-fono">
                Ordinals API Overview
              </h3>
              <p className="text-muted-foreground text-sm flex-grow">
                View the API reference for our Ordinals API.
              </p>
            </Card>
          </Link>
        </div>
      </main>
    </main>
  );
}
