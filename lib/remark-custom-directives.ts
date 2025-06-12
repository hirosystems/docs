// lib/remark-custom-directives.ts
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root } from "mdast";

/**
 * Custom remark plugin to transform directive syntax into MDX JSX elements
 * Compatible with Fumadocs MDX setup
 */
export const remarkCustomDirectives: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, (node: any, index, parent) => {
      // Handle container directives (:::)
      if (node.type === "containerDirective") {
        // Transform to MDX JSX element
        node.type = "mdxJsxFlowElement";

        // Extract attributes from the directive
        const directiveAttrs = node.attributes || {};

        switch (node.name) {
          case "callout":
            node.name = "Callout";
            node.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "type",
                value: directiveAttrs.type || "info",
              },
            ];
            break;

          case "card":
            node.name = "Card";
            node.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: directiveAttrs.className || "p-4",
              },
            ];
            break;

          case "parameter-item":
            node.name = "div";
            node.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: "parameter-item border-l-2 border-border pl-4 mb-4",
              },
            ];
            break;

          case "grid":
            node.name = "div";
            node.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: directiveAttrs.cols
                  ? `grid grid-cols-1 md:grid-cols-${directiveAttrs.cols} gap-6`
                  : "grid grid-cols-1 md:grid-cols-2 gap-6",
              },
            ];
            break;

          case "row":
            node.name = "div";
            node.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: "grid grid-cols-1 md:grid-cols-2 gap-6",
              },
            ];
            break;

          case "col-8":
            node.name = "div";
            node.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: "md:col-span-8",
              },
            ];
            break;

          case "col-4":
            node.name = "div";
            node.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: "md:col-span-4",
              },
            ];
            break;

          case "collapsible":
            // For collapsible sections (replacing <details>)
            node.name = "details";
            node.attributes = [];

            // If there's a title attribute, create a summary element
            if (directiveAttrs.title) {
              const summaryNode = {
                type: "mdxJsxFlowElement",
                name: "summary",
                attributes: [],
                children: [
                  {
                    type: "text",
                    value: directiveAttrs.title,
                  },
                ],
              };

              // Insert summary as first child
              if (node.children && Array.isArray(node.children)) {
                node.children.unshift(summaryNode);
              } else {
                node.children = [summaryNode];
              }
            }
            break;

          default:
            // For unknown directives, ensure attributes is an array
            node.attributes = [];
        }
      }

      // Handle leaf directives (::)
      if (node.type === "leafDirective") {
        // Transform to MDX JSX element
        node.type = "mdxJsxFlowElement";

        // Extract attributes from the directive
        const directiveAttrs = node.attributes || {};

        switch (node.name) {
          case "col":
            node.name = "div";
            node.attributes = directiveAttrs.span
              ? [
                  {
                    type: "mdxJsxAttribute",
                    name: "className",
                    value: `col-span-${directiveAttrs.span}`,
                  },
                ]
              : [];
            break;

          default:
            // For unknown directives, ensure attributes is an array
            node.attributes = [];
        }
      }

      // Handle text directives (:)
      if (node.type === "textDirective") {
        node.type = "mdxJsxTextElement";

        switch (node.name) {
          case "badge":
            node.name = "span";
            node.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value:
                  "inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-muted-foreground/20",
              },
            ];
            break;

          case "required":
            node.name = "span";
            node.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value:
                  "ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10",
              },
            ];
            // If this has content in brackets, use it as children
            if (node.children && node.children.length === 0) {
              node.children = [{ type: "text", value: "Required" }];
            }
            break;

          default:
            // For unknown directives, ensure attributes is an array
            node.attributes = [];
        }
      }
    });
  };
};
