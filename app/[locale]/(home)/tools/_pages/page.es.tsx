import { Brackets, Database } from 'lucide-react';
import { Cards, IndexCard } from '@/components/card';
import { Chainhook } from '@/components/ui/icon';

export default function ToolsPage() {
  return (
    <main className="my-6 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)]">
        <div className="space-y-10">
          <div className="space-y-1">
            <h3 className="text-3xl">Herramientas</h3>
            <hr className="border-t border-border mt-8" />
          </div>
          <Cards>
            <IndexCard
              href="/tools/chainhook"
              title="Chainhook"
              icon={<Chainhook />}
              badge="beta"
              tag="Stacks"
              description="Crea flujos de eventos personalizados y desencadenantes para el procesamiento de datos de blockchain en tiempo real."
            />

            <IndexCard
              href="/tools/contract-monitoring"
              title="Monitoreo de Contratos"
              icon={<Brackets />}
              tag="Stacks"
              description="Monitorea y rastrea la actividad de contratos inteligentes y las métricas de rendimiento."
            />

            <IndexCard
              href="/tools/bitcoin-indexer"
              title="Indexador de Bitcoin"
              icon={<Database />}
              tag="Bitcoin L1"
              description="Indexa y consulta datos de la cadena de bloques de Bitcoin con indexación de alto rendimiento."
            />
          </Cards>
        </div>
      </div>
    </main>
  );
}
