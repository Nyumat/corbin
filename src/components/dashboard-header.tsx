import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { HTMLAttributes } from "react";
import MobileNav from "./mobile-nav";
import ThemeToggle from "./theme-toggle";
import UserAccountNav from "./user-account-nav";

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default async function DashboardHeader({
  className,
  title,
  children,
  ...props
}: DashboardHeaderProps) {
  let user: User | null = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 px-5 py-4 dark:bg-black/5 bg-gray-100/15 gap-2 backdrop-blur-lg flex flex-row justify-between items-center",
        className
      )}
      {...props}
    >
      <h1 className="flex-1 text-4xl font-medium">{title}</h1>
      <ThemeToggle className="hidden max-md:flex" />
      <MobileNav />
      <UserAccountNav
        user={{
          imageUrl: user.imageUrl,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username ?? user.emailAddresses[0].emailAddress,
          hasImage: user.hasImage,
        }}
      />
    </header>
  );
}
