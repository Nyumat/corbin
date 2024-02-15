"use client";
import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { Message } from "../types/index";

function formatDate(date: Date) {
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
}

export default function ChatMessage({
  message,
  sender,
  isSender,
}: {
  message: Message;
  sender: string;
  isSender: boolean;
}) {
  const messageClass = isSender
    ? "order-1 items-end text-white"
    : "order-2 items-start text-gray-600";
  const imageOrder = isSender ? "order-2" : "order-1";
  const justifyContent = isSender ? "justify-end" : "";
  const fromUser = useQuery(api.users.getUserById, { userId: message.from });
  const toUser = useQuery(api.users.getUserById, { userId: message.to });
  const fromUserImage = fromUser?.image_url ?? "";
  const toUserImage = toUser?.image_url ?? "";
  return (
    <div className="flex flex-col space-y-2">
      <div className={`flex items-end ${justifyContent}`}>
        <div
          className={`flex flex-col space-y-2 text-md max-w-xs mx-2  ${messageClass}`}
        >
          <div className="px-4 py-2 rounded-lg inline-block bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {message.message}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-right">
            {formatDate(new Date(message._creationTime))}
          </div>
        </div>
        <div
          className={`w-6 h-6 rounded-full overflow-hidden ${imageOrder} align-middle`}
        >
          <Image
            src={sender === message.from ? fromUserImage : toUserImage}
            alt="My profile"
            objectFit="cover"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
