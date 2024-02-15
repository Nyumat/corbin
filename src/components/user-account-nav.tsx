"use client";
import { getCapitalLettersOfName } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
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
      <DropdownMenuTrigger className="cursor-pointer outline-none" asChild>
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
        <div className="flex flex-col p-2 text-base">
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
