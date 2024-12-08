import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";
import { LedgerEntry } from "../../types/transactions"; // Assuming you have this type

export const Transactions = () => {
  const [transactions, setTransactions] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mjrk.vercel.app/api/getledgers",
      ); // Adjust API endpoint as needed
      const sortedTransactions = response.data.data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      toast.error("Failed to fetch transactions");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      transaction.customerCode.toLowerCase().includes(searchTermLower) ||
      transaction.description.toLowerCase().includes(searchTermLower) ||
      transaction.paymentMode.toLowerCase().includes(searchTermLower) ||
      transaction.referenceNumber?.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="p-4 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <div className="relative mt-2">
            {/* <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
            {/* <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
            /> */}
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard/transactions/add")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Transaction
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">Loading...</div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-12">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full text-left divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-4 py-2">Customer Code</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">Payment Mode</th>
                <th className="px-4 py-2">Reference</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={transaction._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 whitespace-nowrap">
                    {transaction.customerCode}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`font-medium px-2 py-1 rounded ${
                        transaction.transactionType === "credit"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {transaction.transactionType}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {transaction.amount}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {transaction.balanceAfterTransaction}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {transaction.paymentMode}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {transaction.referenceNumber || "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(transaction.createdAt).toLocaleDateString()}
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
