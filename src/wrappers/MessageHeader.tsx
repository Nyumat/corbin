import MobileNav from "@/components/mobile-nav";
import UserAccountNav from "@/components/user-account-nav";
import { User, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import Image from "next/image";
import { api } from "../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const dynamic = "force-dynamic";

export default async function MessageHeader({
  receiverId,
}: {
  receiverId: string;
}) {
  const receiver = await convex.query(api.messages.getReceiver, {
    receiverId: receiverId,
  });

  const user: User | null = await currentUser();

  if (!user) {
    return null;
  }

  if (!receiver) {
    return <div>Loading...</div>;
  }

  let name: string | null = receiver.first_name + " " + receiver.last_name;
  if (name.includes("null")) name = null;

  return (
    <>
      <div className="mb-2 flex justify-between border-b-2 border-gray-200 pb-2 dark:border-gray-200/50 sm:items-center">
        <div className="relative flex items-center space-x-1">
          <div className="relative p-2">
            <span className="absolute bottom-0 right-2 text-green-500">
              <svg width="20" height="20">
                <circle cx="7" cy="7" r="7" fill="currentColor"></circle>
              </svg>
            </span>
            <Image
              src={receiver.image_url}
              alt="Profile picture"
              className="size-10 rounded-full sm:size-16"
              width={144}
              height={144}
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="mt-1 flex items-center text-lg lg:text-2xl">
              <span className="mr-1">{name ?? receiver.username}</span>
            </div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400 lg:text-lg">
              Corbin Day:{" "}
              {new Date(receiver._creationTime).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mx-4 flex items-center space-x-2">
          <MobileNav />
          <UserAccountNav
            user={{
              imageUrl: user.imageUrl,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username ?? user.emailAddresses[0].emailAddress,
              hasImage: user.hasImage,
            }}
          />
        </div>
      </div>
    </>
  );
}
