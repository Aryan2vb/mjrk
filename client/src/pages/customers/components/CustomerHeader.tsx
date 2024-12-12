// import { Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface CustomerHeaderProps {
//   totalCustomers: number;
// }

// export function CustomerHeader({ totalCustomers }: CustomerHeaderProps) {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             Customers
//           </h1>
//           <p className="text-gray-600 mt-1">
//             {totalCustomers} total customers found
//           </p>
//         </div>
//         <button
//           onClick={() => navigate("/dashboard/customers/add")}
//           className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700
//             text-white font-medium rounded-lg shadow-sm transition-all
//             focus:ring-4 focus:ring-indigo-100 w-full lg:w-auto justify-center"
//         >
//           <Plus className="w-5 h-5 mr-2" />
//           Add New Customer
//         </button>
//       </div>
//     </div>
//   );
// }

import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerHeaderProps {
  totalCustomers: number;
  ExportComponent: React.ReactNode; // Accept ExportComponent as a prop
}

export function CustomerHeader({
  totalCustomers,
  ExportComponent,
}: CustomerHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Customers
          </h1>
          <p className="text-gray-600 mt-1">
            {totalCustomers} total customers found
          </p>
        </div>
        <div className="flex items-center gap-4">
          {" "}
          {/*Added flex container*/}
          {ExportComponent} {/* Render the provided ExportComponent */}
          <button
            onClick={() => navigate("/dashboard/customers/add")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Customer
          </button>
        </div>
      </div>
    </div>
  );
}
