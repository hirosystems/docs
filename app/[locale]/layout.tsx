import type { ReactNode } from 'react';
import { I18nProvider } from "fumadocs-ui/i18n";
import { i18n } from '@/lib/i18n';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  return (
    <I18nProvider locale={locale} locales={i18n.languages}>
      {children}
    </I18nProvider>
  );
}

// Generate static params for the locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'es' },
  ];
}
