import { Cards, IndexCard } from '@/components/card';
import { Database, Brackets } from 'lucide-react';
import { Clarinet, Chainhook } from '@/components/ui/icon';

export default function ToolsPage() {
  return (
    <main className="my-6 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)]">
        <div className="space-y-10">
          <div className="space-y-1">
            <h3 className="text-3xl">Tools</h3>
            <hr className="border-t border-border mt-8" />
          </div>
          <Cards>
            <IndexCard
              href="/tools/clarinet"
              title="Clarinet"
              icon={<Clarinet />}
              description="A comprehensive development environment for building and testing Clarity smart contracts."
            />
            <IndexCard
              href="/tools/chainhook"
              title="Chainhook"
              icon={<Chainhook />}
              description="Create custom event streams and triggers for real-time blockchain data processing."
            />
            <IndexCard
              href="/tools/contract-monitoring"
              title="Contract Monitoring"
              icon={<Brackets />}
              description="Monitor and track smart contract activity and performance metrics."
            />
            <IndexCard
              href="/tools/bitcoin-indexer"
              title="Bitcoin Indexer"
              icon={<Database />}
              tag="Bitcoin L1"
              description="Index and query Bitcoin blockchain data with high-performance indexing."
            />
          </Cards>
        </div>
      </div>
    </main>
  );
}
