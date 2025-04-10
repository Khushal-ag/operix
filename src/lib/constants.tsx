import { Home, LineChart, Users } from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <Home className="size-4" />,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: <Users className="size-4" />,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: <LineChart className="size-4" />,
  },
];
