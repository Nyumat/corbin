import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import { Progress } from "@/components/ui/progress";
import { customersData } from "@/lib/data";
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

export default function Profile() {
  return (
    <DashboardShell>
      <DashboardHeader title="Profile" />
      <div className="px-5">
        <Card className="rounded-lg">
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Customer</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Course</TableHeaderCell>
                <TableHeaderCell>Progress</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersData.map((item) => (
                <TableRow key={item.customer}>
                  <TableCell>{item.customer}</TableCell>
                  <TableCell>
                    <Text>{item.status}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.course}</Text>
                  </TableCell>
                  <TableCell className="flex flex-row items-center gap-4">
                    <Progress value={item.progress} />
                    {item.progress + "%"}
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
