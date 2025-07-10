/**
 * Utility functions for parsing and validating frontmatter tags and labels
 */

/**
 * Parse and validate an array of strings from frontmatter
 * @param value - The frontmatter value to parse
 * @returns Array of validated strings or empty array if invalid
 */
export function parseFrontmatterArray(value: unknown): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  if (typeof value === "string") {
    // Handle comma-separated strings
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [];
}

/**
 * Validate that tags array contains only valid tag names
 * @param tags - Array of tag strings
 * @returns Validated array of tags
 */
export function validateTags(tags: unknown): string[] {
  const parsed = parseFrontmatterArray(tags);

  // Additional validation for tags could go here
  // For now, just ensure they're non-empty strings
  return parsed.filter(
    (tag) => typeof tag === "string" && tag.length > 0 && tag.length <= 50 // Reasonable length limit
  );
}

/**
 * Validate that labels array contains only valid label names
 * @param labels - Array of label strings
 * @returns Validated array of labels
 */
export function validateLabels(labels: unknown): string[] {
  const parsed = parseFrontmatterArray(labels);

  // Additional validation for labels could go here
  // For now, just ensure they're non-empty strings
  return parsed.filter(
    (label) =>
      typeof label === "string" && label.length > 0 && label.length <= 50 // Reasonable length limit
  );
}

/**
 * Extract and validate tags and labels from frontmatter
 * @param frontmatter - The frontmatter object
 * @returns Object with validated tags and labels arrays
 */
export function extractTagsAndLabels(frontmatter: Record<string, unknown>) {
  return {
    tags: validateTags(frontmatter.tags),
    labels: validateLabels(frontmatter.labels),
  };
}
