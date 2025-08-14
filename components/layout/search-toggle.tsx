'use client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Search, SearchIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { Kbd } from '../ui/kbd';

export function SearchToggle(props: ComponentProps<'button'>) {
  const { enabled, setOpenSearch } = useSearchContext();
  const t = useTranslations();
  if (!enabled) return;

  return (
    <>
      {/* For mobile, show the search icon */}
      <button
        className="md:hidden h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent transition-colors"
        onClick={() => setOpenSearch(true)}
        aria-label={t.navigation.searchAriaLabel}
        {...props}
      >
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* For desktop, show the search bar */}
      <button
        className="hidden md:flex w-full max-w-[160px] lg:max-w-[200px] h-9 bg-white dark:bg-neutral-950 rounded-md items-center px-2 cursor-pointer group"
        onClick={() => setOpenSearch(true)}
        {...props}
      >
        <div className="flex items-center flex-1 gap-2">
          <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors md:inline hidden">
            {t.navigation.search}
          </span>
        </div>
        <div className="flex items-center gap-1 group">
          <Kbd className="flex items-center justify-center rounded text-md transition-colors">
            ⌘
          </Kbd>
          <Kbd className="flex items-center justify-center rounded text-sm transition-colors">
            K
          </Kbd>
        </div>
      </button>
    </>
  );
}
