// lib/remark-custom-directives.ts
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root } from "mdast";

/**
 * Custom remark plugin to transform directive syntax into MDX JSX elements
 * Currently supports:
 * - :::next-steps directive for creating Next steps sections
 * - :::callout directive for creating Callout components
 */
export const remarkCustomDirectives: Plugin<[], Root> = () => {
  return (tree: Root, file) => {
    visit(tree, (node: any, index, parent) => {
      // Handle container directives (:::)
      if (node.type === "containerDirective") {
        switch (node.name) {
          case "next-steps":
            transformNextStepsDirective(node, index, parent, file);
            break;
          case "callout":
            transformCalloutDirective(node, index, parent, file);
            break;
          default:
            // For unknown directives, transform to mdxJsxFlowElement with empty attributes
            node.type = "mdxJsxFlowElement";
            node.attributes = [];
        }
      }
    });
  };
};

/**
 * Transform :::next-steps directive into Next steps section
 * Expected format:
 * :::next-steps
 * - [Title](href): Description
 * - [Title](href): Description
 * :::
 */
function transformNextStepsDirective(
  node: any,
  index: number | undefined,
  parent: any,
  file: any
) {
  // Validate that we have exactly one child that is a list
  const listNode = node.children?.find((child: any) => child.type === "list");

  if (!listNode) {
    file.fail("next-steps directive must contain a list", node.position);
    return;
  }

  // Validate exactly 2 list items
  if (listNode.children?.length !== 2) {
    file.fail(
      `next-steps directive must contain exactly 2 list items (found ${listNode.children?.length || 0})`,
      node.position
    );
    return;
  }

  // Parse each list item
  const nextStepsData = [];
  for (let i = 0; i < listNode.children.length; i++) {
    const listItem = listNode.children[i];
    const parsed = parseNextStepItem(listItem, i + 1, file);
    if (parsed) {
      nextStepsData.push(parsed);
    }
  }

  // If we couldn't parse all items, bail out
  if (nextStepsData.length !== 2) {
    return;
  }

  // Create the transformed nodes
  const transformedNodes = [
    // ## Next steps header
    {
      type: "heading",
      depth: 2,
      children: [{ type: "text", value: "Next steps" }],
    },
    // <Cards> wrapper with <NextCard> children
    {
      type: "mdxJsxFlowElement",
      name: "Cards",
      attributes: [],
      children: nextStepsData.map((step) => ({
        type: "mdxJsxFlowElement",
        name: "NextCard",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "href",
            value: step.href,
          },
          {
            type: "mdxJsxAttribute",
            name: "title",
            value: step.title,
          },
          {
            type: "mdxJsxAttribute",
            name: "description",
            value: step.description,
          },
        ],
        children: [],
      })),
    },
  ];

  // Replace the directive node with our transformed nodes
  if (parent && index !== null) {
    parent.children.splice(index, 1, ...transformedNodes);
  }
}

/**
 * Parse a list item in the format: - [Title](href): Description
 */
function parseNextStepItem(
  listItem: any,
  itemNumber: number,
  file: any
): { title: string; href: string; description: string } | null {
  // List item should have a paragraph as its first child
  const paragraph = listItem.children?.find(
    (child: any) => child.type === "paragraph"
  );
  if (!paragraph) {
    file.fail(
      `List item ${itemNumber} in next-steps must contain a paragraph`,
      listItem.position
    );
    return null;
  }

  // Find the link node
  const linkNode = paragraph.children?.find(
    (child: any) => child.type === "link"
  );
  if (!linkNode) {
    file.fail(
      `List item ${itemNumber} in next-steps must contain a link in the format [Title](href)`,
      listItem.position
    );
    return null;
  }

  // Extract title from link text
  const title = linkNode.children
    ?.filter((child: any) => child.type === "text")
    .map((child: any) => child.value)
    .join("");

  if (!title) {
    file.fail(
      `List item ${itemNumber} in next-steps must have link text`,
      linkNode.position
    );
    return null;
  }

  // Extract href
  const href = linkNode.url;
  if (!href) {
    file.fail(
      `List item ${itemNumber} in next-steps must have a valid href`,
      linkNode.position
    );
    return null;
  }

  // Find the text after the link (should start with ": ")
  const linkIndex = paragraph.children.indexOf(linkNode);
  const afterLink = paragraph.children.slice(linkIndex + 1);

  // Look for text nodes after the link
  let description = "";
  for (const node of afterLink) {
    if (node.type === "text") {
      description += node.value;
    }
  }

  // Clean up and validate description
  description = description.trim();
  if (description.startsWith(":")) {
    description = description.substring(1).trim();
  } else {
    file.fail(
      `List item ${itemNumber} in next-steps must have a description after the link, separated by a colon (:)`,
      listItem.position
    );
    return null;
  }

  if (!description) {
    file.fail(
      `List item ${itemNumber} in next-steps must have a non-empty description`,
      listItem.position
    );
    return null;
  }

  return { title, href, description };
}

/**
 * Transform :::callout directive into Callout component
 * Expected formats:
 * :::callout
 * type: help
 * ### Title here
 * Content here
 * :::
 */
function transformCalloutDirective(
  node: any,
  index: number | undefined,
  parent: any,
  file: any
) {
  // Transform the directive node to mdxJsxFlowElement
  node.type = "mdxJsxFlowElement";
  node.name = "Callout";
  
  // Initialize attributes array
  node.attributes = [];
  
  let calloutType = "info"; // default
  let titleText = "";
  
  // Check if first child is a paragraph with "type: X" pattern
  if (node.children && node.children.length > 0) {
    const firstChild = node.children[0];
    if (firstChild.type === "paragraph" && firstChild.children) {
      const textContent = firstChild.children
        .filter((child: any) => child.type === "text")
        .map((child: any) => child.value)
        .join("");
      
      // Check for type: pattern
      const typeMatch = textContent.match(/^type:\s*(tip|info|warn|help)\s*$/);
      if (typeMatch) {
        calloutType = typeMatch[1];
        // Remove the type paragraph
        node.children.shift();
      }
    }
  }
  
  // Add type attribute
  node.attributes.push({
    type: "mdxJsxAttribute",
    name: "type",
    value: calloutType
  });
  
  // Check if next child is a heading for title
  if (node.children && node.children.length > 0) {
    const firstChild = node.children[0];
    if (firstChild.type === "heading" && firstChild.depth === 3) {
      // Extract title from heading
      titleText = firstChild.children
        ?.filter((child: any) => child.type === "text")
        .map((child: any) => child.value)
        .join("");
      
      if (titleText) {
        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "title",
          value: titleText
        });
        
        // Remove the heading from children
        node.children.shift();
      }
    }
  }
  
  // Children remain as-is to preserve markdown content
}

