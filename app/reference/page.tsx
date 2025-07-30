import { Cards, IndexCard } from '@/components/card';
import { API, Js } from '@/components/ui/icon';

export default function ReferencePage() {
  return (
    <main className="my-6 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)]">
        <div className="space-y-10">
          <div className="space-y-1">
            <h3 className="text-3xl">Libraries &amp; SDKs</h3>
            <hr className="border-t border-border mt-8" />
          </div>
          <Cards>
            <IndexCard
              icon={<Js />}
              href="/reference/stacks.js"
              title="Stacks.js"
              description="JavaScript SDK for building applications on Stacks with transactions, network utilities, and wallet integration."
            />
            <IndexCard
              icon={<Js />}
              href="/tools/clarinet/sdk-introduction"
              title="Clarinet JS SDK"
              description="JavaScript SDK for testing and interacting with Clarity smart contracts in simulated environments."
            />
            <IndexCard
              icon={<Js />}
              href="/tools/clarinet/browser-sdk-reference"
              title="Clarinet JS Browser SDK"
              description="JavaScript SDK for interacting with the simnet in web browsers."
            />
            {/* <IndexCard
              icon={<API />}
              href="/reference/stacks-blockchain-api"
              title="Stacks Blockchain API Client"
              description="Type-safe JavaScript client library for interacting with the Stacks Blockchain API."
            /> */}
          </Cards>
        </div>
      </div>
    </main>
  );
}
