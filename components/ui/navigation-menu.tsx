'use client';
import * as React from 'react';
import * as Primitive from '@radix-ui/react-navigation-menu';
import { cn } from '@/lib/utils';

const NavigationMenu = Primitive.Root;

const NavigationMenuList = Primitive.List;

const NavigationMenuItem = React.forwardRef<
  React.ComponentRef<typeof Primitive.NavigationMenuItem>,
  React.ComponentPropsWithoutRef<typeof Primitive.NavigationMenuItem>
>(({ className, children, ...props }, ref) => (
  <Primitive.NavigationMenuItem
    ref={ref}
    className={cn('list-none text-muted-foreground', className)}
    {...props}
  >
    {children}
  </Primitive.NavigationMenuItem>
));

NavigationMenuItem.displayName = Primitive.NavigationMenuItem.displayName;

const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <Primitive.Trigger
    ref={ref}
    className={cn('data-[state=open]:bg-fd-accent/50', className)}
    {...props}
  >
    {children}
  </Primitive.Trigger>
));
NavigationMenuTrigger.displayName = Primitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(({ className, ...props }, ref) => (
  <Primitive.Content
    ref={ref}
    className={cn(
      'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto',
      'group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = Primitive.Content.displayName;

const NavigationMenuLink = Primitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ComponentRef<typeof Primitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof Primitive.Viewport>
>(({ className, ...props }, ref) => (
  <div ref={ref} className="flex w-full justify-center">
    <Primitive.Viewport
      {...props}
      className={cn(
        'relative h-(--radix-navigation-menu-viewport-height) w-full origin-[top_center] overflow-hidden transition-[width,height] duration-300 data-[state=closed]:animate-fd-nav-menu-out data-[state=open]:animate-fd-nav-menu-in',
        className,
      )}
    />
  </div>
));
NavigationMenuViewport.displayName = Primitive.Viewport.displayName;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
};
