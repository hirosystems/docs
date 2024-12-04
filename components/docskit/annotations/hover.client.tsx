"use client";

import { useHover } from "@/context/hover";

export function HoverLinkClient(props: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { setHoveredId } = useHover();
  const hoverId = props.href?.slice("hover:".length);

  return (
    <span
      className={`cursor-default underline decoration-dotted underline-offset-4 ${props.className}`}
      onMouseEnter={() => setHoveredId(hoverId ?? null)}
      onMouseLeave={() => setHoveredId(null)}
    >
      {props.children}
    </span>
  );
}
