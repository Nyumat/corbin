"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import ChatCard from "./ChatCard";
import AddChatForm from "./NewChatForm";

export default function ChatList({ id }: { id: string }) {
  const chats =
    useQuery(api.messages.getAllChatsForUser, {
      userId: id,
    }) ?? [];
  const availableUsers = useQuery(api.users.getAllUsers);
  return (
    <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-[100dvh]">
      <AddChatForm users={availableUsers} />
      {chats.map((chat: any, index: number) => (
        <ChatCard key={index} chat={chat} />
      ))}
    </div>
  );
}
