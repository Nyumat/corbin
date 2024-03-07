"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useLayoutEffect, useRef } from "react";
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

  useLayoutEffect(() => {
    scrollToBottom();
  }, [serverMessages.length]);

  return (
    <ol
      id="messages"
      className="flex h-[100dvh] flex-col space-y-4 overflow-y-auto p-3"
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
      <span className="sr-only" id="message-end">
        End of messages
      </span>
      <div ref={messagesEndRef} />
    </ol>
  );
}
