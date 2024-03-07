import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import { currentUser } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { Suspense } from "react";
import { api } from "../../../../convex/_generated/api";
import Items from "../../../wrappers/Items";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const dynamic = "force-dynamic";

export default async function Page() {
  const auth = await currentUser();
  const userId = auth?.id ?? "";
  const items = await convex.query(api.items.getUserItems, {
    userId: userId,
  });
  return (
    <DashboardShell>
      <DashboardHeader title="Available Items" />
      <Suspense fallback={<div>Loading...</div>}>
        <Items
          inventory
          serverItems={items}
          currentUser={JSON.parse(JSON.stringify(auth))}
        />
      </Suspense>
    </DashboardShell>
  );
}
