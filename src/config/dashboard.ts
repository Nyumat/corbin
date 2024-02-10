import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Home",
      href: "/dashboard",
      icon: "home",
    },
    {
      title: "New",
      href: "/dashboard/new",
      icon: "add",
    },
    {
      title: "Feed",
      href: "/dashboard/feed",
      icon: "layers",
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: "warehouse",
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: "messages",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings2",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "users",
    },
  ],
};
