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
      <div className="flex sm:items-center justify-between border-b-2 border-gray-200 dark:border-gray-200/50 pb-2 mb-2">
        <div className="relative flex items-center space-x-1">
          <div className="relative p-2">
            <span className="absolute text-green-500 bottom-0 right-2">
              <svg width="20" height="20">
                <circle cx="7" cy="7" r="7" fill="currentColor"></circle>
              </svg>
            </span>
            <Image
              src={receiver.image_url}
              alt="Profile picture"
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              width={144}
              height={144}
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-lg lg:text-2xl mt-1 flex items-center">
              <span className="mr-1">{name ?? receiver.username}</span>
            </div>
            <span className="text-sm lg:text-lg text-neutral-600 dark:text-neutral-400">
              Corbin Day:{" "}
              {new Date(receiver._creationTime).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 mx-4">
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
