"use client";

import { User } from "@clerk/clerk-sdk-node";
import { Card, Metric, Text } from "@tremor/react";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "../../convex/_generated/api";
import { Item } from "../types/index";

const ItemCard = ({ item, currentUser }: { item: Item; currentUser: User }) => {
  const router = useRouter();
  const altName: string = item.owner_info.username;
  const addChat = useMutation(api.messages.createChat);
  const chats = useQuery(api.messages.getAllChatsForUser, {
    userId: currentUser.id,
  });
  const handleWantsToChat = async () => {
    const exists = chats?.some((chat) => chat.users.includes(item.owner_id));
    if (exists) {
      toast.error("You already have a chat with this user.");
      return;
    }
    await addChat({
      senderId: currentUser.id,
      receiverId: item.owner_id,
    });
    router.push(`/dashboard/messages/${item.owner_id}`);
  };

  return (
    <Card className="flex max-w-[300px] flex-col gap-2 p-4">
      <div className="flex flex-row items-center justify-between">
        {item.images.map((image) => (
          <Image
            key={item._id + image}
            src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${image}`}
            alt={item.item_name}
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
            className="mb-2 rounded-lg"
            width={300}
            height={300}
          />
        ))}
      </div>
      <div className="mb-4 flex flex-row items-center justify-start">
        <Image
          src={item.owner_info.image_url}
          alt={item.owner_info.first_name + "Profile Picture"}
          className="mx-2 rounded-full"
          width={30}
          height={30}
        />
        <div className="flex w-full flex-col items-start">
          <Text className="w-full whitespace-nowrap text-lg">
            {altName.includes("@") ? altName.split("@")[0] : altName}
          </Text>
          <Metric className="text-xs">
            Rating: {Math.round(item.rating ?? 0 * 100) / 100 || "None Yet"}
          </Metric>
        </div>

        {currentUser.id !== item.owner_id && (
          <div
            className="flex flex-row items-center justify-between"
            onClick={handleWantsToChat}
          >
            <Text className="cursor-pointer rounded-md bg-[#6c9a23]  px-2 py-1 text-xs hover:underline dark:text-white">
              Message
            </Text>
          </div>
        )}
      </div>
      <Text className="mx-4 text-lg dark:text-white">{item.item_name}</Text>
    </Card>
  );
};

const Items = ({
  serverItems,
  currentUser,
}: {
  serverItems: Item[];
  currentUser: User | null;
}) => {
  if (!serverItems) {
    return <div>Loading...</div>;
  }

  if (currentUser === null) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {serverItems.map((item) => (
        <ItemCard currentUser={currentUser} item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Items;
