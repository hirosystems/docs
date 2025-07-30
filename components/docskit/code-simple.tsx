'use client';

import { cn } from '@/lib/utils';
import { CopyButton } from './copy-button';
import { CodeIcon } from './code-icon';
import { CODEBLOCK, TITLEBAR } from './code-group';

interface SimpleCodeProps {
  code: string;
  lang?: string;
  title?: string;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  className?: string;
}

export function SimpleCode({
  code,
  lang = 'typescript',
  title,
  showCopy = true,
  showLineNumbers = true,
  className,
}: SimpleCodeProps) {
  const hasTitle = title?.trim() !== '';
  const lines = code.split('\n');

  return (
    <div className={cn(CODEBLOCK, !hasTitle && 'border-none', className)}>
      {hasTitle && (
        <div
          className={cn(
            TITLEBAR,
            'flex items-center gap-2',
            'text-muted-foreground text-sm font-mono',
          )}
        >
          <span className="pl-2 pr-1">
            <CodeIcon title={title || ''} lang={lang} />
          </span>
          {title}
          {showCopy && (
            <div className={cn('ml-auto mr-1 items-center')}>
              <CopyButton text={code} className="text-ch-tab-inactive-foreground" />
            </div>
          )}
        </div>
      )}
      {showCopy && !hasTitle && (
        <CopyButton
          text={code}
          className="absolute right-4 my-0 top-2 text-ch-tab-inactive-foreground z-10"
        />
      )}
      <div className="relative">
        <pre
          data-theme="hiro"
          data-lang={lang}
          data-ch="true"
          className={cn('!m-0 overflow-auto px-0 py-2 m-3 rounded !bg-ch-code', !title && '!m-0')}
          style={{
            color: 'var(--ch-1)',
            background: 'var(--bg-background)',
            colorScheme: 'var(--ch-0)',
          }}
        >
          <div style={{ minWidth: 'fit-content' }}>
            {lines.map((line, index) => (
              <div key={index} className="flex" style={{ borderLeft: '2px solid transparent' }}>
                {showLineNumbers && (
                  <span
                    className="text-right text-ch-line-number select-none mr-1"
                    style={{
                      minWidth: `${Math.max(2, lines.length.toString().length)}ch`,
                    }}
                  >
                    {index + 1}
                  </span>
                )}
                <div className="px-2 flex-1">
                  <code className="text-sm font-mono whitespace-pre">
                    {line || '\u00A0'} {/* Non-breaking space for empty lines */}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </pre>
      </div>
    </div>
  );
}
