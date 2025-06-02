"use client";

import * as React from "react";

interface ShortcutHandler {
  key: string;
  callback: () => void;
  metaKey?: boolean;
  ctrlKey?: boolean;
  preventDefault?: boolean;
}

interface KeyboardShortcutsProviderProps {
  children: React.ReactNode;
}

const KeyboardShortcutsContext = React.createContext<{
  registerShortcut: (shortcut: ShortcutHandler) => () => void;
} | null>(null);

export function KeyboardShortcutsProvider({
  children,
}: KeyboardShortcutsProviderProps) {
  const shortcutsRef = React.useRef<ShortcutHandler[]>([]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement)
      )
        return;

      shortcutsRef.current.forEach((shortcut) => {
        if (
          e.key.toLowerCase() === shortcut.key.toLowerCase() &&
          (!shortcut.metaKey || e.metaKey) &&
          (!shortcut.ctrlKey || e.ctrlKey)
        ) {
          if (shortcut.preventDefault) e.preventDefault();
          shortcut.callback();
        }
      });
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const registerShortcut = React.useCallback((shortcut: ShortcutHandler) => {
    shortcutsRef.current.push(shortcut);
    return () => {
      shortcutsRef.current = shortcutsRef.current.filter((s) => s !== shortcut);
    };
  }, []);

  return (
    <KeyboardShortcutsContext.Provider value={{ registerShortcut }}>
      {children}
    </KeyboardShortcutsContext.Provider>
  );
}

export function useKeyboardShortcuts() {
  const context = React.useContext(KeyboardShortcutsContext);
  if (!context)
    throw new Error(
      "useKeyboardShortcuts must be used within KeyboardShortcutsProvider"
    );
  return context;
}
