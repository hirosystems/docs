"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Stacks",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Bitcoin",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMain = [
    {
      title: "Clarinet",
      url: "/stacks/clarinet",
      icon: SquareTerminal,
      isActive:
        pathname === "/stacks/clarinet" ||
        pathname.startsWith("/stacks/clarinet/"),
      items: [
        {
          title: "Quickstart",
          url: "/stacks/clarinet/quickstart",
          isActive: pathname === "/stacks/clarinet/quickstart",
        },
        {
          title: "Starred",
          url: "#",
          isActive: false,
        },
        {
          title: "Settings",
          url: "#",
          isActive: false,
        },
      ],
    },
    // ... other nav items with similar isActive logic ...
  ];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
