"use client";

import { dashboardConfig } from "@/config/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import ThemeToggle from "./theme-toggle";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full  flex-col gap-5">
      <h1 className="text-lg font-medium">Dashboard</h1>
      <nav className="flex flex-1  flex-col gap-2">
        {dashboardConfig.sidebarNav.map((link, i) => {
          const Icon = Icons[link.icon];
          return (
            <Link
              href={link.href}
              className={cn(
                "gap-5 py-1 text-sm md:text-lg lg:text-lg xl:text-xl px-2 rounded-lg flex flex-row transition-colors items-center hover:bg-gray-2",
                pathname === link.href ? "bg-gray-2" : ""
              )}
              key={i}
            >
              <Icon size={16} />
              {link.title}
            </Link>
          );
        })}
      </nav>

      <div className="flex w-full justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
