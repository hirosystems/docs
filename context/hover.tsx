"use client";

import React, { createContext, useContext, useState } from "react";

interface HoverContextType {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  wasClicked: boolean;
  setWasClicked: (clicked: boolean) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export const HoverProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [wasClicked, setWasClicked] = useState(false);

  return (
    <HoverContext.Provider
      value={{ hoveredId, setHoveredId, wasClicked, setWasClicked }}
    >
      {children}
    </HoverContext.Provider>
  );
};

export const useHover = (): HoverContextType => {
  const context = useContext(HoverContext);
  if (!context) {
    throw new Error("useHover must be used within a HoverProvider");
  }
  return context;
};
