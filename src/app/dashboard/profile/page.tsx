import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import { pastClientsData } from "@/lib/data";
import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import { MessageCircleIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";

export default async function Profile() {
  const user = await currentUser();

  return (
    <DashboardShell>
      <DashboardHeader title="Profile" />
      <div className="px-5">
        <Card className="rounded-b-none rounded-t-md">
          <div className="mx-4 flex flex-col items-start justify-center">
            <div className="m-2 flex flex-row items-start justify-start gap-4">
              <div>
                <Image
                  src={user?.imageUrl ?? ""}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col items-start justify-start">
                <h1 className="mt-0 text-2xl font-semibold">
                  {user?.username}
                </h1>
                <p className="text-gray-500">
                  {user?.emailAddresses[0].emailAddress}
                </p>
                <div className="pt-3">
                  <p className="text-gray-500">
                    Corbin user since:
                    <span className="text-green-600">
                      {" "}
                      {moment(user?.createdAt).format("MMM Do, YYYY")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="px-5">
        <Card className="rounded-b-md rounded-t-none">
          <h1 className="text-2xl font-semibold">Past Clients</h1>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Message</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pastClientsData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Text>{item.item}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{moment(item.date).format("MMM Do, YYYY")}</Text>
                  </TableCell>
                  <TableCell>
                    <MessageCircleIcon size={24} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardShell>
  );
}
