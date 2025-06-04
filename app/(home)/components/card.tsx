import Link from "fumadocs-core/link";
import { cn } from "@/lib/utils";
import { InteractiveBadge } from "./interactive-badge";

interface CardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badges: Array<{
    label: string;
    href: string;
  }>;
  variant?: "default" | "secondary";
}

export function Card({
  href,
  icon,
  title,
  description,
  badges,
  variant = "default",
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-[0.6rem] p-[1.5px] overflow-hidden transition-colors hover:shadow-[0_6px_20px_rgba(89,86,80,0.2)] dark:hover:shadow-[0_6px_40px_#383432]",
        variant === "default" &&
          "bg-gradient-to-br from-border via-border to-neutral-300 dark:to-neutral-200",
        variant === "secondary" &&
          "bg-gradient-to-br from-border via-border to-orange-500 dark:to-orange-700"
      )}
    >
      <Link
        href={href}
        className="not-prose block rounded-lg bg-[#ebe9e5] dark:bg-neutral-600 p-8 text-md text-neutral-500 dark:text-neutral-300 h-full"
      >
        <div className="mb-6">
          <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {badges?.map((badge) => (
            <InteractiveBadge
              key={badge.label}
              href={badge.href}
              label={badge.label}
            />
          ))}
        </div>
      </Link>
    </div>
  );
}
