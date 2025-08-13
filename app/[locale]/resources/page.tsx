import { Code, Database, Terminal } from 'lucide-react';
import { Cards, IndexCard } from '@/components/card';
import { Clarity } from '@/components/ui/icon';

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
              title="Clarity Reference"
              description="Comprehensive guides and function reference for the Clarity smart contract language."
            />
            <IndexCard
              icon={<Terminal />}
              href="/resources/guides"
              title="Guides"
              description="Guides for building on Stacks and Bitcoin."
            />
            {/* <IndexCard
              icon={<Braces />}
              href="/resources/templates"
              title="Project templates"
              description="Project templates for building on Stacks and Bitcoin."
            /> */}
            <IndexCard
              icon={<Code />}
              href="/resources/snippets"
              title="Snippets"
              description="Code snippets for building on Stacks and Bitcoin."
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
