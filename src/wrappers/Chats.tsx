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
    <div className="flex h-[100dvh] flex-col space-y-4 overflow-y-auto p-3">
      <AddChatForm users={availableUsers} />
      {chats.map((chat: any, index: number) => (
        <ChatCard key={index} chat={chat} />
      ))}
    </div>
  );
}
