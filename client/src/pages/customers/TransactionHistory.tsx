import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Transactions } from "../../types/transactions";

export const TransactionHistory = ({
  customerCode,
}: {
  customerCode: string;
}) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://mjrk.vercel.app/api/getledgers/${customerCode}`,
        );
        // Sort transactions by date in descending order (latest first)
        const sortedTransactions = response.data.data.sort(
          (a, b) =>
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

    if (customerCode) {
      fetchTransactions();
    }
  }, [customerCode]);

  if (isLoading) {
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>;
  }

  // if (error) {
  //   return (
  //     <div className="text-center py-8 text-red-500">
  //       Error loading transactions: {error}
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
        Transaction History
      </h3>
      {transactions.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No transactions yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          {" "}
          {/* Add for horizontal scrolling on smaller screens */}
          <table className="w-full border-collapse">
            <thead>
              <tr>
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
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  {" "}
                  {/* Odd/even row coloring */}
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(transaction.transactionDate).toLocaleDateString(
                      "en-IN",
                      { dateStyle: "medium" },
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-right">
                    <span
                      className={`px-2 py-1 text-xm rounded-full ${
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
