'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

interface MobileMenuContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (context === undefined) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider');
  }
  return context;
}

interface MobileMenuProviderProps {
  children: ReactNode;
}

export function MobileMenuProvider({ children }: MobileMenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    close();
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;

      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  return (
    <MobileMenuContext.Provider value={{ isOpen, open, close }}>
      {children}
    </MobileMenuContext.Provider>
  );
}
