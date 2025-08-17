'use client';

import { Check, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClaudeIcon, OpenAIIcon } from '@/components/ui/icon';
import { useCurrentPageMarkdown, useLLMsTxt } from '@/hooks/use-llms-txt';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { processMarkdownLinks } from '@/utils/process-markdown-links';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface LLMShareProps {
  content: string;
}

const getLLMProviders = (t: any) => [
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    icon: OpenAIIcon,
    description: t.navigation.llmShare.askQuestions,
  },
  {
    name: 'Claude',
    url: 'https://claude.ai',
    icon: ClaudeIcon,
    description: t.navigation.llmShare.askQuestions,
  },
];

export function LLMShare({ content }: LLMShareProps) {
  const [isCopied, setIsCopied] = useState(false);
  const pathname = usePathname();
  const markdownUrl = useCurrentPageMarkdown();
  const { refetch } = useLLMsTxt();
  const t = useTranslations();
  const llmProviders = getLLMProviders(t);

  const handleCopy = async () => {
    try {
      let contentToCopy = content;

      // Check if this is an API reference page
      if (pathname && pathname.match(/^\/apis\/[^/]+\/reference\//)) {
        try {
          // Fetch the generated markdown
          const response = await fetch(`${pathname}.md`);
          if (response.ok) {
            contentToCopy = await response.text();
          }
        } catch (error) {
          console.error('Failed to fetch generated markdown:', error);
          // Fall back to original content
        }
      }

      const processedContent = processMarkdownLinks(contentToCopy);
      await navigator.clipboard.writeText(processedContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1200);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  const handleShare = async (provider: ReturnType<typeof getLLMProviders>[number]) => {
    try {
      const instruction = `Read from ${markdownUrl} so I can ask questions about it.`;

      const encodedInstruction = encodeURIComponent(instruction);

      const shareUrl =
        provider.name === 'Claude'
          ? `https://claude.ai/new?q=${encodedInstruction}`
          : `${provider.url}?q=${encodedInstruction}`;

      window.open(shareUrl, '_blank');

      // prefetch the section-specific llms.txt for next time
      refetch();
    } catch (error) {
      console.error('[LLMShare] Failed to share:', error);
    }
  };

  return (
    <div className="hidden md:inline-flex rounded-md border border-border">
      <button
        onClick={handleCopy}
        type="button"
        className="cursor-pointer relative inline-flex items-center gap-2 rounded-l-md rounded-r-none px-2 py-1.5 text-sm font-fono focus:z-10 border-0 shadow-none transition-all duration-150 hover:bg-neutral-150 dark:hover:bg-neutral-700"
        aria-label={t.navigation.llmShare.copyMarkdown}
      >
        <span
          className={cn(
            'inline-flex items-center justify-center rounded p-0.5 transition-all duration-150',
            isCopied && '!text-brand-orange',
          )}
        >
          {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </span>
        {t.navigation.llmShare.copyMarkdown}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-label="Share options"
            className="relative inline-flex items-center rounded-r-md rounded-l-none p-1.5 focus:z-10 border-0 border-l border-border shadow-none"
          >
            <span className="sr-only">Open options</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          {llmProviders.map((provider) => (
            <DropdownMenuItem
              key={provider.name}
              onSelect={() => handleShare(provider)}
              className="cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <provider.icon className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium font-fono">{t.navigation.llmShare.openIn} {provider.name}</span>
                </div>
              </div>
              <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
