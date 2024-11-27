import { docs, meta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { icons as lucideIcons } from "lucide-react";
import { create } from "@/components/ui/icon";
import { StacksIcon, BitcoinIcon } from "@/components/ui/icon";

const customIcons = {
  StacksIcon,
  BitcoinIcon,
};

const icons = { ...lucideIcons, ...customIcons } as any;

export function icon(iconName: string) {
  if (iconName in icons) {
    return create({ icon: icons[iconName as keyof typeof icons] });
  }
}

export const source = loader({
  baseUrl: "/",
  source: createMDXSource(docs, meta),
  icon(icon) {
    if (!icon) {
      return;
    }
    if (icon in icons) {
      return create({ icon: icons[icon as keyof typeof icons] });
    }
  },
});
