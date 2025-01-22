"use client";

import { useEffect, useRef } from "react";
import { InnerLine } from "codehike/code";
import { CustomLineProps } from "codehike/code/types";
import { useHover } from "@/context/hover";

export function HoverLineClient({ annotation, ...props }: CustomLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const originalScrollRef = useRef<number | null>(null);

  try {
    const { hoveredId, wasClicked, setWasClicked } = useHover();
    const isHovered = !hoveredId || annotation?.query === hoveredId;

    useEffect(() => {
      const recipeContainer = lineRef.current?.closest(".recipe");
      if (!recipeContainer) return;

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
      if (!codeContainer) return;

      // Add scroll listener to reset clicked state
      const handleScroll = () => {
        if (wasClicked) {
          setWasClicked(false);
          originalScrollRef.current = null;
        }
      };

      codeContainer.addEventListener("scroll", handleScroll);
      return () => codeContainer.removeEventListener("scroll", handleScroll);
    }, [wasClicked, setWasClicked]);

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
            // Only store original position if we haven't clicked
            if (originalScrollRef.current === null && !wasClicked) {
              originalScrollRef.current = codeContainer.scrollTop;
            }

            const offset = codeContainer.clientHeight / 3;
            const lineRect = lineRef.current.getBoundingClientRect();
            const containerRect = codeContainer.getBoundingClientRect();
            const relativeTop =
              lineRect.top - containerRect.top + codeContainer.scrollTop;

            codeContainer.scrollTo({
              top: relativeTop - offset,
              behavior: "smooth",
            });
          }
        }
      } else if (
        !hoveredId &&
        originalScrollRef.current !== null &&
        !wasClicked
      ) {
        // Only scroll back if we haven't clicked
        const recipeContainer = lineRef.current?.closest(".recipe");
        if (recipeContainer) {
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
            codeContainer.scrollTo({
              top: originalScrollRef.current,
              behavior: "smooth",
            });
            // Reset the stored position
            originalScrollRef.current = null;
          }
        }
      }
    }, [hoveredId, annotation?.query, wasClicked]);

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
