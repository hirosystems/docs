import { StacksCardIcon, BitcoinCardIcon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "fumadocs-core/link";

export default function HomePage(): JSX.Element {
  return (
    <main className="container max-w-7xl mx-auto my-12 space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Hiro Docs.
        </h1>
        <h2 className="text-4xl font-bold text-gray-900">
          Let's start building.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {/* Stacks Docs Card */}
        <Link
          href="/stacks"
          className="not-prose block rounded-lg border bg-card p-4 text-md text-card-foreground transition-colors hover:bg-accent/80"
        >
          <div className="mb-6">
            <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4">
              <StacksCardIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stacks Docs</h3>
            <p className="text-muted-foreground">
              Find all the guides and resources you need to build on Stacks.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              CLARINET
            </Badge>
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              CHAINHOOK
            </Badge>
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              STACKS.JS
            </Badge>
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              HIRO PLATFORM
            </Badge>
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              STACKS API
            </Badge>
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              TOKEN METADATA API
            </Badge>
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              +3 MORE
            </Badge>
          </div>
        </Link>
        <Link
          href="/bitcoin"
          className="not-prose block rounded-lg border bg-card p-4 text-md text-card-foreground transition-colors hover:bg-accent/80"
        >
          <div className="mb-6">
            <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4">
              <BitcoinCardIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bitcoin Docs</h3>
            <p className="text-muted-foreground">
              Find all the guides and resources you need to build on Ordinals
              and Runes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              ORDHOOK
            </Badge>
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              ORDINALS API
            </Badge>
            <Badge
              variant="secondary"
              className="bg-background/95 text-gray-900"
            >
              RUNES API
            </Badge>
          </div>
        </Link>
      </div>

      <main className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Need help getting started?</h2>
          <p className="text-xl text-muted-foreground">
            Check these resources.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Link href="/stacks/get-started" className="block">
            <Card className="p-6 border bg-card">
              <h3 className="text-lg font-semibold mb-2">
                Get started with Stacks
              </h3>
              <p className="text-muted-foreground text-sm">
                Learn how to build on Stacks with guides and tutorials.
              </p>
            </Card>
          </Link>
          <Link href="/stacks/api" className="block">
            <Card className="p-6 border bg-card">
              <h3 className="text-lg font-semibold mb-2">
                Stacks API Overview
              </h3>
              <p className="text-muted-foreground text-sm">
                Learn how to use the Stacks API to build on Stacks.
              </p>
            </Card>
          </Link>
          <Link href="/bitcoin/get-started" className="block">
            <Card className="p-6 border bg-card">
              <h3 className="text-lg font-semibold mb-2">
                Get started with Bitcoin
              </h3>
              <p className="text-muted-foreground text-sm">
                Learn how to build on Bitcoin with guides and tutorials.
              </p>
            </Card>
          </Link>
          <Link href="/bitcoin/ordinals/api" className="block">
            <Card className="p-6 border bg-card">
              <h3 className="text-lg font-semibold mb-2">
                Ordinals API Overview
              </h3>
              <p className="text-muted-foreground text-sm">
                Learn how to use the Ordinals API to build on Bitcoin.
              </p>
            </Card>
          </Link>
        </div>
      </main>
    </main>
  );
}
