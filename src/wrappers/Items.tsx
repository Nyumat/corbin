"use client";

import { Card, Col, Grid, Metric, Text } from "@tremor/react";
import { useQuery } from "convex/react";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

interface Item {
  _id: string;
  item_available: boolean;
  item_category: string;
  item_condition: string;
  item_description: string;
  item_image: string;
  item_location: string;
  item_name: string;
  item_price: string;
  seller_avatar: string;
  seller_email: string;
  seller_id: number;
  seller_name: string;
  seller_rating: number;
}

const ItemCard = ({ item }: { item: Item }) => {
    const router = useRouter();
    return (
        <Card>
            <div className="flex flex-row gap-4 items-center mb-2">
                <Image
                    src={item.seller_avatar}
                    alt={item.seller_name}
                    className="rounded-full"
                    width={50}
                    height={50}
                />
                <div className="w-full ">
                    <Text className="text-lg w-full whitespace-nowrap">
                        {item.seller_name}
                    </Text>
                    <Metric className="text-md">
                        Rating: {Math.round(item.seller_rating * 100) / 100}
                    </Metric>
                </div>
                <MessageCircleIcon size={48} className="cursor-pointer" onClick={() => router.push(`/dashboard/messages/${item.seller_id}`)} />
            </div>
            <Image
                src={item.item_image}
                alt={item.item_name}
                style={{ maxWidth: "100%", height: "auto" }}
                className="rounded-lg mb-2"
                width={300}
                height={300}
            />

            <Text className="text-xl">{item.item_name}</Text>
        </Card>
    );
}

const Items = ({
  serverItems,
}: {
  serverItems: {
    _id: string;
    item_available: boolean;
    item_category: string;
    item_condition: string;
    item_description: string;
    item_image: string;
    item_location: string;
    item_name: string;
    item_price: string;
    seller_avatar: string;
    seller_email: string;
    seller_id: number;
    seller_name: string;
    seller_rating: number;
  }[];
}) => {
  const items = useQuery(api.items.get);

  return (
    <Grid
      numItems={serverItems?.length || 0}
      numItemsSm={2}
      numItemsLg={4}
      numItemsMd={3}
      className="gap-2"
    >
      {(serverItems || items).map((item) => (
        <Col
          key={item._id}
          numColSpan={1}
          numColSpanSm={1}
          numColSpanMd={1}
          numColSpanLg={1}
        >
          <ItemCard item={item} />
        </Col>
      ))}
    </Grid>
  );
};

export default Items;
