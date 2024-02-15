import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import ChatList from "@/wrappers/Chats";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await currentUser();
  const userId = user?.id ?? "";
  return (
    <DashboardShell>
      <DashboardHeader title="Messages" />
      <ChatList id={userId} />
    </DashboardShell>
  );
}
