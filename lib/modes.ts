import { StacksIcon, BitcoinIcon } from "@/components/ui/icon";

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
    param: "bitcoin",
    name: "Bitcoin",
    type: "tab",
    icon: BitcoinIcon,
  },
];
