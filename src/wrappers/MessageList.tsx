"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useRef } from "react";
import { api } from "../../convex/_generated/api";
import { Message } from "../types/index";
import ChatMessage from "./ChatMessage";

export default function MessageList({ to, from }: any) {
  const serverMessages: Message[] =
    useQuery(api.messages.getMessagesForChat, {
      senderId: from,
      receiverId: to,
    }) ?? [];

  const auth = useUser();
  const userId = auth.user?.id ?? "";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [serverMessages.length]);

  return (
    <ol
      id="messages"
      className="flex flex-col-reverse space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-[100dvh]"
    >
      {serverMessages?.map((message: Message, index: number) => {
        return (
          <ChatMessage
            key={index}
            message={message}
            sender={message.from}
            isSender={message.from === userId}
          />
        );
      })}
      <div ref={messagesEndRef} />
      <span className="sr-only" id="message-end">
        End of messages
      </span>
    </ol>
  );
}
