import Link from 'next/link';

export default function ReferencePage() {
  return (
    <main className="my-6 space-y-10">
      <div className="px-4 md:px-[var(--nav-offset)]">
        <div className="space-y-10">
          <div className="space-y-1">
            <h3 className="text-3xl">Bibliotecas y SDKs</h3>
            <hr className="border-t border-border mt-8" />
          </div>
          <p className="text-sm text-muted-foreground">
            ¿Buscas la documentación de SDKs? Visita{' '}
            <Link
              href="https://docs.stacks.co/reference"
              className="text-primary underline underline-offset-4"
            >
              docs.stacks.co/reference
            </Link>{' '}
            para acceder a los recursos más recientes.
          </p>
        </div>
      </div>
    </main>
  );
}
