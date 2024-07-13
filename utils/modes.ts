/* eslint-disable import/no-relative-packages -- required */
import { LayoutIcon, LibraryIcon, type LucideIcon } from "lucide-react";
import { StacksIcon, OrdinalsIcon, BitcoinIcon } from "@/components/ui/icon";

export interface Mode {
  param: string;
  name: string;
  type: "tab" | "link";
  icon?: React.ElementType;
}

export const modes: Mode[] = [
  {
    param: "stacks",
    name: "Stacks",
    type: "tab",
    icon: StacksIcon,
  },
  {
    param: "ordinals",
    name: "Bitcoin",
    type: "tab",
    icon: BitcoinIcon,
  },
];
