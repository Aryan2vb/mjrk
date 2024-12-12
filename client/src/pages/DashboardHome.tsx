import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Users,
  ArrowRight,
  Calendar,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface DashboardStats {
  totalCustomers: number;
  totalCredit: number;
  totalDebit: number;
  recentTransactions: Array<{
    _id: string;
    customerCode: string;
    description: string;
    transactionType: "credit" | "debit";
    amount: number;
    transactionDate: string;
  }>;
}

export const DashboardHome = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalCredit: 0,
    totalDebit: 0,
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch customers count
        const customersResponse = await axios.get(
          "https://mjrk.vercel.app/api/getallcustomers",
        );
        const totalCustomers = customersResponse.data.length;

        // Fetch all transactions
        const transactionsResponse = await axios.get(
          "https://mjrk.vercel.app/api/getledgers",
        );
        const transactions = transactionsResponse.data.data;

        // Calculate totals
        const totalCredit = transactions
          .filter((t: any) => t.transactionType === "credit")
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        const totalDebit = transactions
          .filter((t: any) => t.transactionType === "debit")
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        // Get recent transactions (last 5)
        const recentTransactions = transactions
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 5);

        setStats({
          totalCustomers,
          totalCredit,
          totalDebit,
          recentTransactions,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Credit */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Credit</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ₹{stats.totalCredit.toLocaleString("en-IN")}
              </h3>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <ArrowUpCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Total Debit */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Debit</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ₹{stats.totalDebit.toLocaleString("en-IN")}
              </h3>
            </div>
            <div className="bg-red-50 p-3 rounded-full">
              <ArrowDownCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Customers
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalCustomers}
              </h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Current Balance
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ₹
                {(stats.totalDebit - stats.totalCredit).toLocaleString("en-IN")}
              </h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-full">
              <Wallet className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
          <Link
            to="/dashboard/transactions"
            className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.recentTransactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.customerCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.transactionType === "credit"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.transactionType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{transaction.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.transactionDate).toLocaleDateString(
                      "en-IN",
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
