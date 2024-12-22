import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Sidebar } from "./layout/sidebar";
import { CustomerList } from "../pages/customers/CustomerList.tsx";
import { AddCustomerForm } from "../pages/customers/AddCustomerForm";
import { DashboardHome } from "../pages/DashboardHome.tsx";
import { Products } from "../pages/Products.tsx";
import { Statistics } from "../pages/Statistics.tsx";
import { History } from "../pages/History.tsx";
import { Settings } from "../pages/Settings.tsx";
import { Message } from "../pages/Message.tsx";
import { Help } from "../pages/Help.tsx";
import { Reports } from "../pages/Reports.tsx";
import { Transactions } from "../pages/transactions/Transactions.tsx";
import { AddTransactions } from "../pages/transactions/AddTransaction.tsx";
import { DarkModeToggle } from "./DarkModeToggle";
export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Mobile Header */}
      {isMobile && (
        <header className="ffixed top-0 left-0 right-0 bg-white z-20 px-4 py-3 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="w-8" /> {/* Spacer for balance */}
        </header>
      )}

      <div className="flex flex-1 pt-[60px] lg:pt-0">
        {" "}
        {/* Add top padding for mobile header */}
        {/* Sidebar */}
        <aside
          className={clsx(
            "fixed lg:sticky top-[60px] lg:top-0",
            "h-[calc(100vh-60px)] lg:h-screen",
            "transition-all duration-300 ease-in-out z-30",
            isMobile ? (isOpen ? "left-0" : "-left-64") : "left-0 w-64",
            "bg-gray-800",
          )}
        >
          <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </aside>
        {/* Overlay */}
        {isMobile && isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsOpen(false)}
          />
        )}
        {/* Main Content */}
        <main
          className={clsx(
            "flex-1 min-h-screen",
            "transition-all duration-300 ease-in-out",
            "overflow-x-hidden",
          )}
        >
          <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customers/add" element={<AddCustomerForm />} />
              <Route path="/products" element={<Products />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/history" element={<History />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/bulkmessage" element={<Message />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/add" element={<AddTransactions />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
