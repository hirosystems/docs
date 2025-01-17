import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(text: string, maxLength: number = 180) {
  if (text.length <= maxLength) return text;
  // Find the last space before maxLength to avoid cutting words
  const lastSpace = text.lastIndexOf(" ", maxLength);
  return text.slice(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
}
