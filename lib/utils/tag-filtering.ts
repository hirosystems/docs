export interface FilterablePage {
  id: string;
  title: string;
  description?: string;
  url: string;
  labels: string[];
  section: string;

  type?: string;
}

export interface TagWithPages {
  tag: string;
  pages: FilterablePage[];
}

export type TagToPageMap = Map<string, FilterablePage[]>;

export interface TagFilterConfig {
  section: string;
  availableTags: string[];
  sectionPages: FilterablePage[];
}

export interface FilterResult {
  selectedTag: string;
  matchingPages: FilterablePage[];
  totalMatches: number;
}

/**
 * Build a map of tags to pages for efficient filtering
 * @param pages - Array of all filterable pages
 * @returns Map with tags as keys and arrays of pages as values
 */
export function buildTagToPageMap(pages: FilterablePage[]): TagToPageMap {
  const tagMap = new Map<string, FilterablePage[]>();

  pages.forEach((page) => {
    page.labels.forEach((label) => {
      if (!tagMap.has(label)) {
        tagMap.set(label, []);
      }
      tagMap.get(label)!.push(page);
    });
  });

  return tagMap;
}

/**
 * Filter pages by a specific tag within a section
 * @param tag - The tag to filter by
 * @param pages - Array of pages to filter
 * @param section - Optional section to limit filtering scope
 * @returns FilterResult with matching pages
 */
export function filterPagesByTag(
  tag: string,
  pages: FilterablePage[],
  section?: string
): FilterResult {
  const filteredPages = pages.filter((page) => {
    // Check if page matches the section (if specified)
    const sectionMatches = !section || page.section === section;
    // Check if any of the page's labels match the tag
    const tagMatches = page.labels.includes(tag);

    return sectionMatches && tagMatches;
  });

  return {
    selectedTag: tag,
    matchingPages: filteredPages,
    totalMatches: filteredPages.length,
  };
}

/**
 * Get all available tags for a specific section
 * @param pages - Array of pages
 * @param section - Section identifier
 * @returns Array of unique tags available in the section
 */
export function getAvailableTagsForSection(
  pages: FilterablePage[],
  section: string
): string[] {
  const tags = new Set<string>();

  pages
    .filter((page) => page.section === section)
    .forEach((page) => {
      page.labels.forEach((label) => tags.add(label));
    });

  return Array.from(tags).sort();
}

/**
 * Create a TagFilterConfig for a specific section
 * @param section - Section identifier
 * @param allPages - Array of all pages
 * @param displayTags - Tags to display for this section
 * @returns TagFilterConfig object
 */
export function createTagFilterConfig(
  section: string,
  allPages: FilterablePage[],
  displayTags: string[]
): TagFilterConfig {
  const sectionPages = allPages.filter((page) => page.section === section);

  return {
    section,
    availableTags: displayTags,
    sectionPages,
  };
}
