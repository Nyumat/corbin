import DashboardHeader from "@/components/dashboard-header";
import { EditItemForm } from "@/components/new-item";
import DashboardShell from "@/components/shell";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Suspense } from "react";
import { api } from "../../../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const auth = await currentUser();
  const userId = auth?.id ?? "";
  const { id } = params;
  const inventoryItem = await convex.query(api.items.getSingleItem, {
    id: id,
  });
  console.log(inventoryItem);
  return (
    <>
      <DashboardShell>
        <DashboardHeader title="Inventory Editor" />
        <Suspense fallback={<div>Loading...</div>}>
          <EditItemForm
            itemDetails={JSON.parse(JSON.stringify(inventoryItem))}
          />
        </Suspense>
      </DashboardShell>
    </>
  );
}
