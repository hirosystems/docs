import { Cards, IndexCard } from '@/components/card';
import { API, Hiro, Ordinals, Runes, StacksIcon } from '@/components/ui/icon';

export default function APIsPage() {
  return (
    <main className="my-6 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)]">
        <div className="space-y-10">
          <div className="space-y-1">
            <h3 className="text-3xl">APIs</h3>
            <hr className="border-t border-border mt-8" />
          </div>
          <Cards>
            <IndexCard
              icon={<StacksIcon />}
              href="/apis/stacks-blockchain-api"
              title="Stacks Blockchain API"
              description="Comprehensive REST API for interacting with the Stacks blockchain and network data."
            />
            <IndexCard
              icon={<StacksIcon />}
              href="/apis/stacks-node-rpc-api"
              title="Stacks Node RPC API"
              description="Raw blockchain node methods: submit txs, call read-only contracts, query mempool/state."
            />
            <IndexCard
              icon={<API />}
              href="/apis/token-metadata-api"
              title="Token Metadata API"
              description="Fast, reliable metadata for fungible and non-fungible tokens on Stacks."
            />
            <IndexCard
              icon={<Hiro />}
              href="/apis/platform-api"
              title="Platform API"
              description="Programmatically manage devnets and chainhooks via REST interface."
            />
            <IndexCard
              icon={<Ordinals />}
              href="/apis/ordinals-api"
              title="Ordinals API"
              tag="Bitcoin L1"
              description="Complete Bitcoin ordinals and BRC-20 token data with caching optimization."
            />
            <IndexCard
              icon={<Runes />}
              href="/apis/runes-api"
              title="Runes API"
              tag="Bitcoin L1"
              description="Fast, reliable data for Bitcoin Runes via an easy-to-use REST interface."
            />
            <IndexCard
              icon={<API />}
              href="/apis/signer-metrics-api"
              title="Signer Metrics API"
              description="Monitor and analyze signer behavior and performance on the Stacks network."
            />
          </Cards>
        </div>
      </div>
    </main>
  );
}
