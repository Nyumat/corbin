"use client";
import { dashboardConfig } from "@/config/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden size-10  items-center justify-center rounded-lg p-2 outline-none transition-colors hover:bg-gray-2 max-md:flex">
        <Icons.menu size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {dashboardConfig.sidebarNav.map((link, i) => {
          const Icon = Icons[link.icon];
          return (
            <DropdownMenuItem key={i} asChild>
              <Link
                href={link.href}
                className={cn(
                  "py-1 text-sm px-2 rounded-md flex flex-row gap-2 transition-colors items-center ",
                  pathname === link.href ? "bg-gray-2" : ""
                )}
              >
                <Icon size={16} />
                {link.title}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
