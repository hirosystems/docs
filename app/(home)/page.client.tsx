"use client";

import React, {
  useEffect,
  useState,
  Fragment,
  type ReactElement,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { TerminalIcon } from "lucide-react";
import { NextSVG, ContentlayerIcon, OpenAPIIcon } from "./icons";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const linkItemVariants = cva("transition-colors dark:hover:bg-muted");

export function Previews(): JSX.Element {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-lg">
      <p className="text-sm font-medium">I&apos;m satisfied with it</p>

      <a
        href="https://joulev.dev"
        rel="noreferrer noopener"
        className="mt-4 inline-flex items-center text-sm font-medium"
      >
        @joulev
      </a>
      <p className="text-xs text-muted-foreground">Next.js Expert</p>
    </div>
  );
}

interface IntegrationProps extends HTMLAttributes<HTMLDivElement> {
  codeBlocks?: { key: string; message: string; block: ReactNode }[];
}

export function Integration({
  className,
  codeBlocks,
  ...props
}: IntegrationProps): JSX.Element {
  const [activeSection, setActiveSection] = React.useState("clarinet");
  const activeCodeBlock = codeBlocks?.find(
    (block) => block.key === activeSection
  );

  return (
    <div
      className={cn(
        "relative grid grid-cols-1 *:border-l *:border-b *:p-6 lg:grid-cols-3",
        className
      )}
      {...props}
    >
      <div
        onClick={() => setActiveSection("clarinet")}
        className={cn(
          linkItemVariants(),
          "cursor-pointer",
          activeSection === "clarinet" && "bg-muted/80",
          activeSection !== "clarinet" && "hover:bg-muted"
        )}
      >
        <OpenAPIIcon className="mb-2 size-12" />
        <p className="text-lg font-medium">Clarinet</p>
        <p className="text-sm text-muted-foreground">
          Everything you need to write, test, integrate and deploy smart
          contracts.
        </p>
      </div>
      <div
        onClick={() => setActiveSection("stacks.js")}
        className={cn(
          linkItemVariants(),
          "cursor-pointer",
          activeSection === "stacks.js" && "bg-muted/80",
          activeSection !== "stacks.js" && "hover:bg-muted"
        )}
      >
        <NextSVG className="mb-2 size-12" />
        <p className="text-lg font-medium">Stacks.js</p>
        <p className="text-sm text-muted-foreground">
          A collection of libraries for building on the Stacks blockchain.
        </p>
      </div>
      <div
        onClick={() => setActiveSection("chainhook")}
        className={cn(
          linkItemVariants(),
          "cursor-pointer",
          activeSection === "chainhook" && "bg-muted/80",
          activeSection !== "chainhook" && "hover:bg-muted"
        )}
      >
        <ContentlayerIcon className="mb-2 size-12" />
        <p className="text-lg font-medium">Chainhook</p>
        <p className="text-sm text-muted-foreground">
          Stream blockchain events and trigger off-chain actions for your apps
          use case.
        </p>
      </div>
      <div className="col-span-full">
        <p className="text-sm font-medium">{activeCodeBlock?.message}</p>
        {activeCodeBlock?.block ?? null}
      </div>
      <div
        className="col-span-full h-[275px] overflow-hidden"
        style={{ borderBottomWidth: 0 }}
      >
        {activeSection === "clarinet" && <ClarinetAppAnimation />}
        {activeSection === "stacks.js" && <StacksJsAppAnimation />}
        {activeSection === "chainhook" && <ChainhookAppAnimation />}
      </div>
    </div>
  );
}

export function ClarinetAppAnimation(): JSX.Element {
  const installCmd = "clarinet new sbtc";
  const tickTime = 100;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 7;
  const timeCommandEnd = timeCommandRun + 7;
  const timeWindowOpen = timeCommandEnd + 1;
  const timeEnd = timeWindowOpen + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);

    return () => {
      clearInterval(timer);
    };
  }, [timeEnd]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="command_type">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <div className="inline-block h-3 w-1 animate-pulse bg-white" />
      )}
    </span>
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space"> </span>);
  }

  if (tick > timeCommandRun)
    lines.push(
      <Fragment key="command_response">
        <span className="font-bold">
          <span className="text-green-500">Created directory</span> sbtc
        </span>
        {tick > timeCommandRun + 1 && (
          <span className="font-bold">
            <span className="text-green-500">Created directory</span>{" "}
            sbtc/contracts
          </span>
        )}
        {tick > timeCommandRun + 2 && (
          <span className="font-bold">
            <span className="text-green-500">Created directory</span>{" "}
            sbtc/settings
          </span>
        )}
        {tick > timeCommandRun + 3 && (
          <span className="font-bold">
            <span className="text-green-500">Created directory</span> sbtc/tests
          </span>
        )}
        {tick > timeCommandRun + 4 && (
          <span className="font-bold">
            <span className="text-green-500">Created file</span>{" "}
            sbtc/Clarinet.toml
          </span>
        )}
        {tick > timeCommandRun + 5 && (
          <span className="font-bold">
            <span className="text-green-500">Created file</span>{" "}
            sbtc/settings/Mainnet.toml
          </span>
        )}
        {tick > timeCommandRun + 6 && (
          <span className="font-bold">
            <span className="text-green-500">Created file</span>{" "}
            sbtc/settings/Testnet.toml
          </span>
        )}
        {tick > timeCommandRun + 7 && (
          <span className="font-bold">
            <span className="text-green-500">Created file</span>{" "}
            sbtc/settings/Devnet.toml
          </span>
        )}
      </Fragment>
    );

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (tick >= timeEnd) {
          setTick(0);
        }
      }}
    >
      {tick > timeWindowOpen && (
        <LaunchAppWindow
          title="sbtc"
          message="Project created!"
          className="absolute bottom-5 right-4 z-10 animate-in fade-in slide-in-from-top-10"
        />
      )}
      <pre className="overflow-hidden rounded-xl border text-xs">
        <div className="flex flex-row items-center gap-2 border-b px-4 py-2">
          <TerminalIcon className="size-4" />{" "}
          <span className="font-bold">Terminal</span>
          <div className="grow" />
          <div className="size-2 rounded-full bg-orange-500" />
        </div>
        <div className="min-h-[200px] bg-gradient-to-b from-secondary [mask-image:linear-gradient(to_bottom,white,transparent)]">
          <code className="grid p-4">{lines}</code>
        </div>
      </pre>
    </div>
  );
}

export function StacksJsAppAnimation(): JSX.Element {
  const installCmd = "npx create stacks";
  const tickTime = 100;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 3;
  const timeCommandEnd = timeCommandRun + 3;
  const timeWindowOpen = timeCommandEnd + 1;
  const timeEnd = timeWindowOpen + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);

    return () => {
      clearInterval(timer);
    };
  }, [timeEnd]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="command_type">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <div className="inline-block h-3 w-1 animate-pulse bg-white" />
      )}
    </span>
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space"> </span>);
  }

  if (tick > timeCommandRun)
    lines.push(
      <Fragment key="command_response">
        <span className="font-bold">┌ Create Stacks App</span>
        <span>│</span>
        {tick > timeCommandRun + 1 && (
          <>
            <span className="font-bold">◇ Project name</span>
            <span>│ my-app</span>
          </>
        )}
        {tick > timeCommandRun + 2 && (
          <>
            <span>│</span>
            <span className="font-bold">◆ Choose a template</span>
          </>
        )}
        {tick > timeCommandRun + 3 && (
          <>
            <span>
              │ <span className="text-orange-500">●</span> Basic Clarity App
            </span>
            <span>│ ○ NFT Collection</span>
          </>
        )}
      </Fragment>
    );

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (tick >= timeEnd) {
          setTick(0);
        }
      }}
    >
      {tick > timeWindowOpen && (
        <LaunchAppWindow
          title="localhost:5173"
          message="App is running!"
          className="absolute bottom-5 right-4 z-10 animate-in fade-in slide-in-from-top-10"
        />
      )}
      <pre className="overflow-hidden rounded-xl border text-xs">
        <div className="flex flex-row items-center gap-2 border-b px-4 py-2">
          <TerminalIcon className="size-4" />{" "}
          <span className="font-bold">Terminal</span>
          <div className="grow" />
          <div className="size-2 rounded-full bg-orange-500" />
        </div>
        <div className="min-h-[200px] bg-gradient-to-b from-secondary [mask-image:linear-gradient(to_bottom,white,transparent)]">
          <code className="grid p-4">{lines}</code>
        </div>
      </pre>
    </div>
  );
}

export function ChainhookAppAnimation(): JSX.Element {
  const installCmd = "$ chainhook predicates scan ordinals.json --mainnet";
  const tickTime = 100;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 2;
  const timeCommandEnd = timeCommandRun + 2;
  const timeWindowOpen = timeCommandEnd + 1;
  const timeEnd = timeWindowOpen + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);

    return () => {
      clearInterval(timer);
    };
  }, [timeEnd]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="command_type">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <div className="inline-block h-3 w-1 animate-pulse bg-white" />
      )}
    </span>
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space"> </span>);
  }

  if (tick > timeCommandRun)
    lines.push(
      <Fragment key="command_response">
        <span className="font-bold">
          <span>Apr 20 20:42:00.123 </span>
          <span className="text-green-500">INFO</span> Starting predicate
          evaluation on Stacks blocks
        </span>
        {tick > timeCommandRun + 1 && (
          <span className="font-bold">
            <span>Apr 20 20:42:00.124 </span>
            <span className="text-green-500">INFO</span> 4200 blocks scanned, 6
            occurences found
          </span>
        )}
      </Fragment>
    );

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (tick >= timeEnd) {
          setTick(0);
        }
      }}
    >
      {tick > timeWindowOpen && (
        <LaunchAppWindow
          title="chainhook"
          message="Finished scanning blocks!"
          className="absolute bottom-5 right-4 z-10 animate-in fade-in slide-in-from-top-10"
        />
      )}
      <pre className="overflow-hidden rounded-xl border text-xs">
        <div className="flex flex-row items-center gap-2 border-b px-4 py-2">
          <TerminalIcon className="size-4" />{" "}
          <span className="font-bold">Terminal</span>
          <div className="grow" />
          <div className="size-2 rounded-full bg-orange-500" />
        </div>
        <div className="min-h-[200px] bg-gradient-to-b from-secondary [mask-image:linear-gradient(to_bottom,white,transparent)]">
          <code className="grid p-4">{lines}</code>
        </div>
      </pre>
    </div>
  );
}

interface LaunchAppWindowProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  message: string;
}

function LaunchAppWindow({
  title,
  message,
  ...props
}: LaunchAppWindowProps): JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden rounded-md border bg-background shadow-xl",
        props.className
      )}
    >
      <div className="relative flex h-6 flex-row items-center border-b bg-muted px-4 text-xs text-muted-foreground">
        <p className="absolute inset-x-0 text-center">{title}</p>
      </div>
      <div className="p-4 text-sm">{message}</div>
    </div>
  );
}
