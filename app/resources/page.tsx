import { Cards, IndexCard } from "@/components/card";
import { Clarity } from "@/components/ui/icon";
import { Database } from "lucide-react";

export default function ResourcesPage() {
  return (
    <main className="my-6 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)]">
        <div className="space-y-10">
          <div className="space-y-1">
            <h3 className="text-3xl">Resources</h3>
            <hr className="border-t border-border mt-8" />
          </div>
          <Cards>
            <IndexCard
              icon={<Clarity />}
              href="/resources/clarity"
              title="Clarity lang"
              description="Comprehensive guides and function reference for the Clarity smart contract language."
            />
            <IndexCard
              icon={<Database />}
              href="/resources/archive"
              title="Hiro Archive"
              description="Data snapshots for quickly bootstrapping Stacks ecosystem services with pre-loaded data."
            />
          </Cards>
        </div>
      </div>
    </main>
  );
}
