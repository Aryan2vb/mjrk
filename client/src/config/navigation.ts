import {
  Users,
  Package,
  LayoutGrid,
  BarChart2,
  History,
  FileText,
  Settings,
  HelpCircle,
  MessageSquare,
  icons,
  MessagesSquare,
} from "lucide-react";
import { NavigationSection } from "@/types/navigation";
import path from "path/win32";

export const navigationConfig: NavigationSection[] = [
  {
    title: "Main",
    items: [
      { icon: LayoutGrid, name: "Dashboard", path: "/dashboard" },
      { icon: Users, name: "Customers", path: "/dashboard/customers" },
      { icon: Package, name: "Products.tsx", path: "/dashboard/products" },
      {
        icon: MessagesSquare,
        name: "Bulk Messages",
        path: "/dashboard/bulkmessage",
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      { icon: BarChart2, name: "Statistics", path: "/dashboard/statistics" },
      { icon: History, name: "History", path: "/dashboard/history" },
      { icon: FileText, name: "Reports", path: "/dashboard/reports" },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: Settings, name: "Settings", path: "/dashboard/settings" },
      { icon: HelpCircle, name: "Help", path: "/dashboard/help" },
    ],
  },
];
