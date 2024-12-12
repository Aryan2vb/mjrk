// // Placeholder components
// export const DashboardHome = () => <div>Dashboard Home</div>;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Users,
  ArrowRight,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalCredit: 0,
    totalDebit: 0,
    recentTransactions: [],
    activeCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(
          "https://mjrk.vercel.app/api/dashboard/stats",
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date().toLocaleDateString("en-US", {
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
        {/* Total Credit Card */}
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
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>4.5% increase</span>
          </div>
        </div>

        {/* Total Debit Card */}
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
          <div className="mt-4 flex items-center text-sm text-red-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>2.1% increase</span>
          </div>
        </div>

        {/* Total Customers Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Customers
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalCustomers.toLocaleString()}
              </h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-600">
            <Link
              to="/dashboard/customers"
              className="flex items-center hover:underline"
            >
              View all customers <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Net Balance Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Balance</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ₹
                {(stats.totalCredit - stats.totalDebit).toLocaleString("en-IN")}
              </h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-purple-600">
            <Link
              to="/dashboard/transactions"
              className="flex items-center hover:underline"
            >
              View transactions <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
          <Link
            to="/dashboard/transactions"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentTransactions.map((transaction: any) => (
                <tr key={transaction._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {transaction.customerCode}
                    </div>
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
                    {new Date(transaction.transactionDate).toLocaleDateString()}
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
