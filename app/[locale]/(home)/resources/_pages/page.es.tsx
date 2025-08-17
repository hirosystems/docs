import { Code, Database, Terminal } from 'lucide-react';
import { Cards, IndexCard } from '@/components/card';
import { Clarity } from '@/components/ui/icon';

export default function ResourcesPage() {
  return (
    <main className="my-6 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)]">
        <div className="space-y-10">
          <div className="space-y-1">
            <h3 className="text-3xl">Recursos</h3>
            <hr className="border-t border-border mt-8" />
          </div>
          <Cards>
            <IndexCard
              icon={<Clarity />}
              href="/resources/clarity"
              title="Referencia de Clarity"
              description="Guías completas y referencia de funciones para el lenguaje de contratos inteligentes Clarity." />

            <IndexCard
              icon={<Terminal />}
              href="/resources/guides"
              title="Guías"
              description="Guías para desarrollar en Stacks y Bitcoin." />

            {/* <IndexCard
               icon={<Braces />}
               href="/resources/templates"
               title="Project templates"
               description="Project templates for building on Stacks and Bitcoin."
              /> */}
            <IndexCard
              icon={<Code />}
              href="/resources/snippets"
              title="Fragmentos"
              description="Fragmentos de código para construir en Stacks y Bitcoin." />

            <IndexCard
              icon={<Database />}
              href="/resources/archive"
              title="Archivo Hiro"
              description="Instantáneas de datos para iniciar rápidamente servicios del ecosistema Stacks con datos precargados." />

          </Cards>
        </div>
      </div>
    </main>);

}
