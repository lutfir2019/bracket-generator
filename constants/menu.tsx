import { Home, Info, Mail, Target } from "lucide-react";

export const MENU = [
  { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
  {
    href: "/knockout",
    label: "Knockout",
    icon: <Target className="h-4 w-4" />,
  },
  { href: "/about", label: "About", icon: <Info className="h-4 w-4" /> },
  { href: "/contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
];
