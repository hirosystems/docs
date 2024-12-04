"use client";

import { InnerLine } from "codehike/code";
import { CustomLineProps } from "codehike/code/types";
import { useHover } from "@/context/hover";

export function HoverLineClient({ annotation, ...props }: CustomLineProps) {
  try {
    const { hoveredId } = useHover();
    const isHovered = !hoveredId || annotation?.query === hoveredId;

    return (
      <InnerLine
        merge={props}
        className="transition-opacity duration-200"
        style={{ opacity: isHovered ? 1 : 0.5 }}
        data-line={annotation?.query || ""}
      />
    );
  } catch (error) {
    console.warn("Hover context not ready:", error);
    return <InnerLine merge={props} />;
  }
}
