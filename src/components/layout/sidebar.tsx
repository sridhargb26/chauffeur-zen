import { useState } from "react";
import { 
  Car, 
  Users, 
  Calendar, 
  DollarSign, 
  Settings, 
  BarChart3,
  MapPin,
  Bell,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: BarChart3,
    badge: null
  },
  {
    label: "Bookings",
    href: "/bookings",
    icon: Calendar,
    badge: "3"
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
    badge: null
  },
  {
    label: "Fleet",
    href: "/fleet",
    icon: Car,
    badge: null
  },
  {
    label: "Drivers",
    href: "/drivers",
    icon: User,
    badge: null
  },
  {
    label: "Routes",
    href: "/routes",
    icon: MapPin,
    badge: null
  },
  {
    label: "Financials",
    href: "/financials",
    icon: DollarSign,
    badge: null
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: "5"
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null
  }
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground transition-all duration-300 ease-in-out flex flex-col h-screen relative",
        collapsed ? "w-16" : "w-sidebar"
      )}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-primary-hover">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Car className="w-5 h-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">LuxeRide</h1>
              <p className="text-xs text-primary-foreground/70">CRM System</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative group",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-primary-hover text-primary-foreground/80 hover:text-primary-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-card text-card-foreground rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-8 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* User Profile */}
      <div className="p-4 border-t border-primary-hover">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-accent-foreground">AD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-primary-foreground/70 truncate">admin@luxeride.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}