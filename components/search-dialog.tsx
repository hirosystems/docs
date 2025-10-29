'use client';

import { useDocsSearch } from 'fumadocs-core/search/client';
import { Code, Copy, ExternalLink, Eye, File, Layers, Package, Search, Webhook } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useSearch } from '@/hooks/use-search';

const stopWords = new Set([
  'a',
  'about',
  'above',
  'after',
  'again',
  'against',
  'all',
  'am',
  'an',
  'and',
  'any',
  'are',
  "aren't",
  'as',
  'at',
  'be',
  'because',
  'been',
  'before',
  'being',
  'below',
  'between',
  'both',
  'but',
  'by',
  'can',
  "can't",
  'cannot',
  'could',
  "couldn't",
  'did',
  "didn't",
  'do',
  'does',
  "doesn't",
  'doing',
  "don't",
  'down',
  'during',
  'each',
  'few',
  'for',
  'from',
  'further',
  'had',
  "hadn't",
  'has',
  "hasn't",
  'have',
  "haven't",
  'having',
  'he',
  "he'd",
  "he'll",
  "he's",
  'her',
  'here',
  "here's",
  'hers',
  'herself',
  'him',
  'himself',
  'his',
  'how',
  "how's",
  'i',
  "i'd",
  "i'll",
  "i'm",
  "i've",
  'if',
  'in',
  'into',
  'is',
  "isn't",
  'it',
  "it's",
  'its',
  'itself',
  "let's",
  'me',
  'more',
  'most',
  "mustn't",
  'my',
  'myself',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'on',
  'once',
  'only',
  'or',
  'other',
  'ought',
  'our',
  'ours',
  'ourselves',
  'out',
  'over',
  'own',
  'same',
  "shan't",
  'she',
  "she'd",
  "she'll",
  "she's",
  'should',
  "shouldn't",
  'so',
  'some',
  'such',
  'than',
  'that',
  "that's",
  'the',
  'their',
  'theirs',
  'them',
  'themselves',
  'then',
  'there',
  "there's",
  'these',
  'they',
  "they'd",
  "they'll",
  "they're",
  "they've",
  'this',
  'those',
  'through',
  'to',
  'too',
  'under',
  'until',
  'up',
  'very',
  'was',
  "wasn't",
  'we',
  "we'd",
  "we'll",
  "we're",
  "we've",
  'were',
  "weren't",
  'what',
  "what's",
  'when',
  "when's",
  'where',
  "where's",
  'which',
  'while',
  'who',
  "who's",
  'whom',
  'why',
  "why's",
  'with',
  "won't",
  'would',
  "wouldn't",
  'you',
  "you'd",
  "you'll",
  "you're",
  "you've",
  'your',
  'yours',
  'yourself',
  'yourselves',
]);

function preprocessQuery(query: string): string {
  if (!query) return '';
  return query
    .toLowerCase()
    .split(/[\s\-,.()!?:]+/)
    .filter((word) => word.length > 2 && !stopWords.has(word))
    .join(' ');
}

interface DocIndexEntry {
  id: string;
  title: string;
  url: string;
}

const predefinedDocQueries = [
  { id: 'q1', text: 'how to create a chainhook on the hiro platform' },
  { id: 'q2', text: 'how can i query a list of the latest transactions' },
  { id: 'q3', text: 'how do i bootstrap the bitcoin indexer' },
  { id: 'q4', text: 'how do i manage api keys' },
];

const suggestions = [
  { id: 'calendar', title: 'Calendar', icon: File },
  { id: 'emoji', title: 'Search Emoji', icon: File },
  { id: 'calculator', title: 'Calculator', icon: File, disabled: true },
];

const settings = [
  { id: 'profile', title: 'Profile', icon: File, shortcut: '⌘P' },
  { id: 'billing', title: 'Billing', icon: File, shortcut: '⌘B' },
  { id: 'settings', title: 'Settings', icon: File, shortcut: '⌘S' },
];

function extractSnippet(text: string | undefined, maxLength = 80): string {
  if (!text) return '';
  const plainText = text.replace(/\s+/g, ' ').trim();
  return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
}

const navigateItems = [
  {
    id: 'chainhook',
    title: 'Chainhook',
    icon: Webhook,
    href: '/tools/chainhook',
  },
  {
    id: 'bitcoin-indexer',
    title: 'Bitcoin Indexer',
    icon: Layers,
    href: '/tools/bitcoin-indexer',
  },
  {
    id: 'apis',
    title: 'APIs',
    icon: Package,
    href: '/apis/stacks-blockchain-api',
  },
  {
    id: 'guides',
    title: 'Guides',
    icon: Code,
    href: '/resources/guides',
  },
];

const aiItems = [
  { id: 'copy-md', title: 'Copy this page as markdown', icon: Copy },
  { id: 'view-md', title: 'View as markdown', icon: Eye },
  { id: 'open-chatgpt', title: 'Open in ChatGPT', icon: ExternalLink },
];

interface CustomSearchResult {
  id: string;
  url: string;
  type?: 'page' | 'heading' | 'text';
  content?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export default function SearchDialog() {
  const { open, setOpen } = useSearch();
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState('');
  const [isSearchingDocs, setIsSearchingDocs] = React.useState(false);

  const rootInputRef = React.useRef<HTMLInputElement>(null);
  const docsInputRef = React.useRef<HTMLInputElement>(null);

  const {
    search,
    setSearch,
    query: currentQuery,
  } = useDocsSearch({
    type: 'fetch',
    api: '/api/search',
  });

  const [pendingQuery, setPendingQuery] = React.useState('');
  const searchArray = Array.isArray(search) ? search : [];
  const isWaitingForResults = pendingQuery !== '' && searchArray.length === 0;

  React.useEffect(() => {
    const processedQuery = preprocessQuery(inputValue);
    const timerId = setTimeout(() => {
      if (isSearchingDocs) {
        if (inputValue.trim()) {
          console.log('SearchDialog - setting search with:', processedQuery);
          setSearch(processedQuery);
          setPendingQuery(processedQuery);
        } else {
          setSearch('');
          setPendingQuery('');
        }
      }
    }, 150);
    return () => clearTimeout(timerId);
  }, [inputValue, isSearchingDocs, setSearch]);

  // Clear pending query when results arrive
  React.useEffect(() => {
    if (searchArray.length > 0 && pendingQuery) {
      setPendingQuery('');
    }
  }, [searchArray.length, pendingQuery]);

  React.useEffect(() => {
    if (isSearchingDocs) {
      setInputValue('');
      setTimeout(() => docsInputRef.current?.focus(), 0);
    } else {
      setInputValue('');
      setTimeout(() => rootInputRef.current?.focus(), 0);
    }
  }, [isSearchingDocs]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setIsSearchingDocs(false);
      setInputValue('');
      setSearch('');
    }
  };
  const handleSelect = (callback: () => void) => {
    callback();
  };
  const goToDoc = (slug: string) => {
    router.push(slug);
    handleOpenChange(false);
  };
  const goToHref = (href: string) => {
    router.push(href);
    handleOpenChange(false);
  };
  const handleAiAction = (actionId: string) => {
    console.log('AI Action:', actionId);
    handleOpenChange(false);
  };
  const handlePredefinedQueryClick = (queryText: string) => {
    setInputValue(queryText);
    const processed = preprocessQuery(queryText);
    setSearch(processed);
    setPendingQuery(processed);
    docsInputRef.current?.focus();
  };

  const renderListContent = () => {
    if (isSearchingDocs) {
      if (isWaitingForResults && inputValue.trim()) {
        return <CommandEmpty>Loading results...</CommandEmpty>;
      }

      if (!inputValue.trim()) {
        return (
          <CommandGroup
            heading="Common Questions"
            className="text-xs text-muted-foreground font-medium"
          >
            {predefinedDocQueries.map((query) => (
              <CommandItem
                key={query.id}
                value={`predefined-${query.id}`}
                onSelect={() => handlePredefinedQueryClick(query.text)}
                className="cursor-pointer"
              >
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{query.text}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        );
      }

      const processedQuery = preprocessQuery(inputValue);
      if (!processedQuery && inputValue.trim()) {
        return <CommandEmpty>Please enter more specific search terms.</CommandEmpty>;
      }

      const resultsArray = searchArray;

      if (resultsArray.length === 0 && !isWaitingForResults && inputValue.trim()) {
        return <CommandEmpty>No results found.</CommandEmpty>;
      }

      if (resultsArray.length > 0) {
        return (
          <CommandGroup heading="Documentation Results">
            {resultsArray.map((hit: CustomSearchResult) => {
              const title = (hit.metadata?.title as string) ?? 'Untitled';
              const url = hit.url;
              const snippet = hit.content;

              if (!url) return null;

              return (
                <CommandItem
                  key={hit.id}
                  onSelect={() => goToDoc(url)}
                  value={`doc-${hit.id}`}
                  className="h-auto py-3 px-3"
                >
                  {snippet ? (
                    <div dangerouslySetInnerHTML={{ __html: snippet }} />
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-sm">{title}</div>
                      {hit.description && (
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {hit.description}
                        </div>
                      )}
                    </div>
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        );
      }

      if (inputValue.trim() && !isWaitingForResults)
        return <CommandEmpty>No results found.</CommandEmpty>;
      if (inputValue.trim() && isWaitingForResults)
        return <CommandEmpty>Loading results...</CommandEmpty>;
    }

    return (
      <>
        <CommandGroup heading="DOCS" className="text-xs text-muted-foreground font-medium">
          <CommandItem
            value="search-docs"
            onSelect={() => handleSelect(() => setIsSearchingDocs(true))}
          >
            <span>Search the docs</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="AI" className="text-xs text-muted-foreground font-medium">
          {aiItems.map((item) => (
            <CommandItem
              key={item.id}
              value={`ai-${item.id}`}
              onSelect={() => handleAiAction(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="NAVIGATE" className="text-xs text-muted-foreground font-medium">
          {navigateItems.map((item) => (
            <CommandItem
              key={item.id}
              value={`navigate-${item.id}`}
              onSelect={() => goToHref(item.href)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </>
    );
  };

  return (
    <CommandDialog open={open} onOpenChange={handleOpenChange}>
      <CommandInput
        ref={isSearchingDocs ? docsInputRef : rootInputRef}
        placeholder={isSearchingDocs ? 'Search docs...' : 'Search for commands...'}
        value={inputValue}
        onValueChange={handleInputChange}
        className="bg-transparent rounded-none focus:border-primary focus:ring-0"
      />
      <CommandList className="min-h-[300px] max-h-[400px] bg-background border-t">
        {renderListContent()}
      </CommandList>
    </CommandDialog>
  );
}
