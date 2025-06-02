import { Cards, Card, SmallCard } from "@/components/card";
import { Play, Code, Database, Braces, Cloud } from "lucide-react";
import { API, Backend, Frontend } from "@/components/ui/icon";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import heroImage from "@/public/stacks-hero.svg";

export default function ToolsPage() {
  return (
    <main className="my-2 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)]">
        <div className="space-y-10">
          <div className="space-y-1">
            <div className="flex space-x-6 items-end">
              <ImageZoom
                alt="banner"
                src={heroImage}
                className="mt-0 mb-6 first-line:rounded-xl bg-background"
                priority
              />

              <div className="flex flex-col [&_p]:mb-6 space-y-3">
                <h3 className="text-3xl">Tools</h3>
                <p>
                  Find all the guides and resources you need to build on Stacks.
                </p>
              </div>
            </div>
          </div>

          <Cards>
            <Card
              className="group space-y-1"
              icon={
                <Play className="transition-colors duration-500 ease-in-out group-hover:text-primary" />
              }
              href="/start"
              title="Get Started"
              description="Get started with our end-to-end tutorials and quickstart guides across all Hiro tools."
            />
            <Card
              className="group space-y-1"
              icon={
                <API className="transition-colors duration-500 ease-in-out group-hover:text-primary" />
              }
              href="/apis/stacks-blockchain"
              title="Stacks API Reference"
              description="Explore API endpoints for interacting with the Stacks Blockchain."
            />
          </Cards>

          <div className="flex flex-col">
            <h4
              id="explore-by-category"
              className="text-[#595650] dark:text-[#8c877d] scroll-m-20"
            >
              <a
                href="#explore-by-category"
                className="not-prose group text-sm uppercase"
              >
                Tools
              </a>
            </h4>
            <Cards>
              <SmallCard
                icon={<Cloud />}
                href="/stacks/platform"
                title="Quickstart App Templates"
                description="Full-stack starter-kits, including front-end, back-end, and smart contract components."
              />
              <SmallCard
                icon={<Code />}
                href="/stacks/clarinet"
                title="Smart Contract Development"
                description="Kickstart your smart contract journey with Clarinet and the Clarinet JS SDK."
              />
              <SmallCard
                icon={<Database />}
                href="/stacks/chainhook"
                title="Data Streaming &amp; Events"
                description="Create custom event streams for real-time data with Chainhook."
              />
              <SmallCard
                icon={<Frontend />}
                href="/stacks/stacks.js"
                title="Frontend Web Development"
                description="Interact with smart contracts on the web with the Stacks.js library."
              />
              <SmallCard
                icon={<Backend />}
                href="/stacks/api"
                title="Backend Development"
                description="Explore our hosted APIs offering a familiar REST interface."
              />
              <SmallCard
                icon={<Braces />}
                href="/stacks/token-metadata-api"
                title="Token Management"
                description="Explore our hosted API for fetching token metadata on Stacks."
              />
            </Cards>
          </div>
        </div>
      </div>
    </main>
  );
}
