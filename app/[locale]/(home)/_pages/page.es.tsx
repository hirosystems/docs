import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Braces, Database, Play } from 'lucide-react';
import { Card, Cards, SmallCard } from '@/components/card';
import {
  API,
  Chainhook,
  Clarinet,
  Clarity,
  Hiro,
  Js,
  Ordinals,
  Runes,
  StacksIcon,
} from '@/components/ui/icon';
import heroImage from '@/public/stacks-hero.svg';

export default function HomePage() {
  return (
    <main className="my-2 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)] py-6">
        <div className="space-y-10">
          <div className="space-y-1">
            <div className="flex space-x-6 items-end">
              <ImageZoom
                alt="pancarta"
                src={heroImage}
                className="mt-0 mb-6 first-line:rounded-xl bg-background"
                priority
              />

              <div className="flex flex-col [&_p]:mb-6 space-y-3">
                <h3 className="text-3xl">Bienvenido a Hiro Docs</h3>
                <p>Encuentra todas las guías y recursos que necesitas para construir en Stacks.</p>
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
              title="Referencia de la API de Stacks"
              description="Explora los puntos finales de la API para interactuar con la cadena de bloques Stacks."
            />

            <Card
              className="group space-y-1"
              icon={
                <Play className="transition-colors duration-500 ease-in-out group-hover:text-primary" />
              }
              href="/resources/guides"
              title="Guías"
              description="Explora guías para desarrollar en Stacks."
            />
          </Cards>
          <div className="flex flex-col">
            <h4 id="explore-by-category" className="scroll-m-20">
              <a
                href="#explore-by-category"
                className="not-prose group text-sm text-muted-foreground uppercase"
              >
                Herramientas
              </a>
            </h4>
            <hr className="border-t border-border my-2" />
            <Cards>
              <SmallCard
                icon={<Clarinet />}
                href="/tools/clarinet"
                title="Clarinet"
                description="Un entorno de desarrollo integral para construir y probar contratos inteligentes de Clarity."
              />

              <SmallCard
                icon={<Chainhook />}
                href="/tools/chainhook"
                title="Chainhook"
                description="Crea flujos de eventos personalizados y desencadenantes para el procesamiento de datos de blockchain en tiempo real."
              />

              <SmallCard
                icon={<Braces />}
                href="/tools/contract-monitoring"
                title="Monitoreo de Contratos"
                description="Monitorear y rastrear la actividad de contratos inteligentes y las métricas de rendimiento."
              />

              <SmallCard
                icon={<Database />}
                href="/tools/bitcoin-indexer"
                title="Indexador de Bitcoin"
                description="Indexa y consulta datos de la cadena de bloques de Bitcoin con indexación de alto rendimiento."
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
                title="API de la cadena de bloques Stacks"
                description="API REST completa para interactuar con la cadena de bloques Stacks y los datos de la red."
              />

              <SmallCard
                icon={<API />}
                href="/apis/token-metadata-api"
                title="API de Metadatos de Tokens"
                description="Metadatos rápidos y confiables para tokens fungibles y no fungibles en Stacks."
              />

              <SmallCard
                icon={<Hiro />}
                href="/apis/platform-api"
                title="API de la plataforma"
                description="Administre programáticamente devnets y chainhooks a través de la interfaz REST."
              />

              <SmallCard
                icon={<Ordinals />}
                href="/apis/ordinals-api"
                title="API de Ordinales"
                description="Datos completos de ordinales de Bitcoin y tokens BRC-20 con optimización de caché."
              />

              <SmallCard
                icon={<Runes />}
                href="/apis/runes-api"
                title="API de Runas"
                description="Datos rápidos y confiables para Bitcoin Runes a través de una interfaz REST fácil de usar."
              />

              <SmallCard
                icon={<API />}
                href="/apis/signer-metrics-api"
                title="API de Métricas de Firmantes"
                description="Monitorear y analizar el comportamiento y rendimiento de los firmantes en la red Stacks."
              />
            </Cards>
          </div>
          <div className="flex flex-col">
            <h4 id="explore-by-category" className="text-muted-foreground scroll-m-20">
              <a href="#explore-by-category" className="not-prose group text-sm uppercase">
                Bibliotecas y SDKs
              </a>
            </h4>
            <hr className="border-t border-border my-2" />
            <Cards>
              <SmallCard
                icon={<Js />}
                href="/reference/stacks.js"
                title="Stacks.js"
                description="SDK de JavaScript para construir aplicaciones en Stacks con transacciones, utilidades de red e integración de billetera."
              />

              <SmallCard
                icon={<Js />}
                href="/tools/clarinet/sdk-introduction"
                title="SDK de Clarinet JS"
                description="SDK de JavaScript para probar e interactuar con contratos inteligentes de Clarity en entornos simulados."
              />

              {/* <SmallCard
                 icon={<StacksIcon />}
                 href="/reference/stacks-blockchain-api"
                 title="Stacks Blockchain API Client"
                 description="Type-safe JavaScript client library for interacting with the Stacks Blockchain API."
                /> */}
            </Cards>
          </div>
          <div className="flex flex-col">
            <h4 id="explore-by-category" className="text-muted-foreground scroll-m-20">
              <a href="#explore-by-category" className="not-prose group text-sm uppercase">
                Recursos
              </a>
            </h4>
            <hr className="border-t border-border my-2" />
            <Cards>
              <SmallCard
                icon={<Clarity />}
                href="/resources/clarity"
                title="Referencia de Claridad"
                description="Guías completas y referencia de funciones para el lenguaje de contratos inteligentes Clarity."
              />

              <SmallCard
                icon={<Database />}
                href="/resources/archive"
                title="Archivo Hiro"
                description="Instantáneas de datos para iniciar rápidamente servicios del ecosistema Stacks con datos precargados."
              />
            </Cards>
          </div>
        </div>
      </div>
    </main>
  );
}
