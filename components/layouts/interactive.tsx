"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePageData } from "./page";

// Interactive Header container component
interface InteractiveHeaderProps {
  children: ReactNode;
  className?: string;
}

function InteractiveHeader({ children, className }: InteractiveHeaderProps) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}

// Interactive Title component
interface InteractiveTitleProps {
  className?: string;
}

function InteractiveTitle({ className }: InteractiveTitleProps) {
  const { title } = usePageData();
  if (!title) return null;
  
  return (
    <h1 className={cn("text-4xl font-normal mb-6", className)}>
      {title}
    </h1>
  );
}

// Interactive Description component
interface InteractiveDescriptionProps {
  className?: string;
}

function InteractiveDescription({ className }: InteractiveDescriptionProps) {
  const { description } = usePageData();
  if (!description) return null;
  
  return (
    <p className={cn("text-lg tracking-3 text-muted-foreground", className)}>
      {description}
    </p>
  );
}

// Interactive Features component
interface InteractiveFeaturesProps {
  className?: string;
}

function InteractiveFeatures({ className }: InteractiveFeaturesProps) {
  const { interactiveFeatures = [] } = usePageData();
  if (interactiveFeatures.length === 0) return null;
  
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {interactiveFeatures.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="mr-2 p-1 shrink-0 bg-secondary border border-border text-muted-foreground rounded-full">
            <Check className="w-4 h-4" />
          </span>
          <p className="text-base tracking-3 font-normal text-pretty m-0 my-0.5 text-foreground">
            {feature}
          </p>
        </li>
      ))}
    </ul>
  );
}

// Interactive Links component
interface InteractiveLinksProps {
  className?: string;
}

function InteractiveLinks({ className }: InteractiveLinksProps) {
  const { interactiveLinks = [] } = usePageData();
  if (interactiveLinks.length === 0) return null;
  
  return (
    <ul className={cn(
      "flex flex-wrap shrink-0 text-base tracking-2 font-mono lg:col-start-2 flex-row lg:flex-col gap-6 lg:gap-4",
      className
    )}>
      {interactiveLinks.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className="text-accent hover:text-accent hover:decoration-solid underline decoration-dotted decoration-accent decoration-1 underline-offset-4 flex items-center gap-1 relative"
          >
            {link.icon && <span className="mr-1">{link.icon}</span>}
            <span className="font-fono">{link.title}</span>
            <span className="ml-1">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Interactive Layout - default composition
function InteractiveLayout() {
  return (
    <>
      <InteractiveTitle />
      <div className="grid grid-cols-[minmax(0,76ch)] lg:grid-cols-[minmax(0,76ch)_260px] gap-8 lg:gap-4 my-8 items-end">
        <div className="grid gap-8">
          <InteractiveDescription />
          <InteractiveFeatures />
        </div>
        <InteractiveLinks />
      </div>
    </>
  );
}

// Export as compound component
export const Interactive = {
  Header: InteractiveHeader,
  Title: InteractiveTitle,
  Description: InteractiveDescription,
  Features: InteractiveFeatures,
  Links: InteractiveLinks,
  Layout: InteractiveLayout,
};

// Also export individual components for flexibility
export {
  InteractiveHeader,
  InteractiveTitle,
  InteractiveDescription,
  InteractiveFeatures,
  InteractiveLinks,
  InteractiveLayout,
};