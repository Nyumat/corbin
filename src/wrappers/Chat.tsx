"use client";

import { useUser } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

const defaultErrorState = {
  message: "",
};

export default function Chat({ params }: { params: string }) {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(defaultErrorState);
  const auth = useUser();

  const handleSendMessage = async () => {
    if (message === "") {
      setErrors({ message: "Message cannot be empty" });
    } else {
      setErrors(defaultErrorState);
      const userId = auth.user?.id ?? "";
      await convex.mutation(api.messages.createMessage, {
        senderId: userId,
        receiverId: params,
        text: message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <div className="border-t-2 border-neutral-200 dark:border-gray-200/50 px-4 pt-4 mb-2 sm:mb-0">
        <form className="relative flex" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Write your message!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full focus:outline-none focus:placeholder-neutral-400 placeholder-neutral-300 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200 rounded-md py-3"
          />
          <div className="absolute inset-y-0 flex items-center mx-1 right-0">
            <button
              type="submit"
              onClick={handleSendMessage}
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
