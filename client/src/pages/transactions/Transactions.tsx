import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Search, ChevronDown, Download } from "lucide-react";
import toast from "react-hot-toast";
import { LedgerEntry } from "../../types/transactions";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ExportData } from "../../components/ExportData";
import { useAuthStore } from "../../store/useAuthStore";
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
  const { customers, fetchCustomersAndTransactions } = useAuthStore(
    (state) => state,
  );

  useEffect(() => {
    if (!customers) {
      //Only fetch if data isn't already present
      fetchCustomersAndTransactions();
    }
  }, [customers, fetchCustomersAndTransactions]);
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
