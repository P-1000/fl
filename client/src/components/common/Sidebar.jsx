import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming Shadcn Button component
import { cn } from "@/lib/utils";
import { Home, PlusCircle, ClipboardList, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom"; // Import NavLink

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const NavItem = ({ icon: Icon, label, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center p-3 rounded-lg  transition-colors duration-200 hover:bg-gray-900/10",
          isActive && "bg-black text-white",
          collapsed && "justify-center"
        )
      }
    >
      <Icon
        className={cn("h-6 w-6 ", collapsed ? "mr-0" : "mr-3")}
      />
      {!collapsed && (
        <span className="text-sm font-medium ">{label}</span>
      )}
    </NavLink>
  );

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white text-black transition-all duration-300 border-r border-gray-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold py-1 mb-1 text-gray-900">MyApp</h1>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {collapsed ? (
            <Menu className="h-6 w-6 text-gray-900" />
          ) : (
            <X className="h-6 w-6 text-gray-900" />
          )}
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <NavItem icon={Home} label="Home" to="/" />
        <NavItem
          icon={PlusCircle}
          label="Flows"
          to="/flows"
        />
        <NavItem icon={ClipboardList} label="Apps" to="/apps" />
      </nav>

      <div className="p-4 border-t border-gray-200 flex items-center space-x-4">
        <img
          src="/placeholder.svg?height=40&width=40"
          alt="User avatar"
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        {!collapsed && (
          <div className="flex flex-col">
            <p className="font-medium text-gray-900">John Doe</p>
            <p className="text-sm text-gray-600">john@example.com</p>
          </div>
        )}
      </div>
    </div>
  );
}
