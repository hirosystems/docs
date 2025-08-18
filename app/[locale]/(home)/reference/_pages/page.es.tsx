import { Cards, IndexCard } from '@/components/card';
import { Js } from '@/components/ui/icon';

export default function ReferencePage() {
  return (
    <main className="my-6 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)]">
        <div className="space-y-10">
          <div className="space-y-1">
            <h3 className="text-3xl">Bibliotecas y SDKs</h3>
            <hr className="border-t border-border mt-8" />
          </div>
          <Cards>
            <IndexCard
              icon={<Js />}
              href="/reference/stacks.js"
              title="Stacks.js"
              description="SDK de JavaScript para construir aplicaciones en Stacks con transacciones, utilidades de red e integración de billetera."
            />

            <IndexCard
              icon={<Js />}
              href="/tools/clarinet/sdk-introduction"
              title="SDK de Clarinet JS"
              description="SDK de JavaScript para probar e interactuar con contratos inteligentes de Clarity en entornos simulados."
            />

            <IndexCard
              icon={<Js />}
              href="/tools/clarinet/browser-sdk-reference"
              title="Clarinet JS SDK para navegador"
              description="SDK de JavaScript para interactuar con la simnet en navegadores web."
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
