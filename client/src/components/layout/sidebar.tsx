import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import clsx from "clsx";
import { useAuthStore } from "@/store/useAuthStore";
import { navigationConfig } from "@/config/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <aside
      className={clsx(
        "fixed lg:static inset-y-0 left-0 z-40",
        "transform transition-transform duration-300 ease-in-out",
        "bg-white w-64 min-h-screen shadow-lg",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      {/* Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">Moni</h3>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {navigationConfig.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={clsx(
                    "w-full flex items-center px-4 py-2 text-sm rounded-lg",
                    "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    "transition-colors duration-150 ease-in-out",
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 ease-in-out"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}
