"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../convex/_generated/api";

export default function AddChatForm({ users }: { users: any }) {
  const auth = useUser();
  const [selectedUser, setSelectedUser] = useState("");
  const senderId = auth.user?.id ?? "";
  const addChat = useMutation(api.messages.createChat);

  const handleUserChange = (event: any) => {
    setSelectedUser(event.target.value);
  };

  const handleAddChat = async () => {
    if (selectedUser) {
      await addChat({
        senderId: senderId,
        receiverId: selectedUser,
      });
      setSelectedUser("");
      toast.success(
        `Chat with ${
          users?.find((user: any) => user.userId === selectedUser)?.username
        } created!`
      );
    } else {
      alert("Please select a user first.");
    }
  };

  return (
    <div className="flex items-center p-3 space-x-3">
      <div className="relative w-full">
        <select
          value={selectedUser}
          onChange={handleUserChange}
          className="w-full rounded-md bg-gray-100 p-2 dark:bg-neutral-800"
        >
          <option value="">Select A User To Chat With</option>
          {users?.map((user: any, index: number) => {
            if (user.userId !== senderId) {
              return (
                <option key={index} value={user.userId}>
                  {user.username.split("@")[0]}
                </option>
              );
            }
          })}
        </select>
        {selectedUser && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500"></span>
        )}
      </div>
      <button
        onClick={handleAddChat}
        className="bg-blue-500 hover:bg-blue-600 rounded-md text-white px-2 py-1 h-min"
      >
        Message{" "}
        {selectedUser
          ? users
              ?.find((user: any) => user.userId === selectedUser)
              ?.username.split("@")[0]
          : ""}
      </button>
    </div>
  );
}
