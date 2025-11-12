import { Brackets, Database } from 'lucide-react';
import { Cards, IndexCard } from '@/components/card';
import { Chainhook } from '@/components/ui/icon';

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
              href="/tools/chainhooks"
              title="Chainhooks"
              icon={<Chainhook />}
              badge="beta"
              tag="Stacks"
              description="Create custom event streams and triggers for real-time blockchain data processing."
            />
            <IndexCard
              href="/tools/contract-monitoring"
              title="Contract Monitoring"
              icon={<Brackets />}
              tag="Stacks"
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
