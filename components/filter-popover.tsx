import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useId } from "react";

import { ListFilter } from "lucide-react";

const CATEGORIES = [
  { label: "Stacks.js", value: "stacks.js" },
  { label: "Clarity", value: "clarity" },
  { label: "Bitcoin", value: "bitcoin" },
  // { label: "Chainhook", value: "chainhook" },
  { label: "API", value: "api" },
  // { label: "Clarinet", value: "clarinet" },
];

interface FilterPopoverProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

function FilterPopover({
  selectedCategories,
  onCategoriesChange,
}: FilterPopoverProps) {
  const id = useId();

  const handleCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, category]);
    } else {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleClear = () => {
    onCategoriesChange([]);
  };

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            aria-label="Filter by category"
            className="border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-3">
          <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground">
              Filter by category
            </div>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              {CATEGORIES.map((category) => (
                <div key={category.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`${id}-${category.value}`}
                    checked={selectedCategories.includes(category.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(category.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`${id}-${category.value}`}
                    className="font-normal"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
              <div
                role="separator"
                aria-orientation="horizontal"
                className="-mx-3 my-1 h-px bg-border"
              />
              <div className="flex justify-between gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="h-7 px-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { FilterPopover };
