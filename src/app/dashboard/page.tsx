import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import { totalMembersData } from "@/lib/data";
import {
  AreaChart,
  BadgeDelta,
  Card,
  Flex,
  Metric,
  Text,
  Title,
} from "@tremor/react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <DashboardShell>
      <DashboardHeader title="Home" />
      <div className="grid grid-cols-1 gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
        <Card className="mx-auto size-full rounded-lg">
          <Flex justifyContent="between" alignItems="center" className="gap-2">
            <Text>Add New Listing</Text>
            <Link href="/dashboard/new">
              <Plus size={24} />
            </Link>
          </Flex>
        </Card>
        <Card className="rounded-lg">
          <Flex justifyContent="between" alignItems="center">
            <Text>Total Fulfillments</Text>
            <BadgeDelta
              deltaType="moderateIncrease"
              isIncreasePositive={true}
              size="sm"
            >
              +20%
            </BadgeDelta>
          </Flex>
          <Metric>25</Metric>
        </Card>
        <Card className="rounded-lg">
          <Flex justifyContent="between" alignItems="center">
            <Text>Enrolled members</Text>
            <BadgeDelta
              deltaType="moderateIncrease"
              isIncreasePositive={true}
              size="sm"
            >
              +10%
            </BadgeDelta>
          </Flex>
          <Metric>1736</Metric>
        </Card>
        <Card className="rounded-lg">
          <Flex justifyContent="between" alignItems="center">
            <Text>Active now</Text>
            <BadgeDelta
              deltaType="moderateIncrease"
              isIncreasePositive={true}
              size="sm"
            >
              +19%
            </BadgeDelta>
          </Flex>
          <Metric>132</Metric>
        </Card>
      </div>
      <div className="px-5">
        <Card className="rounded-lg ">
          <Title>Course Members</Title>
          <AreaChart
            className="rounded-md"
            data={totalMembersData}
            index="date"
            categories={["Total members"]}
          />
        </Card>
      </div>
    </DashboardShell>
  );
}
/*
const users = await convex.query(api.users.get);
return (
  <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-10">
          <p className="text-xl">Welcome to your dashboard.</p>
        </div>
      </div>
    </div>
  </div>
);
*/
