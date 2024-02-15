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
      <DashboardShell className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-[95vh] overflow-y-scroll">
        <div className="flex flex-col h-full">
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
