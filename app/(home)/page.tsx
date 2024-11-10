import Link from "fumadocs-core/link";
import { StacksCardIcon, BitcoinCardIcon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage(): JSX.Element {
  return (
    <main className="container mx-auto my-12 space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-[#141312] dark:text-[#f6f5f3]">
          Welcome to Hiro Docs.
        </h1>
        <h2 className="text-2xl font-regular text-muted-foreground font-inter">
          Explore our tutorials, guides, API references, and more.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <Link
          href="/stacks"
          className="not-prose block rounded-lg border bg-[#EBE9E6] dark:bg-[#2a2726] p-4 text-md text-card-foreground transition-colors hover:shadow-[0_6px_20px_rgba(89,86,80,0.2)] dark:hover:shadow-[0_6px_40px_#383432]"
        >
          <div className="mb-6">
            <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4">
              <StacksCardIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stacks Docs</h3>
            <p className="text-muted-foreground">Start building on Stacks.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              CLARINET
            </Badge>
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              CHAINHOOK
            </Badge>
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              STACKS.JS
            </Badge>
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              HIRO PLATFORM
            </Badge>
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              STACKS API
            </Badge>
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              TOKEN METADATA API
            </Badge>
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              +3 MORE
            </Badge>
          </div>
        </Link>
        <Link
          href="/bitcoin"
          className="not-prose block rounded-lg border bg-[#EBE9E6] dark:bg-[#2a2726] p-4 text-md text-card-foreground transition-colors hover:shadow-[0_6px_20px_rgba(89,86,80,0.2)] dark:hover:shadow-[0_6px_40px_#383432]"
        >
          <div className="mb-6">
            <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4">
              <BitcoinCardIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bitcoin Docs</h3>
            <p className="text-muted-foreground">
              Start building on Ordinals and Runes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              ORDHOOK
            </Badge>
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              ORDINALS API
            </Badge>
            <Badge className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]">
              RUNES API
            </Badge>
          </div>
        </Link>
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
            <Card className="p-6 border bg-[#f2f0ed] dark:bg-[#1e1c1b] h-full flex flex-col">
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
            <Card className="p-6 border bg-[#f2f0ed] dark:bg-[#1e1c1b] h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-2">
                Stacks API Overview
              </h3>
              <p className="text-muted-foreground text-sm flex-grow">
                View the API reference for the Stacks API.
              </p>
            </Card>
          </Link>
          <Link href="/bitcoin/get-started" className="block h-full">
            <Card className="p-6 border bg-[#f2f0ed] dark:bg-[#1e1c1b] h-full flex flex-col">
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
            <Card className="p-6 border bg-[#f2f0ed] dark:bg-[#1e1c1b] h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-2">
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
