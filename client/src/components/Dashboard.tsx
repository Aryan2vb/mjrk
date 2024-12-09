// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import clsx from "clsx";
// import { Sidebar } from "./layout/sidebar";
// import { CustomerList } from "../pages/customers/CustomerList.tsx";
// import { AddCustomerForm } from "../pages/customers/AddCustomerForm";
// import { DashboardHome } from "../pages/DashboardHome.tsx";
// import { Products } from "../pages/Products.tsx";
// import { Statistics } from "../pages/Statistics.tsx";
// import { History } from "../pages/History.tsx";
// import { Settings } from "../pages/Settings.tsx";
// import { Message } from "../pages/Message.tsx";
// import { Help } from "../pages/Help.tsx";
// import { Reports } from "../pages/Reports.tsx";
// import { Transactions } from "../pages/transactions/Transactions.tsx";
// import { AddTransactions } from "../pages/transactions/AddTransaction.tsx";

// export function Dashboard() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Mobile Header */}
//       <div className="lg:hidden bg-white p-4 flex items-center justify-between shadow-sm">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="p-2 rounded-lg hover:bg-gray-100"
//         >
//           {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//         <h1 className="text-xl font-bold">Dashboard</h1>
//       </div>

//       <div className="flex">
//         <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

//         {/* Main Content */}
//         <main
//           className={clsx(
//             "flex-1 p-4 lg:p-8",
//             "transition-all duration-300 ease-in-out",
//           )}
//         >
//           {/* Overlay for mobile */}
//           {isOpen && (
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
//               onClick={() => setIsOpen(false)}
//             />
//           )}

//           <div className="max-w-7xl mx-auto">
//             <Routes>
//               <Route path="/" element={<DashboardHome />} />
//               <Route path="/customers" element={<CustomerList />} />
//               <Route path="/customers/add" element={<AddCustomerForm />} />
//               <Route path="/products" element={<Products />} />
//               <Route path="/statistics" element={<Statistics />} />
//               <Route path="/history" element={<History />} />
//               <Route path="/reports" element={<Reports />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/help" element={<Help />} />
//               <Route path="/bulkmessage" element={<Message />} />
//               <Route path="/transactions" element={<Transactions />} />
//               <Route path="/transactions/add" element={<AddTransactions />} />
//             </Routes>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
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

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className={clsx(
          "w-64 lg:w-72 bg-gray-800 text-white shadow-lg", //Default Styles
          window.innerWidth < 768 ? "w-0" : null, //Hide on Mobile
          isOpen && window.innerWidth < 768 ? "w-64" : null, //Show on Mobile when Open
        )}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header (Only shows on smaller screens and specific routes) */}
        {window.innerWidth < 768 &&
          [
            "/",
            "/products",
            "/statistics",
            "/history",
            "/reports",
            "/settings",
            "/help",
            "/bulkmessage",
          ].includes(location.pathname) && (
            <div className="bg-gray-100 p-4 flex items-center justify-between shadow-sm">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-200"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
          )}

        {/* Main Content (Routes) */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {" "}
          {/* Added overflow-y-auto for scrolling */}
          <div className="max-w-7xl mx-auto p-4 lg:p-8">
            {" "}
            {/* Adjust padding as needed */}
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
