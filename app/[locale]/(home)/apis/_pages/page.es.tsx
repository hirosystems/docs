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
              title="API de la cadena de bloques Stacks"
              description="API REST completa para interactuar con la cadena de bloques de Stacks y los datos de la red."
            />

            <IndexCard
              icon={<StacksIcon />}
              href="/apis/stacks-node-rpc-api"
              title="API RPC del Nodo Stacks"
              description="Métodos de nodo de blockchain sin procesar: enviar transacciones, llamar contratos de solo lectura, consultar mempool/estado."
            />

            <IndexCard
              icon={<API />}
              href="/apis/token-metadata-api"
              title="API de Metadatos de Tokens"
              description="Metadatos rápidos y confiables para tokens fungibles y no fungibles en Stacks."
            />

            <IndexCard
              icon={<Hiro />}
              href="/apis/platform-api"
              title="API de la plataforma"
              description="Gestione programáticamente devnets y chainhooks a través de la interfaz REST."
            />

            <IndexCard
              icon={<Ordinals />}
              href="/apis/ordinals-api"
              title="API de Ordinals"
              tag="Bitcoin L1"
              description="Datos completos de ordinales de Bitcoin y tokens BRC-20 con optimización de caché."
            />

            <IndexCard
              icon={<Runes />}
              href="/apis/runes-api"
              title="API de Runas"
              tag="Bitcoin L1"
              description="Datos rápidos y confiables para Bitcoin Runes a través de una interfaz REST fácil de usar."
            />

            <IndexCard
              icon={<API />}
              href="/apis/signer-metrics-api"
              title="API de Métricas del Firmante"
              description="Monitorea y analiza el comportamiento y rendimiento de los firmantes en la red Stacks."
            />
          </Cards>
        </div>
      </div>
    </main>
  );
}
