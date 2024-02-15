import Chat from "@/wrappers/Chat";
import MessageHeader from "@/wrappers/MessageHeader";
import MessageList from "@/wrappers/MessageList";

import DashboardShell from "@/components/shell";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { receiverId: string };
}) {
  const receiverId = params.receiverId;
  const auth = await currentUser();
  const userId = auth?.id ?? "";
  return (
    <>
      <DashboardShell className="flex h-[95vh] flex-1 flex-col justify-between overflow-y-scroll p-2 sm:p-6">
        <div className="flex h-full flex-col">
          <MessageHeader receiverId={receiverId} />
          <MessageList
            from={receiverId === userId ? receiverId : userId}
            to={receiverId === userId ? userId : receiverId}
          />
          <Chat params={receiverId} />
        </div>
      </DashboardShell>
    </>
  );
}
