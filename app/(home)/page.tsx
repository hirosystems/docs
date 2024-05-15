import Link from "next/link";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Integration } from "./page.client";

export default function HomePage(): JSX.Element {
  return (
    <>
      <div
        className="absolute inset-x-0 top-[200px] h-[250px] max-md:hidden"
        style={{
          background:
            "repeating-linear-gradient(to right, hsl(var(--border)), transparent 1px, transparent 50px), repeating-linear-gradient(to bottom, hsl(var(--border)), transparent 1px, transparent 50px)",
        }}
      />
      <main className="container relative max-w-[1250px] px-8 py-4 lg:py-16">
        <div className="relative border-b">
          <div className="grid grid-cols-1 bg-background border-r md:grid-cols-2 lg:grid-cols-3">
            <div className="relative flex flex-col overflow-hidden border-l border-t px-6 py-10">
              <h2 className="text-7xl font-extrabold font-sans">
                Build on Bitcoin Layers.
              </h2>
              <ul className="my-8 flex flex-col gap-6">
                <li>
                  <span className="font-medium">Guides and code samples.</span>
                  <span className="ml-2 text-muted-foreground">
                    Copy and paste your way to making things work.
                  </span>
                </li>
                <li>
                  <span className="font-medium">Interactive.</span>
                  <span className="ml-2 text-muted-foreground">
                    Play around and get results before installing anything.
                  </span>
                </li>
                <li>
                  <span className="font-medium">Fully open-source.</span>
                  <span className="ml-2 text-muted-foreground">
                    Open source, available on Github for contributions.
                  </span>
                </li>
              </ul>
              <div className="w-full mt-auto flex flex-row flex-wrap *:flex-1 gap-2 border-t pt-8">
                <Link
                  href="/stacks"
                  className={cn(
                    buttonVariants(),
                    "bg-[rgb(255,85,0)] hover:bg-[rgba(255,85,0,0.9)]"
                  )}
                >
                  Get started
                </Link>
                <Link
                  href="/guides"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    })
                  )}
                >
                  View all guides
                </Link>
              </div>
            </div>

            <Integration
              className="border-t lg:col-span-2"
              codeBlocks={[
                {
                  key: "clarinet",
                  message: "Install now and start building!",
                  block: (
                    <CodeBlock
                      wrapper={{ className: "mt-2" }}
                      lang="bash"
                      code="brew install clarinet"
                    />
                  ),
                },
                {
                  key: "stacks.js",
                  message: "Try it in your terminal!",
                  block: (
                    <CodeBlock
                      wrapper={{ className: "mt-2" }}
                      lang="bash"
                      code="npx create stacks"
                    />
                  ),
                },
                {
                  key: "chainhook",
                  message: "Install now and start scanning!",
                  block: (
                    <CodeBlock
                      wrapper={{ className: "mt-2" }}
                      lang="bash"
                      code="brew install chainhook"
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      </main>
    </>
  );
}
