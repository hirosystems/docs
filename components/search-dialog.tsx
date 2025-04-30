"use client";

import * as React from "react";
import { useDocsSearch } from "fumadocs-core/search/client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Search,
  File, // Keep icons used in UI
  Terminal,
  Code,
  Webhook,
  Layers,
  Package,
  Copy,
  Eye,
  ExternalLink,
} from "lucide-react";
import { useSearch } from "@/lib/hooks/use-search";
import { useRouter } from "next/navigation";

// List of common English stop words to ignore in search queries
const stopWords = new Set([
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "aren't",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can",
  "can't",
  "cannot",
  "could",
  "couldn't",
  "did",
  "didn't",
  "do",
  "does",
  "doesn't",
  "doing",
  "don't",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "hadn't",
  "has",
  "hasn't",
  "have",
  "haven't",
  "having",
  "he",
  "he'd",
  "he'll",
  "he's",
  "her",
  "here",
  "here's",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "how's",
  "i",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "if",
  "in",
  "into",
  "is",
  "isn't",
  "it",
  "it's",
  "its",
  "itself",
  "let's",
  "me",
  "more",
  "most",
  "mustn't",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "shan't",
  "she",
  "she'd",
  "she'll",
  "she's",
  "should",
  "shouldn't",
  "so",
  "some",
  "such",
  "than",
  "that",
  "that's",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "there's",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "wasn't",
  "we",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "were",
  "weren't",
  "what",
  "what's",
  "when",
  "when's",
  "where",
  "where's",
  "which",
  "while",
  "who",
  "who's",
  "whom",
  "why",
  "why's",
  "with",
  "won't",
  "would",
  "wouldn't",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "your",
  "yours",
  "yourself",
  "yourselves",
]);

// Helper function to process the query
function preprocessQuery(query: string): string {
  if (!query) return "";
  return (
    query
      .toLowerCase()
      // Split into words (handles basic punctuation removal)
      .split(/[\s\-,.()!?:]+/)
      // Filter out stop words and very short words (adjust min length if needed)
      .filter((word) => word.length > 2 && !stopWords.has(word))
      .join(" ")
  ); // Join remaining keywords with spaces
}

// Keep DocIndexEntry if needed for type hints, but data comes from hook
interface DocIndexEntry {
  id: string;
  title: string;
  // description?: string; // Fields depend on what useDocsSearch returns
  // content?: string;
  url: string;
  // snippet?: string; // Fumadocs might provide a snippet
}

// Keep predefined queries
const predefinedDocQueries = [
  { id: "q1", text: "how to set up devnet using clarinet" },
  { id: "q2", text: "how to create a chainhook on the hiro platform" },
  { id: "q3", text: "how can i connect my wallet to a web app" },
  { id: "q4", text: "how can i query a list of the latest transactions" },
];

// Keep your other static data if needed
const suggestions = [
  { id: "calendar", title: "Calendar", icon: File },
  { id: "emoji", title: "Search Emoji", icon: File },
  { id: "calculator", title: "Calculator", icon: File, disabled: true },
];

const settings = [
  { id: "profile", title: "Profile", icon: File, shortcut: "⌘P" },
  { id: "billing", title: "Billing", icon: File, shortcut: "⌘B" },
  { id: "settings", title: "Settings", icon: File, shortcut: "⌘S" },
];

// Helper to extract a plain text snippet from markdown
function extractSnippet(text: string | undefined, maxLength = 80): string {
  if (!text) return "";
  // Basic snippet extraction
  const plainText = text.replace(/\s+/g, " ").trim();
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
}

// NAVIGATE Section Items
const navigateItems = [
  {
    id: "clarinet",
    title: "Clarinet",
    icon: Terminal,
    href: "/stacks/clarinet",
  }, // Example href
  {
    id: "stacks.js",
    title: "Stacks.js",
    icon: Code,
    href: "/stacks/stacks.js",
  },
  {
    id: "chainhook",
    title: "Chainhook",
    icon: Webhook,
    href: "/stacks/chainhook",
  },
  {
    id: "apis",
    title: "APIs",
    icon: Layers,
    href: "/stacks/api",
  },
  { id: "sdks", title: "SDKs", icon: Package, href: "/stacks/reference" },
];

// AI Section Items
const aiItems = [
  // Add functionality later for these
  { id: "copy-md", title: "Copy this page as markdown", icon: Copy },
  { id: "view-md", title: "View as markdown", icon: Eye },
  { id: "open-chatgpt", title: "Open in ChatGPT", icon: ExternalLink },
];

// Define an interface for the search result structure
interface CustomSearchResult {
  id: string;
  url: string;
  type?: "page" | "heading" | "text";
  content?: string;
  metadata?: Record<string, any>;
}

export default function SearchDialog() {
  const { open, setOpen } = useSearch();
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState("");
  const [isSearchingDocs, setIsSearchingDocs] = React.useState(false);

  // Remove Orama state
  // const [oramaDB, setOramaDB] = React.useState<Orama<any> | null>(null);
  // const [isLoadingDocs, setIsLoadingDocs] = React.useState(true);
  // const [fetchError, setFetchError] = React.useState<string | null>(null);

  const rootInputRef = React.useRef<HTMLInputElement>(null);
  const docsInputRef = React.useRef<HTMLInputElement>(null);

  // Destructure using 'search' for the results array
  const {
    search, // This variable holds the results array
    setSearch,
    query: currentQuery,
  } = useDocsSearch({
    type: "static",
  });

  console.log({ search, currentQuery });

  // State to track if we are "waiting" for results after setting search
  // Since the hook doesn't provide explicit loading state
  const [isWaitingForResults, setIsWaitingForResults] = React.useState(false);

  // Update search query on input change (debounced)
  React.useEffect(() => {
    const processedQuery = preprocessQuery(inputValue);
    const timerId = setTimeout(() => {
      if (isSearchingDocs) {
        if (inputValue.trim()) {
          setSearch(processedQuery);
          setIsWaitingForResults(true);
        } else {
          setSearch("");
          setIsWaitingForResults(false);
        }
      }
    }, 150);
    return () => clearTimeout(timerId);
  }, [inputValue, isSearchingDocs, setSearch]);

  // Effect to turn off loading state when results change
  React.useEffect(() => {
    if (isWaitingForResults) {
      setIsWaitingForResults(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]); // Depend on the 'search' variable (the results array)

  // Keep useEffect for focus management
  React.useEffect(() => {
    if (isSearchingDocs) {
      setInputValue("");
      setTimeout(() => docsInputRef.current?.focus(), 0);
    } else {
      setInputValue("");
      setTimeout(() => rootInputRef.current?.focus(), 0);
    }
  }, [isSearchingDocs]);

  // --- Handlers --- Keep or adjust as needed
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setIsSearchingDocs(false);
      setInputValue("");
      setSearch(""); // Clear search query on close
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
    console.log("AI Action:", actionId);
    handleOpenChange(false);
  };
  const handlePredefinedQueryClick = (queryText: string) => {
    setInputValue(queryText);
    // Set search immediately on click
    // No need to wait for debounce useEffect here
    const processed = preprocessQuery(queryText);
    setSearch(processed);
    setIsWaitingForResults(true); // Assume loading
    docsInputRef.current?.focus();
  };
  // --- End Handlers ---

  // Determine what content to show in the CommandList
  const renderListContent = () => {
    if (isSearchingDocs) {
      // Use the inferred loading state
      if (isWaitingForResults && inputValue.trim()) {
        return <CommandEmpty>Loading results...</CommandEmpty>;
      }

      // If input is empty, show predefined questions
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

      // Check for specific message if only stop words were typed
      const processedQuery = preprocessQuery(inputValue);
      if (!processedQuery && inputValue.trim()) {
        return (
          <CommandEmpty>Please enter more specific search terms.</CommandEmpty>
        );
      }

      // Use 'search' variable for checks and mapping
      // Check if 'search' is an array before accessing length or mapping
      const resultsArray = Array.isArray(search) ? search : [];

      if (
        resultsArray.length === 0 &&
        !isWaitingForResults &&
        inputValue.trim()
      ) {
        return <CommandEmpty>No results found.</CommandEmpty>;
      }

      // Map over the 'search' variable (results array)
      if (resultsArray.length > 0) {
        return (
          <CommandGroup heading="Documentation Results">
            {resultsArray.map((hit: CustomSearchResult) => {
              // Map over resultsArray
              const title = (hit.metadata?.title as string) ?? "Untitled";
              const url = hit.url;
              const snippet = hit.content;

              if (!url) return null;

              return (
                <CommandItem
                  key={hit.id}
                  onSelect={() => goToDoc(url)}
                  value={`doc-${hit.id}`}
                  className="h-auto py-2 flex flex-col items-start"
                >
                  <div className="font-medium text-sm mb-1">{title}</div>
                  {snippet && (
                    <div
                      className="text-xs text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: snippet }}
                    />
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        );
      }

      // ... other fallback messages ...
      if (inputValue.trim() && !isWaitingForResults)
        return <CommandEmpty>No results found.</CommandEmpty>;
      if (inputValue.trim() && isWaitingForResults)
        return <CommandEmpty>Loading results...</CommandEmpty>;
    }

    // ROOT COMMAND VIEW (Keep as before or update as needed)
    return (
      <>
        {/* DOCS Section */}
        <CommandGroup
          heading="DOCS"
          className="text-xs text-muted-foreground font-medium"
        >
          <CommandItem
            value="search-docs"
            onSelect={() => handleSelect(() => setIsSearchingDocs(true))}
          >
            <span>Search the docs</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* AI Section */}
        <CommandGroup
          heading="AI"
          className="text-xs text-muted-foreground font-medium"
        >
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

        {/* NAVIGATE Section */}
        <CommandGroup
          heading="NAVIGATE"
          className="text-xs text-muted-foreground font-medium"
        >
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
        placeholder={
          isSearchingDocs ? "Search docs..." : "Search for commands..."
        }
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
