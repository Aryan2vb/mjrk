// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { Plus, Search } from "lucide-react";
// // import toast from "react-hot-toast";
// // import { LedgerEntry } from "../../types/transactions"; // Assuming you have this type
// // import { LoadingSpinner } from "../../components/LoadingSpinner";

// // export const Transactions = () => {
// //   const [transactions, setTransactions] = useState<LedgerEntry[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchTransactions();
// //   }, []);

// //   const fetchTransactions = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get(
// //         "https://mjrk.vercel.app/api/getledgers",
// //       ); // Adjust API endpoint as needed
// //       const sortedTransactions = response.data.data.sort(
// //         (a, b) =>
// //           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
// //       );
// //       setTransactions(sortedTransactions);
// //     } catch (error) {
// //       toast.error("Failed to fetch transactions");
// //       console.error("Error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filteredTransactions = transactions.filter((transaction) => {
// //     const searchTermLower = searchTerm.toLowerCase();
// //     return (
// //       transaction.customerCode.toLowerCase().includes(searchTermLower) ||
// //       transaction.description.toLowerCase().includes(searchTermLower) ||
// //       transaction.paymentMode.toLowerCase().includes(searchTermLower) ||
// //       transaction.referenceNumber?.toLowerCase().includes(searchTermLower)
// //     );
// //   });

// //   return (
// //     <div className="p-4 max-w-[1400px] mx-auto">
// //       <div className="flex justify-between items-center mb-6">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
// //           <div className="relative mt-2">
// //             {/* <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
// //             {/* <input
// //               type="text"
// //               placeholder="Search transactions..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
// //             /> */}
// //           </div>
// //         </div>
// //         <button
// //           onClick={() => navigate("/dashboard/transactions/add")}
// //           className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //         >
// //           <Plus className="w-5 h-5 mr-2" />
// //           Add Transaction
// //         </button>
// //       </div>

// //       {loading ? (
// //         <LoadingSpinner />
// //       ) : filteredTransactions.length === 0 ? (
// //         <div className="text-center py-12">No transactions found.</div>
// //       ) : (
// //         <div className="overflow-x-auto rounded-lg shadow-md">
// //           <table className="w-full text-left divide-y divide-gray-200">
// //             <thead className="bg-gray-100">
// //               <tr className="text-left">
// //                 <th className="px-4 py-2">Customer Code</th>
// //                 <th className="px-4 py-2">Description</th>
// //                 <th className="px-4 py-2">Type</th>
// //                 <th className="px-4 py-2">Amount</th>
// //                 <th className="px-4 py-2">Balance</th>
// //                 <th className="px-4 py-2">Payment Mode</th>
// //                 <th className="px-4 py-2">Reference</th>
// //                 <th className="px-4 py-2">Date</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {filteredTransactions.map((transaction, index) => (
// //                 <tr
// //                   key={transaction._id}
// //                   className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
// //                 >
// //                   <td className="px-4 py-2 whitespace-nowrap">
// //                     {transaction.customerCode}
// //                   </td>
// //                   <td className="px-4 py-2 whitespace-nowrap">
// //                     {transaction.description}
// //                   </td>
// //                   <td className="px-4 py-2 whitespace-nowrap">
// //                     <span
// //                       className={`px-2 py-1 text-x rounded-full ${
// //                         transaction.transactionType === "credit"
// //                           ? "bg-green-200 text-green-800"
// //                           : "bg-red-200 text-red-800"
// //                       }`}
// //                     >
// //                       {transaction.transactionType}
// //                     </span>
// //                   </td>
// //                   <td className="px-4 py-2 whitespace-nowrap">
// //                     {transaction.amount}
// //                   </td>
// //                   <td className="px-4 py-2 whitespace-nowrap">
// //                     {transaction.balanceAfterTransaction}
// //                   </td>
// //                   <td className="px-4 py-2 whitespace-nowrap">
// //                     {transaction.paymentMode}
// //                   </td>
// //                   <td className="px-4 py-2 whitespace-nowrap">
// //                     {transaction.referenceNumber || "-"}
// //                   </td>
// //                   <td className="px-4 py-2 whitespace-nowrap">
// //                     {new Date(transaction.createdAt).toLocaleDateString()}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Plus,
//   Search,
//   Download,
//   FileSpreadsheet,
//   Filter,
//   ArrowUpDown,
//   ChevronDown,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import * as XLSX from "xlsx";
// import { LedgerEntry } from "../../types/transactions";
// import { LoadingSpinner } from "../../components/LoadingSpinner";

// type SortKey = keyof LedgerEntry;
// type SortOrder = "asc" | "desc";

// export const Transactions = () => {
//   const [transactions, setTransactions] = useState<LedgerEntry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState<{
//     key: SortKey;
//     order: SortOrder;
//   }>({
//     key: "createdAt",
//     order: "desc",
//   });
//   const [filterType, setFilterType] = useState<"all" | "credit" | "debit">(
//     "all",
//   );
//   const navigate = useNavigate();
//   const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
//   const exportDropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetchTransactions();

//     // Close dropdown when clicking outside
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         exportDropdownRef.current &&
//         !exportDropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsExportDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "https://mjrk.vercel.app/api/getledgers",
//       );
//       setTransactions(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch transactions");
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredAndSortedTransactions = transactions
//     .filter((transaction) => {
//       const matchesSearch = searchTerm
//         .toLowerCase()
//         .split(" ")
//         .every((term) =>
//           Object.values(transaction).some((value) =>
//             String(value).toLowerCase().includes(term),
//           ),
//         );
//       const matchesFilter =
//         filterType === "all" || transaction.transactionType === filterType;
//       return matchesSearch && matchesFilter;
//     })
//     .sort((a, b) => {
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];
//       if (typeof aValue === "number" && typeof bValue === "number") {
//         return sortConfig.order === "asc" ? aValue - bValue : bValue - aValue;
//       }
//       return sortConfig.order === "asc"
//         ? String(aValue).localeCompare(String(bValue))
//         : String(bValue).localeCompare(String(aValue));
//     });

//   const handleSort = (key: SortKey) => {
//     setSortConfig({
//       key,
//       order:
//         sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc",
//     });
//   };

//   const handleExport = async (type: "excel" | "csv") => {
//     try {
//       const headers = [
//         "Date",
//         "Customer Code",
//         "Description",
//         "Type",
//         "Amount (₹)",
//         "Balance (₹)",
//         "Payment Mode",
//         "Reference",
//       ];

//       const data = filteredAndSortedTransactions.map((t) => [
//         new Date(t.createdAt).toLocaleDateString("en-IN"),
//         t.customerCode,
//         t.description,
//         t.transactionType,
//         t.amount.toLocaleString("en-IN"),
//         t.balanceAfterTransaction.toLocaleString("en-IN"),
//         t.paymentMode,
//         t.referenceNumber || "-",
//       ]);

//       if (type === "csv") {
//         // CSV Export
//         const csvContent = [
//           headers.join(","),
//           ...data.map((row) => row.map((cell) => `"${cell}"`).join(",")),
//         ].join("\n");

//         const blob = new Blob([csvContent], {
//           type: "text/csv;charset=utf-8;",
//         });
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.setAttribute("href", url);
//         link.setAttribute(
//           "download",
//           `transactions_${new Date().toLocaleDateString()}.csv`,
//         );
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } else {
//         // Excel Export
//         const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

//         // Auto-size columns
//         const max_width = headers.map((h, i) =>
//           Math.max(h.length, ...data.map((row) => String(row[i]).length)),
//         );
//         worksheet["!cols"] = max_width.map((w) => ({ wch: w + 2 }));

//         XLSX.writeFile(
//           workbook,
//           `transactions_${new Date().toLocaleDateString()}.xlsx`,
//         );
//       }

//       toast.success(
//         `Successfully exported transactions as ${type.toUpperCase()}`,
//       );
//       setIsExportDropdownOpen(false);
//     } catch (error) {
//       console.error("Export error:", error);
//       toast.error("Failed to export transactions");
//     }
//   };

//   return (
//     <div className="p-6 max-w-[1400px] mx-auto">
//       {/* Header Section */}
//       <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Manage and track all your financial transactions
//             </p>
//           </div>
//           <div className="flex gap-3">
//             {/* Export Dropdown */}
//             <div className="relative" ref={exportDropdownRef}>
//               <button
//                 onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
//                 className="px-4 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50"
//               >
//                 <Download className="w-4 h-4" />
//                 Export
//                 <ChevronDown className="w-4 h-4" />
//               </button>

//               {isExportDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
//                   <div className="py-1">
//                     <button
//                       onClick={() => handleExport("excel")}
//                       className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                     >
//                       <FileSpreadsheet className="w-4 h-4" />
//                       Export as Excel
//                     </button>
//                     <button
//                       onClick={() => handleExport("csv")}
//                       className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//                     >
//                       <FileSpreadsheet className="w-4 h-4" />
//                       Export as CSV
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={() => navigate("/dashboard/transactions/add")}
//               className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-colors"
//             >
//               <Plus className="w-4 h-4" />
//               Add Transaction
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="mt-6 flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search transactions..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value as typeof filterType)}
//             className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="all">All Types</option>
//             <option value="credit">Credit Only</option>
//             <option value="debit">Debit Only</option>
//           </select>
//         </div>
//       </div>

//       {/* Transactions Table */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : filteredAndSortedTransactions.length === 0 ? (
//         <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//           <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No transactions found
//           </h3>
//           <p className="text-gray-500">Try adjusting your search or filters</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     onClick={() => handleSort("createdAt")}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                   >
//                     Date{" "}
//                     {sortConfig.key === "createdAt" && (
//                       <ArrowUpDown className="w-4 h-4 inline" />
//                     )}
//                   </th>
//                   <th
//                     onClick={() => handleSort("customerCode")}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                   >
//                     Customer Code{" "}
//                     {sortConfig.key === "customerCode" && (
//                       <ArrowUpDown className="w-4 h-4 inline" />
//                     )}
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Description
//                   </th>
//                   <th
//                     onClick={() => handleSort("transactionType")}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                   >
//                     Type{" "}
//                     {sortConfig.key === "transactionType" && (
//                       <ArrowUpDown className="w-4 h-4 inline" />
//                     )}
//                   </th>
//                   <th
//                     onClick={() => handleSort("amount")}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                   >
//                     Amount{" "}
//                     {sortConfig.key === "amount" && (
//                       <ArrowUpDown className="w-4 h-4 inline" />
//                     )}
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Balance
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Payment Mode
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Reference
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredAndSortedTransactions.map((transaction) => (
//                   <tr key={transaction._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(transaction.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {transaction.customerCode}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {transaction.description}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           transaction.transactionType === "credit"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-green-100 text-green-800"
//                         }`}
//                       >
//                         {transaction.transactionType}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       ₹{transaction.amount.toLocaleString("en-IN")}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       ₹
//                       {transaction.balanceAfterTransaction.toLocaleString(
//                         "en-IN",
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
//                       {transaction.paymentMode}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {transaction.referenceNumber || "-"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Search, ChevronDown, Download } from "lucide-react";
import toast from "react-hot-toast";
import { LedgerEntry } from "../../types/transactions";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ExportData } from "../../components/ExportData";

type SortKey = keyof LedgerEntry;
type SortOrder = "asc" | "desc";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    order: SortOrder;
  }>({ key: "createdAt", order: "desc" });
  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">(
    "all",
  );
  const navigate = useNavigate();
  const exportDropdownRef = useRef<HTMLDivElement>(null);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(event.target as Node)
      ) {
        setIsExportDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://mjrk.vercel.app/api/getledgers",
      );
      setTransactions(response.data.data);
    } catch (error: any) {
      setError(error.message);
      toast.error("Failed to fetch transactions: " + error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = searchTerm
        .toLowerCase()
        .split(" ")
        .every((term) =>
          Object.values(transaction).some((value) =>
            String(value).toLowerCase().includes(term),
          ),
        );
      const matchesFilter =
        filterType === "all" || transaction.transactionType === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.order === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortConfig.order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

  const handleSort = (key: SortKey) => {
    setSortConfig({
      key,
      order:
        sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc",
    });
  };

  const transactionHeaders = [
    { key: "createdAt", label: "Date" },
    { key: "customerCode", label: "Customer Code" },
    { key: "description", label: "Description" },
    { key: "transactionType", label: "Type" },
    { key: "amount", label: "Amount (₹)" },
    { key: "balanceAfterTransaction", label: "Balance (₹)" },
    { key: "paymentMode", label: "Payment Mode" },
    { key: "referenceNumber", label: "Reference" },
  ];

  const formatTransactionData = (transaction: LedgerEntry) => [
    new Date(transaction.createdAt).toLocaleDateString("en-IN"),
    transaction.customerCode,
    transaction.description,
    transaction.transactionType,
    transaction.amount.toLocaleString("en-IN"),
    transaction.balanceAfterTransaction.toLocaleString("en-IN"),
    transaction.paymentMode,
    transaction.referenceNumber || "-",
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track all your financial transactions
            </p>
          </div>
          <div className="flex gap-3">
            <ExportData
              data={filteredAndSortedTransactions}
              headers={transactionHeaders}
              filename="transactions"
              formatData={formatTransactionData}
            />
            <button
              onClick={() => navigate("/dashboard/transactions/add")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as typeof filterType)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="credit">Credit Only</option>
            <option value="debit">Debit Only</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredAndSortedTransactions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No transactions found
          </h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    onClick={() => handleSort("createdAt")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Date{" "}
                    {sortConfig.key === "createdAt" && (
                      <ChevronDown className="w-4 h-4 inline" />
                    )}
                  </th>
                  <th
                    onClick={() => handleSort("customerCode")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Customer Code{" "}
                    {sortConfig.key === "customerCode" && (
                      <ChevronDown className="w-4 h-4 inline" />
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th
                    onClick={() => handleSort("transactionType")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Type{" "}
                    {sortConfig.key === "transactionType" && (
                      <ChevronDown className="w-4 h-4 inline" />
                    )}
                  </th>
                  <th
                    onClick={() => handleSort("amount")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Amount (₹){" "}
                    {sortConfig.key === "amount" && (
                      <ChevronDown className="w-4 h-4 inline" />
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance (₹)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Mode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "en-IN",
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.customerCode}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.transactionType === "credit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {transaction.transactionType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{transaction.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹
                      {transaction.balanceAfterTransaction.toLocaleString(
                        "en-IN",
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {transaction.paymentMode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.referenceNumber || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
