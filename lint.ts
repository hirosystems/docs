import fs from 'node:fs';
import path from 'node:path';
import { getTableOfContents } from 'fumadocs-core/server';
import { getSlugs, parseFilePath } from 'fumadocs-core/source';
import { printErrors, readFiles, scanURLs, validateFiles } from 'next-validate-link';
import { i18n } from './lib/i18n';

async function checkLinks() {
  const docsFiles = await readFiles('content/docs/**/*.{md,mdx}');

  const defaultLocale = i18n.defaultLanguage ?? 'en';
  const supportedLocales = new Set(i18n.languages ?? [defaultLocale]);

  const docRoutes = docsFiles
    .map((file) => {
      const info = parseFilePath(path.relative('content/docs', file.path));
      const slugs = getSlugs(info);
      const [possibleLocale, ...rest] = slugs;
      const hasLocale = possibleLocale && supportedLocales.has(possibleLocale);
      const locale = hasLocale ? possibleLocale : defaultLocale;
      const slugSegments = hasLocale ? rest : slugs;

      if (slugSegments.length === 0) {
        console.warn(`Skipping doc with empty slug: ${file.path}`);
        return null;
      }

      const urlSegments = slugSegments.filter(Boolean);

      // Attach URL without locale so baseline routes (e.g. /tools/foo) get validated.
      file.url = `/${urlSegments.join('/')}`;

      return {
        locale,
        slugSegments,
        hashes: getTableOfContents(file.content).map((item) => item.url.slice(1)),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const scanned = await scanURLs({
    populate: {
      '[locale]/[...slug]': docRoutes.map((route) => ({
        value: {
          locale: route.locale,
          slug: route.slugSegments,
        },
        hashes: route.hashes,
      })),
    },
  });

  // Register locale-less aliases (default locale only) so `/tools/...` links validate without locale prefixes.
  const localeLessEntries: Array<{ basePath: string; localizedPath: string }> = docRoutes
    .filter((route) => route.locale === defaultLocale)
    .map((route) => {
      const slugPath = route.slugSegments.join('/');
      return {
        basePath: `/${slugPath}`,
        localizedPath: `/${route.locale}/${slugPath}`,
      };
    });

  for (const entry of localeLessEntries) {
    const meta = scanned.urls.get(entry.localizedPath);
    if (meta && !scanned.urls.has(entry.basePath)) {
      scanned.urls.set(entry.basePath, meta);
    }
  }

  // Disable broad fallback patterns so invalid doc links don't slip through.
  scanned.fallbackUrls = [];

  printErrors(
    await validateFiles([...docsFiles], {
      scanned,
      whitelist: (url) => {
        // Existing whitelist conditions
        if (url.startsWith('#!') || url === 'tooltip') {
          return true;
        }

        // Check if it's an llms.txt route
        if (url.endsWith('/llms.txt')) {
          const publicPath = path.join(process.cwd(), 'public', url);

          if (fs.existsSync(publicPath)) {
            return true;
          }
          console.warn(`Warning: llms.txt file not found at ${publicPath}`);
          return false;
        }

        return false;
      },
    }),
    true,
  );
}

void checkLinks();
