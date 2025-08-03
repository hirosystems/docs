'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useNotesContext } from './notes.client';

export function NoteTooltip({ children, name }: { children: React.ReactNode; name: string }) {
  let note = useNotesContext(name);
  if (!note) {
    note = { name, type: 'prose', children: name };
  }
  const className = {
    code: 'p-0 [&>*]:my-0 border-none overflow-auto rounded-none bg-background',
    prose: '[&>*]:first-child:mt-0 [&>*]:last-child:mb-0 p-4 prose dark:prose-invert',
    image: 'p-0 [&>*]:first:mt-0 [&>*]:last:mb-0 border-none bg-transparent',
  }[note.type || 'prose'];

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted underline-offset-4 cursor-default">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className={cn('min-w-44 max-w-96 whitespace-normal', className)}>
          {note?.children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
