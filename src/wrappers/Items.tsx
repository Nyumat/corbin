"use client";

import { User } from "@clerk/clerk-sdk-node";
import { Card, Metric, Text } from "@tremor/react";
import { useMutation, useQuery } from "convex/react";
import { MessageSquareIcon, Settings2, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Item } from "../types/index";

const ItemCard = ({
  item,
  currentUser,
  inventory,
}: {
  item: Item;
  currentUser: User;
  inventory: boolean;
}) => {
  const router = useRouter();
  const altName: string = item.owner_info.username;
  const addChat = useMutation(api.messages.createChat);
  const deleteItem = useMutation(api.items._delete);
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

  const handleDeleteItem = async () => {
    await deleteItem({ id: item._id as Id<"items"> });
    toast.success("Item deleted");
  };

  const handleWantsToEdit = () => {
    router.push(`/dashboard/inventory/editor/${item._id}`);
  };

  return (
    <Card className="mx-2 flex max-w-full flex-col gap-2 rounded-lg p-4 shadow-sm md:max-w-[250px]">
      <div className="flex flex-row items-center justify-center">
        {item.images.map((image) => (
          <Image
            key={item._id + image}
            src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${image}`}
            alt={item.item_name}
            className="mb-2 w-full rounded-lg object-cover"
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
          width={40}
          height={40}
        />
        <div className="flex w-full flex-col items-start">
          <Text className="w-full whitespace-nowrap text-lg">
            {altName.includes("@") ? altName.split("@")[0] : altName}
          </Text>
          <Metric className="text-xs">
            {Math.round(item.rating ?? 0 * 100) / 100 || "N/A"}
          </Metric>
        </div>

        <div
          id="item-card-actions"
          className="flex flex-row items-center justify-center gap-2"
        >
          {inventory && (
            <>
              <Trash
                className="cursor-pointer"
                onClick={async () => {
                  await handleDeleteItem();
                }}
              />
            </>
          )}

          {/* Editor */}
          {inventory && (
            <>
              <Settings2
                className="cursor-pointer"
                onClick={handleWantsToEdit}
              />
            </>
          )}

          {currentUser.id !== item.owner_id && (
            <>
              <MessageSquareIcon
                className="cursor-pointer text-green-500/80 dark:text-neutral-300/80"
                onClick={handleWantsToChat}
              />
            </>
          )}
        </div>
      </div>
      <Text className="mx-4 text-lg dark:text-white">{item.item_name}</Text>
    </Card>
  );
};

const Items = ({
  serverItems,
  currentUser,
  inventory,
}: {
  serverItems: Item[];
  currentUser: User | null;
  inventory?: boolean;
}) => {
  const items = useQuery(api.items.get);
  const userItems = useQuery(api.items.getUserItems, {
    userId: currentUser?.id ?? "",
  });

  if (!serverItems) {
    return <div>Loading...</div>;
  }

  if (currentUser === null) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="my-4 flex flex-row flex-wrap justify-start gap-6 px-1 lg:mx-6">
      {inventory ? (
        <>
          {(userItems || serverItems).map((item) => (
            <ItemCard
              inventory={inventory}
              currentUser={currentUser}
              item={item}
              key={item._id}
            />
          ))}
        </>
      ) : (
        <>
          {(items || serverItems).map((item) => (
            <ItemCard
              inventory={inventory ?? false}
              currentUser={currentUser}
              item={item}
              key={item._id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Items;
