import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Braces, Database, Play } from 'lucide-react';
import { Card, Cards, SmallCard } from '@/components/card';
import { API, Chainhook, Hiro, Ordinals, Runes, StacksIcon } from '@/components/ui/icon';
import heroImage from '@/public/stacks-hero.svg';

export default function HomePage() {
  return (
    <main className="my-2 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)] py-6">
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
                <h3 className="text-3xl">Welcome to Hiro Docs</h3>
                <p>Find all the guides and resources you need to build on Stacks.</p>
              </div>
            </div>
          </div>
          <Cards>
            <Card
              className="group space-y-1"
              icon={
                <API className="transition-colors duration-500 ease-in-out group-hover:text-primary" />
              }
              href="/apis/stacks-blockchain-api"
              title="Stacks API Reference"
              description="Explore API endpoints for interacting with the Stacks Blockchain."
            />
            <Card
              className="group space-y-1"
              icon={
                <Play className="transition-colors duration-500 ease-in-out group-hover:text-primary" />
              }
              href="/resources/guides"
              title="Guides"
              description="Explore guides for building on Stacks."
            />
          </Cards>
          <div className="flex flex-col">
            <h4 id="explore-by-category" className="scroll-m-20">
              <a
                href="#explore-by-category"
                className="not-prose group text-sm text-muted-foreground uppercase"
              >
                Tools
              </a>
            </h4>
            <hr className="border-t border-border my-2" />
            <Cards>
              <SmallCard
                icon={<Chainhook />}
                badge="beta"
                href="/tools/chainhooks"
                title="Chainhooks"
                description="Create custom event streams and triggers for real-time blockchain data processing."
              />
              <SmallCard
                icon={<Braces />}
                href="/tools/contract-monitoring"
                title="Contract Monitoring"
                description="Monitor and track smart contract activity and performance metrics."
              />
              <SmallCard
                icon={<Database />}
                href="/tools/bitcoin-indexer"
                title="Bitcoin Indexer"
                description="Index and query Bitcoin blockchain data with high-performance indexing."
              />
            </Cards>
          </div>
          <div className="flex flex-col">
            <h4 id="explore-by-category" className="text-muted-foreground scroll-m-20">
              <a href="#explore-by-category" className="not-prose group text-sm uppercase">
                APIs
              </a>
            </h4>
            <hr className="border-t border-border my-2" />
            <Cards>
              <SmallCard
                icon={<StacksIcon />}
                href="/apis/stacks-blockchain-api"
                title="Stacks Blockchain API"
                description="Comprehensive REST API for interacting with the Stacks blockchain and network data."
              />
              <SmallCard
                icon={<API />}
                href="/apis/token-metadata-api"
                title="Token Metadata API"
                description="Fast, reliable metadata for fungible and non-fungible tokens on Stacks."
              />
              <SmallCard
                icon={<Hiro />}
                href="/apis/platform-api"
                title="Platform API"
                description="Programmatically manage devnets and chainhooks via REST interface."
              />
              <SmallCard
                icon={<Ordinals />}
                href="/apis/ordinals-api"
                title="Ordinals API"
                description="Complete Bitcoin ordinals and BRC-20 token data with caching optimization."
              />
              <SmallCard
                icon={<Runes />}
                href="/apis/runes-api"
                title="Runes API"
                description="Fast, reliable data for Bitcoin Runes via an easy-to-use REST interface."
              />
              <SmallCard
                icon={<API />}
                href="/apis/signer-metrics-api"
                title="Signer Metrics API"
                description="Monitor and analyze signer behavior and performance on the Stacks network."
              />
            </Cards>
          </div>
          <div className="flex flex-col">
            <h4 id="explore-by-category" className="text-muted-foreground scroll-m-20">
              <a href="#explore-by-category" className="not-prose group text-sm uppercase">
                Resources
              </a>
            </h4>
            <hr className="border-t border-border my-2" />
            <Cards>
              <SmallCard
                icon={<Play />}
                href="/resources/guides"
                title="Guides"
                description="Step-by-step walkthroughs for building on Bitcoin layers."
              />
              <SmallCard
                icon={<Database />}
                href="/resources/archive"
                title="Hiro Archive"
                description="Data snapshots for quickly bootstrapping Stacks ecosystem services with pre-loaded data."
              />
            </Cards>
          </div>
        </div>
      </div>
    </main>
  );
}
