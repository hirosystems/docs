import { Newspaper, BugIcon } from "lucide-react";
import { QuestionIcon, Pulse } from "@/components/ui/icon";

export function PageFooter(): JSX.Element {
  return (
    <div className="footer relative mt-24 mb-8 bg-accent rounded-lg p-8 not-prose text-card-foreground transition-colors">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2 w-full *:font-aeonik">
          <QuestionIcon className="w-6 h-6" />
          Questions?
          <span className="font-inter text-muted-foreground">
            Get help in the{" "}
            <span className="font-bold text-muted-foreground underline">
              <a
                href="https://stacks.chat"
                className="underline text-muted-foreground"
                target="_blank"
              >
                #builder-general
              </a>
            </span>{" "}
            channel on Discord
          </span>
          .
        </div>
        <div className="flex items-center space-x-3 w-full *:font-aeonik">
          <Newspaper className="w-6 h-6" />
          Stay updated
          <span className="font-inter text-muted-foreground">
            Sign up to our{" "}
            <a
              href="https://www.hiro.so/updates"
              className="underline text-muted-foreground"
              target="_blank"
            >
              Newsletter
            </a>{" "}
            and read our{" "}
            <a
              href="https://www.hiro.so/blog"
              className="underline text-muted-foreground"
              target="_blank"
            >
              Blog
            </a>
          </span>
          .
        </div>
        <div className="flex items-center space-x-3 w-full *:font-aeonik">
          <Pulse className="w-6 h-6" />
          Something's not right?
          <span className="font-inter text-muted-foreground">
            <a
              href="https://status.hiro.so/"
              className="underline text-muted-foreground"
              target="_blank"
            >
              Check System Status
            </a>
          </span>
          .
        </div>
        <div className="flex items-center space-x-3 w-full *:font-aeonik">
          <BugIcon className="w-6 h-6" />
          Found a bug?
          <span className="font-inter text-muted-foreground">
            <a
              href="https://hackerone.com/hiro?type=team"
              className="underline text-muted-foreground"
              target="_blank"
            >
              See our Bounty Program
            </a>
          </span>
          .
        </div>
      </div>
      <img
        src="/footer.svg"
        alt="Hiro Logo"
        className="absolute bottom-0 right-0 hidden lg:block"
      />
    </div>
  );
}
