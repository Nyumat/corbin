import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { messageId: string } }) {
  const { messageId } = params;
  console.log(messageId);
  return (
    <>
      <DashboardShell>
        <DashboardHeader title="Message" />
      </DashboardShell>
    </>
  );
}
