'use client';

import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { i18n, languageAbbreviations, languageFlags, languageNames } from '@/lib/i18n';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState(i18n.defaultLanguage);

  useEffect(() => {
    // Get current language from cookie or detect from path
    const getCookieLocale = () => {
      const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
      return match ? match[1] : null;
    };

    const cookieLocale = getCookieLocale();

    // Check if path has locale prefix
    const segments = pathname.split('/').filter(Boolean);
    const pathLocale = i18n.languages.includes(segments[0]) ? segments[0] : null;

    // Use cookie locale first, then path locale, then default
    const detectedLocale = cookieLocale || pathLocale || i18n.defaultLanguage;
    setCurrentLang(detectedLocale);
  }, [pathname]);

  const handleLanguageChange = (newLang: string) => {
    // Set cookie for the new language
    document.cookie = `locale=${newLang}; max-age=${60 * 60 * 24 * 365}; path=/; samesite=lax`;

    // Parse current path to get the clean path without locale
    const segments = pathname.split('/').filter(Boolean);
    
    // Check if first segment is a locale
    let cleanPath: string;
    if (i18n.languages.includes(segments[0])) {
      // Remove the locale prefix
      cleanPath = '/' + segments.slice(1).join('/');
    } else {
      // Path doesn't have locale prefix (shouldn't happen with our setup)
      cleanPath = pathname;
    }

    // Build new path with new locale
    const newPath = `/${newLang}${cleanPath}`;

    // Navigate to the new path
    router.push(newPath);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="font-thin text-sm gap-1.5 h-9 px-3 border-border text-muted-foreground hover:text-primary"
        >
          <span className="text-base">{languageFlags[currentLang]}</span>
          <span className="font-fono">{languageAbbreviations[currentLang]}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {Object.entries(languageNames).map(([code, name]) => {
          // Only show languages that are configured
          if (!i18n.languages.includes(code)) return null;

          return (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code)}
              className="gap-3 font-sans text-sm"
            >
              <span className="text-base">{languageFlags[code]}</span>
              <span className="flex-1 font-fono">{name}</span>
              {code === currentLang && <span className="ml-auto text-xs">✓</span>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
