import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  icon: LucideIcon;
  name: string;
  path: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}
