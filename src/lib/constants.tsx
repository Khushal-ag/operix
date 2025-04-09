import { Home, LineChart, Users } from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: <Home className="size-4" />,
  },
  {
    label: "Users",
    href: "/users",
    icon: <Users className="size-4" />,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <LineChart className="size-4" />,
  },
];
