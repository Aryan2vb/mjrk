import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Transactions } from "../../types/transactions";
import { Trash2 } from "lucide-react"; // Import trash icon

export const TransactionHistory = ({
  customerCode,
}: {
  customerCode: string;
}) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    [],
  ); // Store selected transaction IDs
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch transactions function
  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://mjrk.vercel.app/api/getledgers?customerCode=${customerCode}`,
      );
      const sortedTransactions = response.data.data.sort(
        (a: Transactions, b: Transactions) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime(),
      );
      setTransactions(sortedTransactions);
    } catch (err: any) {
      setError(err.message);
      toast.error(`Failed to fetch transactions: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (customerCode) {
      fetchTransactions();
    }
  }, [customerCode]);

  // Handle checkbox selection
  const handleSelect = (transactionId: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(transactionId)
        ? prev.filter((id) => id !== transactionId)
        : [...prev, transactionId],
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedTransactions.length === transactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactions.map((t) => t._id));
    }
  };

  // Handle delete selected transactions
  const handleDeleteSelected = async () => {
    if (!selectedTransactions.length) return;

    if (
      !window.confirm(
        `Delete ${selectedTransactions.length} selected transactions?`,
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await Promise.all(
        selectedTransactions.map((id) =>
          axios.delete(`https://mjrk.vercel.app/api/deleteledger/${id}`),
        ),
      );

      toast.success("Selected transactions deleted successfully");
      setSelectedTransactions([]);
      fetchTransactions(); // Refresh the list
    } catch (err: any) {
      toast.error(`Failed to delete transactions: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          Transaction History
        </h3>
        {selectedTransactions.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            disabled={isDeleting}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected ({selectedTransactions.length})
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No transactions yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">
                  <input
                    type="checkbox"
                    checked={
                      selectedTransactions.length === transactions.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded"
                  />
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Date
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Description
                </th>
                <th className="px-4 py-2 border border-gray-300 text-right">
                  Type
                </th>
                <th className="px-4 py-2 border border-gray-300 text-right">
                  Amount
                </th>
                <th className="px-4 py-2 border border-gray-300 text-right">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : ""} ${
                    selectedTransactions.includes(transaction._id)
                      ? "bg-blue-50"
                      : ""
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction._id)}
                      onChange={() => handleSelect(transaction._id)}
                      className="w-4 h-4 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(transaction.transactionDate).toLocaleDateString(
                      "en-IN",
                      {
                        dateStyle: "medium",
                      },
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-right">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        transaction.transactionType === "credit"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {transaction.transactionType}
                    </span>
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-right">
                    {transaction.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-right">
                    {transaction.balanceAfterTransaction.toLocaleString(
                      "en-IN",
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
