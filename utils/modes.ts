/* eslint-disable import/no-relative-packages -- required */
import { LayoutIcon, LibraryIcon, type LucideIcon } from "lucide-react";
import { HiroSVG } from "@/app/(home)/icons";

export interface Mode {
  param: string;
  name: string;
  description: string;
  version: string;
  icon: React.ElementType;
}

export const modes: Mode[] = [
  {
    param: "stacks",
    name: "Stacks",
    description: "Developer Tools for Bitcoin Layers",
    version: "1.0.0",
    icon: HiroSVG,
  },
  {
    param: "ordinals",
    name: "Ordinals",
    description: "Developer Tools for Bitcoin Layers",
    version: "1.0.0",
    icon: HiroSVG,
  },
];
