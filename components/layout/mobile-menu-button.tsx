'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobileMenu } from '@/contexts/mobile-menu';
import { MobileNavigation } from './mobile-navigation';
import type { PageTree } from 'fumadocs-core/server';

interface MobileMenuButtonProps {
  tree?: PageTree.Root;
}

export function MobileMenuButton({ tree }: MobileMenuButtonProps) {
  const { open, isOpen, close } = useMobileMenu();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 md:hidden"
        onClick={open}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <MobileNavigation isOpen={isOpen} onClose={close} tree={tree} />
    </>
  );
}
