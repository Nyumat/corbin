"use client";

import { User } from "@clerk/clerk-sdk-node";
import { Card, Metric, Text } from "@tremor/react";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Item } from "../types/index";

const ItemCard = ({ item, currentUser }: { item: Item; currentUser: User }) => {
  const router = useRouter();
  const firstName = item.owner_info.first_name;
  const lastName = item.owner_info.last_name ?? "";
  const altName = item.owner_info.username;
  return (
    <Card className="flex flex-col p-4 gap-4 w-[300px]">
      <div className="flex flex-row items-center justify-between mb-4 gap-12">
        <Image
          src={item.owner_info.image_url}
          alt={item.owner_info.first_name + "Profile Picture"}
          className="rounded-full mr-5"
          width={50}
          height={50}
        />
        <div className="w-full flex flex-col items-start">
          <Text className="text-lg w-full whitespace-nowrap">{altName}</Text>
          <Metric className="text-md">
            Rating: {Math.round(item.rating ?? 0 * 100) / 100 || "None Yet"}
          </Metric>
        </div>
        {currentUser.id !== item.owner_id && (
          <MessageCircleIcon
            size={48}
            className="cursor-pointer ml-4"
            onClick={() => router.push(`/dashboard/messages/${item.owner_id}`)}
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        {item.images.map((image) => (
          <Image
            key={item._id + image}
            src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${image}`}
            alt={item.item_name}
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
            className="rounded-lg mb-2"
            width={300}
            height={300}
          />
        ))}
      </div>
      <Text className="mx-4 text-xl text-white">{item.item_name}</Text>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {serverItems.map((item) => (
        <div key={item._id} className="w-fit mx-auto">
          <ItemCard currentUser={currentUser} item={item} />
        </div>
      ))}
    </div>
  );
};

export default Items;
