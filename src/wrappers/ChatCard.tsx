"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../convex/_generated/api";

export const dynamic = "force-dynamic";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function formatDate(date: Date) {
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
}
/*
created_at
:
1707918549536
last_message_at
:
1707918549536
users
:
(2) ['user_2c6fVx1RcLc0yXHVO9tv1Xevv6F', 'user_2c9UxbxZxSab2oIbiMe7yDOMr8o']
_creationTime
:
1707918549531.8926
_id
:
"ks7cvw9ehf8c2z0esnygj7vks56kfc69"
*/

type UserArray = [string, string];

type Chat = {
  created_at: number;
  last_message_at: number;
  users: UserArray;
  _creationTime: number;
  _id: string;
  last_message_content: string;
};

export default function ChatCard({ chat }: { chat: Chat }) {
  const [to, from]: UserArray = chat.users;
  const fromUser = useQuery(api.users.getUserById, { userId: from });
  const toUser = useQuery(api.users.getUserById, { userId: to });
  const fromUserImage = fromUser?.image_url ?? "";
  const toUserImage = toUser?.image_url ?? "";
  const user = useUser().user;
  return (
    <>
      <Link
        href={`/dashboard/messages/${from === user?.id ? to : from}`}
        className="flex w-full cursor-pointer items-center space-x-3 rounded-lg border border-neutral-300/50 p-2 transition-all hover:bg-neutral-300/50 dark:hover:bg-neutral-900"
      >
        <div className="flex-1 space-y-2 text-left">
          <div className="text-sm md:text-2xl">
            {user?.id === to ? fromUser?.username : toUser?.username}
          </div>
          <p className="text-xs text-gray-300 md:text-lg">
            {chat.last_message_content.length > 0
              ? chat.last_message_content.slice(0, 50)
              : "No messages yet"}
          </p>
          <p className="text-xs text-gray-500 md:text-base">
            {formatDate(new Date(chat.last_message_at))}
          </p>
        </div>
        <div className="relative">
          <Image
            src={fromUserImage}
            alt={fromUser?.username ?? "User 1"}
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="absolute bottom-0 right-0 block size-2 rounded-full bg-green-500"></span>
        </div>
        <div className="relative">
          <Image
            src={toUserImage}
            alt={toUser?.username ?? "User 2"}
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="absolute bottom-0 right-0 block size-2 rounded-full bg-green-500"></span>
        </div>
      </Link>
    </>
  );
}
