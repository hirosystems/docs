'use client';

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/use-translations';
import type { FeedbackResponse } from '@/types/feedback';

interface FeedbackWrapperProps {
  pageTitle: string;
  pagePath: string;
  className?: string;
}

export function FeedbackWrapper({ pageTitle, pagePath, className }: FeedbackWrapperProps) {
  const t = useTranslations();
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [discussionUrl, setDiscussionUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = useCallback(
    async (helpful: boolean) => {
      setIsSubmitting(true);
      setError(null);

      try {
        const pageUrl =
          typeof window !== 'undefined' ? window.location.href : `https://docs.hiro.so${pagePath}`;

        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageTitle,
            pagePath,
            pageUrl,
            helpful,
            feedback: additionalFeedback || undefined,
          }),
        });

        const data: FeedbackResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit feedback');
        }

        setFeedback(helpful ? 'helpful' : 'not-helpful');
        if (data.discussionUrl) {
          setDiscussionUrl(data.discussionUrl);
        }

        setShowTextarea(false);
        setAdditionalFeedback('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    },
    [pageTitle, pagePath, additionalFeedback],
  );

  const handleFeedbackClick = (helpful: boolean) => {
    const newFeedback = helpful ? 'helpful' : 'not-helpful';

    if (feedback === newFeedback && showTextarea) {
      setFeedback(null);
      setShowTextarea(false);
      setAdditionalFeedback('');
    } else {
      setFeedback(newFeedback);
      setShowTextarea(true);
    }
  };

  const handleSubmit = () => {
    if (feedback === 'helpful') {
      submitFeedback(true);
    } else if (feedback === 'not-helpful') {
      submitFeedback(false);
    }
  };

  const handleCancel = () => {
    setFeedback(null);
    setShowTextarea(false);
    setAdditionalFeedback('');
    setError(null);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-6">
        <h3 className="text-base">{t.navigation.feedback.question}</h3>

        {showTextarea ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleFeedbackClick(true)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all',
                feedback === 'helpful'
                  ? 'bg-green-200 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900'
                  : 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all',
                'text-muted-foreground',
                'hover:text-primary',
                'border focus:outline-none',
              )}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="font-fono">{t.navigation.feedback.good}</span>
            </button>

            <button
              type="button"
              onClick={() => handleFeedbackClick(false)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all',
                feedback === 'not-helpful'
                  ? 'bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900'
                  : 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all',
                'text-muted-foreground',
                'hover:text-primary',
                'border focus:outline-none',
              )}
            >
              <ThumbsDown className="w-4 h-4" />
              <span className="font-fono">{t.navigation.feedback.bad}</span>
            </button>
          </div>
        ) : !feedback ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleFeedbackClick(true)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all',
                'text-muted-foreground',
                'hover:text-primary',
                'border focus:outline-none',
              )}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="font-fono">{t.navigation.feedback.good}</span>
            </button>

            <button
              type="button"
              onClick={() => handleFeedbackClick(false)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all',
                'text-muted-foreground',
                'hover:text-primary',
                'border focus:outline-none',
              )}
            >
              <ThumbsDown className="w-4 h-4" />
              <span className="font-fono">{t.navigation.feedback.bad}</span>
            </button>
          </div>
        ) : null}
      </div>

      {feedback && !showTextarea && (
        <div className="mt-4 flex flex-row gap-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {t.navigation.feedback.thankYou}
          </p>
          {discussionUrl && (
            <a
              href={discussionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              {t.navigation.feedback.viewHere}
            </a>
          )}
        </div>
      )}

      {showTextarea && (
        <div className="mt-4 flex flex-col gap-3">
          <textarea
            value={additionalFeedback}
            onChange={(e) => setAdditionalFeedback(e.target.value)}
            placeholder={t.navigation.feedback.placeholder}
            className={cn(
              'font-fono',
              'w-full min-h-[80px] p-3 rounded-md resize-none text-sm',
              'border-1',
              'focus:outline-none focus:ring-1 focus:ring-border',
              'placeholder:font-fono placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
            )}
          />

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <div className="flex">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-colors',
                'border',
                'hover:bg-neutral-100 dark:hover:bg-neutral-800/40',
                'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
              )}
            >
              {isSubmitting ? t.navigation.feedback.submitting : t.navigation.feedback.submit}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
