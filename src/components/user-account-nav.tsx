"use client";
import { getCapitalLettersOfName } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserAccountNavProps {
  user: Pick<
    User,
    "username" | "hasImage" | "imageUrl" | "firstName" | "lastName"
  >;
}

export default function UserAccountNav({ user }: UserAccountNavProps) {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src={user?.imageUrl as string} />
          <AvatarFallback>
            {user.firstName && user.lastName
              ? getCapitalLettersOfName(`${user.firstName} ${user.lastName}`)
              : user.username}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="text-md p-2 flex flex-col">
          {user.username && <h3 className="font-medium">{user.username}</h3>}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut(() => router.push("/"))}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
