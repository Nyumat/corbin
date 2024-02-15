import { Icons } from "@/components/icons";

export type NumberOfMembersPerMonth = {
  date: string;
  "Total members": number;
};

export type TotalMembers = NumberOfMembersPerMonth[];

export type Customer = {
  customer: string;
  status: "Enrolled" | "Unenrolled";
  course: string;
  progress: number;
};

export type CustomersData = Customer[];

export type SidebarNavItem = {
  title: string;
  icon: keyof typeof Icons;
  href: string;
};

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};

export type Item = {
  _creationTime: number;
  _id: string;
  created_at: number;
  description: string;
  images: string[];
  item_name: string;
  owner_id: string;
  owner_info: OwnerInfo | any;
  rating?: number;
};

type OwnerInfo = {
  first_name: string;
  has_image: boolean;
  image_url: string;
  last_name: string;
  username: string;
};

export type Message = {
  created_at: number;
  from: string;
  message: string;
  to: string;
  _creationTime: number;
  _id: string;
  read_at?: number | null;
};
