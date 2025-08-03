import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

interface BannerProps {
  message: string;
  link?: {
    text: string;
    href: string;
  };
  icon?: React.ReactNode;
}

export function Banner({ message, link, icon = <AlertCircle className="h-4 w-4" /> }: BannerProps) {
  return (
    <div className="w-full bg-primary/10 py-2 text-center text-sm">
      <div className="container flex items-center justify-center gap-1.5">
        {icon}
        <p className="font-medium">
          {message}
          {link && (
            <>
              {' '}
              <Link
                href={link.href}
                className="font-semibold underline underline-offset-4 hover:text-primary"
              >
                {link.text}
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
