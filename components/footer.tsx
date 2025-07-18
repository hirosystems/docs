import React, { JSX } from "react";
import { Bug, Newspaper, QuestionIcon, Pulse } from "@/components/ui/icon";

const items = [
  {
    id: "questions",
    Icon: QuestionIcon,
    preText: "Questions?",
    body: (
      <span className="font-inter text-muted-foreground font-regular">
        Get help in the <span className="font-bold">#builder-general</span>{" "}
        channel on{" "}
        <a
          className="underline hover:text-primary"
          href="https://discord.gg/stacks"
        >
          Discord
        </a>
        .
      </span>
    ),
  },
  {
    id: "updates",
    Icon: Newspaper,
    preText: "Stay updated.",
    body: (
      <span className="font-inter text-muted-foreground font-regular">
        Sign up to our{" "}
        <a
          className="underline hover:text-primary"
          href="https://hiro.so/updates"
        >
          Newsletter
        </a>{" "}
        and read our{" "}
        <a className="underline hover:text-primary" href="https://hiro.so/blog">
          Blog
        </a>
        .
      </span>
    ),
  },
  {
    id: "status",
    Icon: Pulse,
    preText: "Something's not right?",
    body: (
      <span className="font-inter text-muted-foreground font-regular">
        Check{" "}
        <a
          className="underline hover:text-primary"
          href="https://status.hiro.so/"
        >
          System Status
        </a>
        .
      </span>
    ),
  },
  {
    id: "bug",
    Icon: Bug,
    preText: "Found a bug?",
    body: (
      <span className="font-inter text-muted-foreground font-regular">
        See our{" "}
        <a
          className="underline hover:text-primary"
          href="https://hackerone.com/hiro?type=team"
        >
          Bounty Program
        </a>
        .
      </span>
    ),
  },
];

export function PageFooter(): JSX.Element {
  return (
    <div className="footer relative mt-24 mb-8 bg-neutral-150 dark:bg-neutral-700 rounded-lg p-8 not-prose text-card-foreground transition-colors">
      <div className="flex flex-col space-y-3">
        {items.map(({ id, Icon, preText, body }) => (
          <div key={id} className="flex items-center space-x-3 w-full">
            <div className="flex gap-2 items-center">
              <Icon className="w-5 h-5 text-icon" />
              <span>{preText}</span>
            </div>
            {body}
          </div>
        ))}
      </div>
      <img
        src="/footer.svg"
        alt="Hiro Logo"
        className="absolute bottom-0 right-0 hidden lg:block"
      />
    </div>
  );
}
