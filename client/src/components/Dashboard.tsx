import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import {Menu, X} from "lucide-react";
import clsx from "clsx";
import {Sidebar} from "./layout/sidebar";
import {CustomerList} from "./CustomerList";
import {AddCustomerForm} from "./AddCustomerForm";
import {DashboardHome} from "../pages/DashboardHome.tsx";
import {Products} from "../pages/Products.tsx";
import {Statistics} from "../pages/Statistics.tsx";
import {History} from "../pages/History.tsx";
import {Settings} from "../pages/Settings.tsx";
import {Message} from "../pages/Message.tsx";
import {Help} from "../pages/Help.tsx";
import {Reports} from "../pages/Reports.tsx";

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white p-4 flex items-center justify-between shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      <div className="flex">
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Main Content */}
        <main
          className={clsx(
            "flex-1 p-4 lg:p-8",
            "transition-all duration-300 ease-in-out",
          )}
        >
          {/* Overlay for mobile */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
              onClick={() => setIsOpen(false)}
            />
          )}

          <div className="max-w-7xl mx-auto">
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
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
