import DashboardHeader from "@/components/dashboard-header";
import NewItemForm from "@/components/new-item";
import DashboardShell from "@/components/shell";

export default function NewListing() {
  return (
    <DashboardShell>
      <DashboardHeader title="Add a new listing" />
      <NewItemForm />
    </DashboardShell>
  );
}
