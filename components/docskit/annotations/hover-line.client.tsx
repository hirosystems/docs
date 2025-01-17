"use client";

import { useEffect, useRef } from "react";
import { InnerLine } from "codehike/code";
import { CustomLineProps } from "codehike/code/types";
import { useHover } from "@/context/hover";

export function HoverLineClient({ annotation, ...props }: CustomLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  try {
    const { hoveredId } = useHover();
    const isHovered = !hoveredId || annotation?.query === hoveredId;

    useEffect(() => {
      // Add scrollable effect to the line when hovered
      if (
        hoveredId &&
        annotation?.query &&
        annotation.query === hoveredId &&
        lineRef.current
      ) {
        const recipeContainer = lineRef.current.closest(".recipe");

        if (recipeContainer) {
          // Find the first scrollable child
          const scrollableContainers = [
            ...recipeContainer.querySelectorAll("*"),
          ].filter((el) => {
            const style = window.getComputedStyle(el);
            return (
              style.overflow === "auto" ||
              style.overflow === "scroll" ||
              style.overflowY === "auto" ||
              style.overflowY === "scroll"
            );
          });

          const codeContainer = scrollableContainers[0];

          if (codeContainer) {
            const offset = codeContainer.clientHeight / 3;
            const lineRect = lineRef.current.getBoundingClientRect();
            const containerRect = codeContainer.getBoundingClientRect();

            // Calculate relative position considering current scroll
            const relativeTop =
              lineRect.top - containerRect.top + codeContainer.scrollTop;

            console.log({
              offset,
              lineTop: lineRect.top,
              containerTop: containerRect.top,
              relativeTop,
              currentScroll: codeContainer.scrollTop,
              containerHeight: codeContainer.clientHeight,
            });

            codeContainer.scrollTo({
              top: relativeTop - offset,
              behavior: "smooth",
            });
          }
        }
      }
    }, [hoveredId, annotation?.query]);

    return (
      <div ref={lineRef}>
        <InnerLine
          merge={props}
          className="transition-opacity duration-200"
          style={{
            opacity: isHovered ? 1 : 0.5,
            filter: isHovered ? "none" : "blur(0.25px)",
          }}
          data-line={annotation?.query || ""}
        />
      </div>
    );
  } catch (error) {
    console.warn("Hover context not ready:", error);
    return <InnerLine merge={props} />;
  }
}
