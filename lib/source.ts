import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { attachFile, createOpenAPI } from 'fumadocs-openapi/server';
import type { ThemeRegistrationResolved } from 'shiki';
import { icons as lucideIcons } from 'lucide-react';
import {
  API,
  Bitcoin,
  Chainhook,
  Clarinet,
  Clarity,
  create,
  Hiro,
  Js,
  StacksIcon,
} from '@/components/ui/icon';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { extractTagsAndLabels } from './utils/frontmatter-parser';
import type { FilterablePage } from './utils/tag-filtering';

const customIcons = {
  API,
  Bitcoin,
  Chainhook,
  Clarinet,
  Clarity,
  Hiro,
  Js,
  StacksIcon,
};

const icons = { ...lucideIcons, ...customIcons } as any;

const NEW_BADGE_DURATION = 10 * 24 * 60 * 60 * 1000;

// FIXME: feature flag to enable/disable git-based "new" badge detection
const ENABLE_GIT_NEW_DETECTION = false; // Set to true when ready to use

const gitMetadataCache = new Map<string, { date: Date | null; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

// Global storage for collecting filterable pages during build
const filterablePages: FilterablePage[] = [];

function canUseGit(): boolean {
  try {
    return existsSync(join(process.cwd(), '.git')) && process.env.NODE_ENV !== 'production'; // Avoid git commands in production runtime
  } catch {
    return false;
  }
}

function isValidFilePath(path: string): boolean {
  if (!path) return false;

  if (path.startsWith('/')) return false;

  if (!path.includes('.') && path.includes('/')) return false;

  return path.length > 0 && !path.startsWith('http');
}

function isFileNewInBranch(filePath: string): boolean {
  if (!canUseGit() || !isValidFilePath(filePath)) return false;

  try {
    const currentBranch = execSync('git branch --show-current', {
      encoding: 'utf8',
      cwd: process.cwd(),
      timeout: 5000,
    }).trim();

    if (!currentBranch || currentBranch === 'main') return false;

    const gitFilePath = filePath.startsWith('content/docs/')
      ? filePath
      : `content/docs/${filePath}`;

    const diffResult = execSync(
      `git diff --name-status main...${currentBranch} -- "${gitFilePath}"`,
      { encoding: 'utf8', cwd: process.cwd(), timeout: 5000 },
    ).trim();

    const isNewInBranch = diffResult.startsWith('A') || diffResult.startsWith('M');

    return isNewInBranch;
  } catch (error) {
    return false;
  }
}

function getFileGitDate(filePath: string): Date | null {
  if (!canUseGit() || !isValidFilePath(filePath)) return null;

  const cacheKey = filePath;
  const cached = gitMetadataCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.date;
  }

  let gitDate: Date | null = null;

  try {
    const gitFilePath = filePath.startsWith('content/docs/')
      ? filePath
      : `content/docs/${filePath}`;

    const modDateResult = execSync(`git log -1 --format=%aI -- "${gitFilePath}"`, {
      encoding: 'utf8',
      cwd: process.cwd(),
      timeout: 5000,
    });

    if (modDateResult.trim()) {
      gitDate = new Date(modDateResult.trim());
    }
  } catch (error) {
    if (isValidFilePath(filePath)) {
      console.warn(`Failed to get git date for ${filePath}:`, error);
    }
  }

  gitMetadataCache.set(cacheKey, {
    date: gitDate,
    timestamp: Date.now(),
  });

  return gitDate;
}

function isPageNew(filePath: string, frontmatter?: any): boolean {
  if (frontmatter?.publishedAt) {
    try {
      const publishDate = new Date(frontmatter.publishedAt);
      const isNewByDate = Date.now() - publishDate.getTime() < NEW_BADGE_DURATION;
      console.log('Using publishedAt date, result:', isNewByDate);
      return isNewByDate;
    } catch {
      console.log('Invalid publishedAt date, falling through');
    }
  }

  if (frontmatter?.isNew === true) {
    return true;
  }

  if (frontmatter?.isNew === false) {
    return false;
  }

  if (!ENABLE_GIT_NEW_DETECTION) {
    return false;
  }

  const isNewInBranch = isFileNewInBranch(filePath);
  if (!isNewInBranch) {
    return false;
  }

  // only auto-detect "NEW" for specific directories to avoid overwhelming UI
  // const allowedDirs = ["(quickstarts)", "quickstarts"];
  // const isInAllowedDir = allowedDirs.some((dir) => filePath.includes(dir));
  // if (!isInAllowedDir) {
  //   return false;
  // }

  // if it's new in branch, check if it's within the time window
  const gitDate = getFileGitDate(filePath);
  if (gitDate && isValidDate(gitDate)) {
    const isWithinTimeWindow = Date.now() - gitDate.getTime() < NEW_BADGE_DURATION;
    console.log(
      `File modified ${Math.floor((Date.now() - gitDate.getTime()) / (24 * 60 * 60 * 1000))} days ago, within window: ${isWithinTimeWindow}`,
    );
    return isWithinTimeWindow;
  }

  console.log('Could not determine git date');
  return false;
}

function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Extract section identifier from URL path
 * @param url - The page URL
 * @returns Section identifier
 */
function extractSectionFromUrl(url: string): string {
  // Remove leading slash and split by slash
  const pathParts = url.replace(/^\//, '').split('/');

  // For URLs like "/stacks/clarinet/guides/..." return "clarinet"
  // For URLs like "/tools/clarinet" return "clarinet"
  if (pathParts.length >= 2) {
    return pathParts[1];
  }

  // For single level paths like "/clarinet", return that
  if (pathParts.length === 1 && pathParts[0]) {
    return pathParts[0];
  }

  return 'general';
}

export function icon(iconName: string) {
  if (iconName in icons) {
    return create({ icon: icons[iconName as keyof typeof icons] });
  }
}

function extractOperationsFromContent(content: string): Array<{ path: string; method: string }> {
  const operations: Array<{ path: string; method: string }> = [];

  const apiPageRegex = /<APIPage[^>]*operations=\{(\[[^\]]+\])\}[^>]*\/>/gs;

  let match;
  while ((match = apiPageRegex.exec(content)) !== null) {
    try {
      const operationsStr = match[1];

      const pathMethodRegex =
        /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*method:\s*['"`]([^'"`]+)['"`]\s*\}/g;

      let opMatch;
      while ((opMatch = pathMethodRegex.exec(operationsStr)) !== null) {
        operations.push({
          path: opMatch[1],
          method: opMatch[2].toUpperCase(),
        });
      }
    } catch (error) {
      console.warn('Failed to parse operations from APIPage component:', error);
    }
  }

  return operations;
}

export const hiroThemeDark: ThemeRegistrationResolved = {
  name: 'hiro-dark',
  displayName: 'Hiro Dark',
  type: 'dark',
  fg: '#8c877d', // --ch-1
  bg: '#1e1e2e', // --ch-18
  settings: [
    {
      settings: {
        foreground: '#8c877d', // --ch-1
        background: '#1e1e2e', // --ch-18
      },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#595650', // --ch-3
        fontStyle: 'italic',
      },
    },
    {
      scope: ['string', 'punctuation.definition.string'],
      settings: {
        foreground: '#c2ebc4', // --ch-4
      },
    },
    {
      scope: ['constant.character.escape'],
      settings: {
        foreground: '#f5c2e7', // --ch-5
      },
    },
    {
      scope: [
        'constant.numeric',
        'variable.other.constant',
        'entity.name.constant',
        'constant.language.boolean',
        'constant.language.false',
        'constant.language.true',
      ],
      settings: {
        foreground: '#ff5500', // --ch-6
      },
    },
    {
      scope: [
        'keyword',
        'keyword.operator.word',
        'keyword.operator.new',
        'variable.language.super',
        'support.type.primitive',
        'storage.type',
        'storage.modifier',
        'punctuation.definition.keyword',
      ],
      settings: {
        foreground: '#ff9ecf', // --ch-7
      },
    },
    {
      scope: [
        'keyword.operator',
        'punctuation.accessor',
        'punctuation.definition.generic',
        'punctuation.definition.tag',
        'punctuation.separator.key-value',
      ],
      settings: {
        foreground: '#94e2d5', // --ch-8
      },
    },
    {
      scope: [
        'entity.name.function',
        'meta.function-call.method',
        'support.function',
        'support.function.misc',
        'variable.function',
      ],
      settings: {
        foreground: '#b3d9ff', // --ch-9
      },
    },
    {
      scope: [
        'entity.name.class',
        'entity.other.inherited-class',
        'support.class',
        'meta.function-call.constructor',
        'entity.name.struct',
        'entity.name.type',
        'support.type',
      ],
      settings: {
        foreground: '#ff9ecf', // --ch-10
      },
    },
    {
      scope: ['variable.parameter', 'meta.function.parameters'],
      settings: {
        foreground: '#8c877d', // --ch-11
      },
    },
    {
      scope: ['constant.language', 'support.function.builtin'],
      settings: {
        foreground: '#ff9ecf', // --ch-12
      },
    },
    {
      scope: ['support.type.property-name', 'entity.name.tag', 'entity.other.attribute-name'],
      settings: {
        foreground: '#b3d9ff', // --ch-9
      },
    },
    {
      scope: ['variable', 'variable.other.readwrite'],
      settings: {
        foreground: '#f2cdcd', // --ch-14
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#a6adc8', // --ch-15
      },
    },
    {
      scope: ['invalid'],
      settings: {
        foreground: '#f2cdcd', // --ch-14
      },
    },
    {
      scope: ['invalid.deprecated'],
      settings: {
        foreground: '#585b70', // --ch-24
      },
    },
  ],
  colors: {
    'editor.background': '#1e1e2e', // --ch-18
    'editor.foreground': '#8c877d', // --ch-1
    'editorCursor.foreground': '#b3d9ff', // --ch-9
    'editorIndentGuide.background': '#585b70', // --ch-24
    'editorIndentGuide.activeBackground': '#7f849c', // --ch-26
    'editor.lineHighlightBackground': '#cdd6f412', // --ch-19
    'editor.selectionBackground': '#9399b240', // --ch-22
    'editorBracketMatch.border': '#585b70', // --ch-24
    'editorError.foreground': '#f2cdcd', // --ch-14
    'editorWarning.foreground': '#b3d9ff', // --ch-9
    'editorInfo.foreground': '#b3d9ff', // --ch-9
    'editorHint.foreground': '#a6adc8', // --ch-15
  },
};

export const hiroThemeLight: ThemeRegistrationResolved = {
  name: 'hiro-light',
  displayName: 'Hiro Light',
  type: 'light',
  fg: '#7a756b', // --ch-1
  bg: '#eff1f5', // --ch-18
  settings: [
    {
      settings: {
        foreground: '#7a756b', // --ch-1
        background: '#eff1f5', // --ch-18
      },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#b5aca1', // --ch-3
        fontStyle: 'italic',
      },
    },
    {
      scope: ['string', 'punctuation.definition.string'],
      settings: {
        foreground: '#48944c', // --ch-4
      },
    },
    {
      scope: ['constant.character.escape'],
      settings: {
        foreground: '#ea76cb', // --ch-5
      },
    },
    {
      scope: [
        'constant.numeric',
        'variable.other.constant',
        'entity.name.constant',
        'constant.language.boolean',
        'constant.language.false',
        'constant.language.true',
      ],
      settings: {
        foreground: '#ff5500', // --ch-6
      },
    },
    {
      scope: [
        'keyword',
        'keyword.operator.word',
        'keyword.operator.new',
        'variable.language.super',
        'support.type.primitive',
        'storage.type',
        'storage.modifier',
        'punctuation.definition.keyword',
      ],
      settings: {
        foreground: '#bc812e', // --ch-7
      },
    },
    {
      scope: [
        'keyword.operator',
        'punctuation.accessor',
        'punctuation.definition.generic',
        'punctuation.definition.tag',
        'punctuation.separator.key-value',
      ],
      settings: {
        foreground: '#179299', // --ch-8
      },
    },
    {
      scope: [
        'entity.name.function',
        'meta.function-call.method',
        'support.function',
        'support.function.misc',
        'variable.function',
      ],
      settings: {
        foreground: '#3676b7', // --ch-9
      },
    },
    {
      scope: [
        'entity.name.class',
        'entity.other.inherited-class',
        'support.class',
        'meta.function-call.constructor',
        'entity.name.struct',
        'entity.name.type',
        'support.type',
      ],
      settings: {
        foreground: '#bc812e', // --ch-10
      },
    },
    {
      scope: ['variable.parameter', 'meta.function.parameters'],
      settings: {
        foreground: '#7a756b', // --ch-11
      },
    },
    {
      scope: ['constant.language', 'support.function.builtin'],
      settings: {
        foreground: '#bc812e', // --ch-12
      },
    },
    {
      scope: ['support.type.property-name', 'entity.name.tag', 'entity.other.attribute-name'],
      settings: {
        foreground: '#3676b7', // --ch-9
      },
    },
    {
      scope: ['variable', 'variable.other.readwrite'],
      settings: {
        foreground: '#dd7878', // --ch-14
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#6c6f85', // --ch-15
      },
    },
    {
      scope: ['invalid'],
      settings: {
        foreground: '#dd7878', // --ch-14
      },
    },
    {
      scope: ['invalid.deprecated'],
      settings: {
        foreground: '#acb0be', // --ch-24 equivalent
      },
    },
  ],
  colors: {
    'editor.background': '#eff1f5', // --ch-18
    'editor.foreground': '#7a756b', // --ch-1
    'editorCursor.foreground': '#3676b7', // --ch-9
    'editorIndentGuide.background': '#acb0be', // --ch-24 equivalent
    'editorIndentGuide.activeBackground': '#8c8fa1', // --ch-26
    'editor.lineHighlightBackground': '#4c4f6912', // --ch-19
    'editor.selectionBackground': '#7c7f934d', // --ch-22
    'editorBracketMatch.border': '#acb0be', // --ch-24 equivalent
    'editorError.foreground': '#dd7878', // --ch-14
    'editorWarning.foreground': '#3676b7', // --ch-9
    'editorInfo.foreground': '#3676b7', // --ch-9
    'editorHint.foreground': '#6c6f85', // --ch-15
  },
};

// `loader()` also assign a URL to your pages
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  pageTree: {
    attachFile: (node, file) => {
      let processedNode = attachFile(node, file);

      if (node.type === 'page') {
        const fileData = (file as any)?.data?.data;
        const frontmatter = fileData;
        const filePath = (file as any)?.file?.path;

        const shouldShowNewBadge = filePath ? isPageNew(filePath, frontmatter) : false;

        const dataToAdd: any = {};

        if (shouldShowNewBadge) {
          dataToAdd.isNew = true;
        }

        // Extract and process tags and labels
        // const { tags, labels } = extractTagsAndLabels(frontmatter || {});

        // Add tags and labels to node data
        // if (tags.length > 0) {
        //   dataToAdd.tags = tags;
        // }
        // if (labels.length > 0) {
        //   dataToAdd.labels = labels;
        // }

        // If this page has labels, add it to the filterable pages collection
        // if (labels.length > 0 && node.url) {
        //   // Extract section from URL (e.g., "/stacks/clarinet" -> "clarinet")
        //   const section = extractSectionFromUrl(node.url);

        //   const filterablePage: FilterablePage = {
        //     id: node.url,
        //     title: frontmatter?.title || node.name || "Untitled",
        //     description: frontmatter?.description,
        //     url: node.url,
        //     labels,
        //     section,
        //     type: frontmatter?.type,
        //   };

        //   // Avoid duplicates
        //   const existingIndex = filterablePages.findIndex(
        //     (p) => p.id === filterablePage.id
        //   );
        //   if (existingIndex >= 0) {
        //     filterablePages[existingIndex] = filterablePage;
        //   } else {
        //     filterablePages.push(filterablePage);
        //   }
        // }

        // Add frontmatter fields to node data
        if (frontmatter?.sidebarTitle) {
          dataToAdd.sidebarTitle = frontmatter.sidebarTitle;
        }

        // if (frontmatter?.root) {
        //   dataToAdd.root = frontmatter.root;
        // }

        // if it's an API page, extract OpenAPI operations ourselves
        // if (node.url?.includes("/apis/") && fileData?.content) {
        //   const content = fileData.content;

        //   const operations = extractOperationsFromContent(content);

        //   if (operations.length > 0) {
        //     dataToAdd.openapi = {
        //       operations,
        //     };
        //   }
        // }

        if (Object.keys(dataToAdd).length > 0) {
          processedNode = {
            ...processedNode,
            data: {
              ...(processedNode as any).data,
              ...dataToAdd,
            },
          } as any;
        }
      }

      return processedNode;
    },
  },
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon && icon in icons) return create({ icon: icons[icon as keyof typeof icons] });
  },
});

export const openapi = createOpenAPI({
  // proxyUrl: "https://api.hiro.so",
  shikiOptions: {
    themes: {
      dark: hiroThemeDark,
      light: hiroThemeLight,
    },
  },
});

/**
 * Get all filterable pages collected during build
 * @returns Array of FilterablePage objects
 */
export function getAllFilterablePages(): FilterablePage[] {
  return [...filterablePages];
}

/**
 * Get pages with matching labels for a given tag
 * @param tag - The tag to search for
 * @param section - Optional section to limit search scope
 * @returns Array of matching FilterablePage objects
 */
export function getPagesWithMatchingLabels(tag: string, section?: string): FilterablePage[] {
  return filterablePages.filter((page) => {
    const sectionMatches = !section || page.section === section;
    const tagMatches = page.labels.includes(tag);
    return sectionMatches && tagMatches;
  });
}
