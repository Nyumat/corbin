import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const dynamic = "force-dynamic";

export default async function Page() {
  //   const items = await convex.query(api.items.get);
  return (
    <DashboardShell>
      <DashboardHeader title="Available Items" />
      {/* <Items serverItems={items} /> */}
    </DashboardShell>
  );
}
