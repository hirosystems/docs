"use client";

import { useState, useCallback, useMemo } from "react";
import type { FilterablePage, FilterResult } from "@/lib/utils/tag-filtering";
import { filterPagesByTag } from "@/lib/utils/tag-filtering";

export interface UseTagFilteringProps {
  pages: FilterablePage[];
  section?: string;
}

export interface UseTagFilteringReturn {
  selectedTag: string | undefined;
  isDialogOpen: boolean;
  filterResult: FilterResult | null;
  selectTag: (tag: string) => void;
  closeDialog: () => void;
  clearTag: () => void;
}

export function useTagFiltering({
  pages,
  section,
}: UseTagFilteringProps): UseTagFilteringReturn {
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Calculate filter results when tag or pages change
  const filterResult = useMemo(() => {
    if (!selectedTag || !pages.length) {
      return null;
    }

    return filterPagesByTag(selectedTag, pages, section);
  }, [selectedTag, pages, section]);

  // Function to select a tag and open the dialog
  const selectTag = useCallback((tag: string) => {
    setSelectedTag(tag);
    setIsDialogOpen(true);
  }, []);

  // Function to close the dialog
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    // Note: We keep the selectedTag so it remains highlighted
  }, []);

  // Function to clear the selected tag completely
  const clearTag = useCallback(() => {
    setSelectedTag(undefined);
    setIsDialogOpen(false);
  }, []);

  return {
    selectedTag,
    isDialogOpen,
    filterResult,
    selectTag,
    closeDialog,
    clearTag,
  };
}
