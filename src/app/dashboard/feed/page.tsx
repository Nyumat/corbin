import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";

import Items from "@/wrappers/Items";
import { User } from "@clerk/clerk-sdk-node";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Suspense } from "react";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const dynamic = "force-dynamic";

export default async function Page() {
  const items = await convex.query(api.items.get);
  let user: User | null = await currentUser();

  return (
    <DashboardShell>
      <DashboardHeader title="Available Items" />
      <Suspense fallback={<div>Loading...</div>}>
        <Items
          serverItems={items}
          currentUser={JSON.parse(JSON.stringify(user))}
        />
      </Suspense>
    </DashboardShell>
  );
}
